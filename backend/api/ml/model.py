from nltk.tokenize import word_tokenize
from catboost import CatBoostRegressor
from PIL import Image
import pandas as pd
import torch
import matplotlib.pyplot as plt
import torch.nn as nn
import torchvision.transforms as transforms
from torchvision import models
import numpy as np
from tensorflow.keras.preprocessing.image import ImageDataGenerator
from tensorflow.keras.applications.efficientnet import EfficientNetB0, preprocess_input
from tensorflow.keras.layers import Dense, GlobalAveragePooling2D, Dropout
from tensorflow.keras.models import Model
from tensorflow.keras.preprocessing.image import img_to_array
import tensorflow as tf
import os
from gensim.models import Word2Vec
from nltk.stem.snowball import RussianStemmer
import nltk
import pymorphy2
from geopy.geocoders import Photon, Nominatim
from time import sleep
from scipy.spatial import cKDTree
import geopy.distance
import joblib
nltk.download('punkt')
nltk.download('stopwords')
from zhkh_utils import get_zhkh

from string import punctuation
_punctuation = list(punctuation)


class PriceEstimator:
    def _get_classifier(self, path):
        base_model = EfficientNetB0(weights=None, include_top=False)
        x = base_model.output
        x = GlobalAveragePooling2D()(x)
        x = Dense(200, activation='relu')(x)
        predictions_of_photo_type = Dense(3, activation='softmax')(x)
        model = Model(inputs=base_model.input, outputs=predictions_of_photo_type)
        model.load_weights(path)
        for layer in base_model.layers:
            layer.trainable = False
        model.compile(optimizer=tf.keras.optimizers.Adam(
            learning_rate=0.00005), loss='categorical_crossentropy',  metrics=['accuracy'])
        return model

    def _get_estimator(self, path):
        model = models.efficientnet_b0(weights='IMAGENET1K_V1')
        model.classifier = nn.Sequential(
            nn.Linear(1280, 100),
            nn.Dropout(0.1),
            nn.ReLU(),
            nn.Linear(100, 2, bias=True),
        )

        self.hook_info = {}

        def get_activation(name):
            def hook(model, input, output):
                self.hook_info[name] = output.detach()
            return hook

        model.load_state_dict(torch.load(path, map_location=torch.device('cpu')))
        model.to(self.device)
        model.eval()

        model.classifier[1].register_forward_hook(get_activation('avgpool'))
        return model
    
    def _load_heads(self):
        heads_names = ['msc_head_full', 'msc_head_without_photo', 'msc_head_without_photo_and_zhkh', 'msc_head_without_zhkh']
        for head_name in heads_names:
            _cat_features = []
            cols_order = []
            with open(os.path.join(self.models_folder, "cat_cols_for_"+head_name+'.txt'), 'r') as file:
                for line in file:
                    _cat_features.append(line.strip())
            with open(os.path.join(self.models_folder, "cols_order_for_"+head_name+'.txt'), 'r') as file:
                for line in file:
                    cols_order.append(line.strip())
            self.heads[head_name] = CatBoostRegressor()
            self.heads[head_name].load_model(os.path.join(self.models_folder, f'{head_name}.cbm'))
            self.cols_orders[head_name] = cols_order

    def __init__(self, models_folder, device=torch.device("cuda" if torch.cuda.is_available() else "cpu")):
        self.device = device
        self.models_folder = models_folder        
        self.photo_classifier = self._get_classifier(os.path.join(models_folder, 'photo_classifier'))
        self.estimator = self._get_estimator(os.path.join(models_folder, 'estimator.pth'))
        self.heads = {}
        self.cols_orders = {}
        self._load_heads()
        self.metro_df = pd.read_csv(os.path.join(models_folder, 'msc_metro_with_decart.csv'), encoding='utf8')
        self.df_zhkh = pd.read_csv(os.path.join(models_folder, 'zhkh_final.csv'), encoding='utf8')
        self.df_infro = pd.read_csv(os.path.join(models_folder, 'msc_infro_decart.csv'), encoding='utf8')
        self.metro_tree = cKDTree(self.metro_df[['x_coord', 'y_coord']])
        self.infro_tree = cKDTree(self.df_infro[['x_coord', 'y_coord']])
        self.pca_photo = joblib.load(os.path.join(models_folder,'pca_photo.pkl'))
        self.pca_text = joblib.load(os.path.join(models_folder,'pca_text.pkl'))
        self.w2v = Word2Vec.load(os.path.join(self.models_folder,"word2vec.model"))
        self.stemmer = RussianStemmer()
        self.infro_types = list(self.df_infro['text_query'].value_counts().index)
    
    @staticmethod
    def _get_coordinates_photon_with_retry(adress, retry_delay=0.1):
        geolocator = Photon(user_agent="myGeocoder")

        for i in range(5):
            try:
                location = geolocator.geocode(adress)
                if location is not None:
                    return (location.latitude, location.longitude)
                return (None, None)
            except Exception as e:
                pass
            sleep(retry_delay)
        return (None, None)
    
    def _get_metro_info(self, coords):
        neighbors = self.metro_tree.query(coords, k=2, p=2)
        res = {'nearest_station': None, 'nearest_station_dist':None, 'second_nearest_station':None, 'second_nearest_station_dist':None}
        if(neighbors[0][0] != np.inf):
            res['nearest_station'] = self.metro_df['names'].iloc[neighbors[1][0]]
            res['nearest_station_dist'] = neighbors[0][0]
            res['second_nearest_station'] = self.metro_df['names'].iloc[neighbors[1][1]]
            res['second_nearest_station_dist'] = neighbors[0][1]
        return res
    
    @staticmethod
    def _coordinates_to_distance_from_moscow_center(point):
        lat, lon =  point
        moscow_center = (55.751999, 37.617734)
        lat_diff_km = geopy.distance.geodesic(moscow_center, (lat, moscow_center[1])).km
        lon_diff_km = geopy.distance.geodesic(moscow_center, (moscow_center[0], lon)).km
        if(lat<moscow_center[0]):
            lat_diff_km *= -1
        if(lon<moscow_center[1]):
            lon_diff_km *= -1
        return lat_diff_km, lon_diff_km
    
    def _normalize_text(self, s):
        tokens = word_tokenize(s)
        tokens_without_punct = [i for i in tokens if i not in _punctuation]
        low_tokens = [i.lower() for i in tokens_without_punct]
        tokens_without_punct = [i for i in tokens if i not in _punctuation]
        low_tokens = [i.lower() for i in tokens_without_punct]
        stopwords = nltk.corpus.stopwords.words('russian')
        words_without_stop = [i for i in low_tokens if i not in stopwords]
        morph = pymorphy2.MorphAnalyzer()
        lemms = [morph.parse(i)[0].normal_form for i in words_without_stop]
        stems = [self.stemmer.stem(i) for i in lemms]
        total=''
        for el in stems:
            total+=el
            total+=' '
        return total
    
    def _get_text_embeddings(self, text):
        normalized_text = self._normalize_text(text)
        model = self.w2v
        words = word_tokenize(normalized_text.lower())
        vector = np.zeros(100)  # Размерность вектора соответствует размерности модели (vector_size)
        count = 0
        for word in words:
            if word in model.wv:
                vector += model.wv[word]
                count += 1
        if count > 0:
            vector /= count
        
        return vector
    
    def _get_infro_info(self, coords):
        close_range = 1
        nearest_infro = {}
        for i in self.infro_types:
            nearest_infro[i] = 0
        neighbors = self.infro_tree.query_ball_point(coords, close_range)

        for neighbor_idx in neighbors:
            neighbor = self.df_infro.iloc[neighbor_idx]
            if neighbor['city'] == 'msc':
                text_query = neighbor['text_query']
                nearest_infro[text_query] += 1
        return nearest_infro   
    
    def predict(self, params: dict) -> float:
        '''
        params: dict with keys:
            - 'adress': str
            - 'object_type': '1' | '2'
            - 'text': str
            - 'house_material': str            
            - 'cnt_rooms': int
            - 'floor': int
            - 'area': float
            - 'has_lift': int
            - 'parking_type': str
            - 'photos': (float, float) or list of PIL.Image objects
        '''
        request = {}
        request['cnt_rooms'] = params['cnt_rooms']
        request['area'] = params['area']
        request['object_type'] = int(params['object_type'])
        request['house_material'] = params['house_material']
        request['floor'] = params['floor']
        request['has_lift'] = params['has_lift']
        request['parking_type'] = params['parking_type']
        adress = params['adress']

        photos = params['photos']

        has_photo = True
        if(len(photos)==2):
            has_photo = False

        has_zhkh = True
        zhkh_info = get_zhkh(adress, self.df_zhkh)
        if(zhkh_info == None):
            has_zhkh = False
        else:
            for key in zhkh_info.keys():
                request[key] = zhkh_info[key]
        
        latitude, longitude = self._get_coordinates_photon_with_retry(adress)
        if latitude is None:
            raise Exception('Не удалось определить координаты по адресу')
        
        request['x_coord'], request['y_coord']= self._coordinates_to_distance_from_moscow_center((latitude, longitude))
        request['dist_to_center'] = geopy.distance.geodesic((latitude,longitude), (55.751999, 37.617734)).km
        metro_info = self._get_metro_info((latitude, longitude))
        request['nearest_metro'], request['nearest_metro_dist'] = metro_info['nearest_station'],metro_info['nearest_station_dist']
        request['second_nearest_metro'],request['second_nearest_metro_dist'] = metro_info['second_nearest_station'],metro_info['second_nearest_station_dist']

        
        if(has_photo):
            photo_processing_res = self.get_repair(photos)
            pca_photo_res = self.pca_photo.transform(photo_processing_res['embeddings'].reshape(1, -1))[0]
            for i in range(len(pca_photo_res)):
                request[f'pca_photo_{i}'] = pca_photo_res[i]
            request['interior_style'] = photo_processing_res['interior_style']
            request['interior_qual'] = photo_processing_res['interior_qual']
        else:
            request['interior_style'] = photos[0]
            request['interior_qual'] = photos[1]

        text_embeddings = self._get_text_embeddings(params['text'])
        pca_text_res = self.pca_text.transform(text_embeddings.reshape(1, -1))[0]
        for i in range(len(pca_text_res)):
            request[f'pca_text_{i}'] = pca_text_res[i]
        
        infro_info = self._get_infro_info((request['x_coord'], request['y_coord']))
        for key in infro_info.keys():
            request[key] = infro_info[key]
        request['infro_cnt'] = sum(infro_info.values())

        # print(request)
        prediction = 0
        if(has_photo):
            if(has_zhkh):
                request = pd.DataFrame(request, index=[0])
                request = request[self.cols_orders['msc_head_full']]                
                prediction = self.heads['msc_head_full'].predict(request)[0]
            else:
                request = pd.DataFrame(request, index=[0])
                request = request[self.cols_orders['msc_head_without_zhkh']]
                prediction = self.heads['msc_head_without_zhkh'].predict(request)[0]
        else:
            if(has_zhkh):
                request = pd.DataFrame(request, index=[0])
                request = request[self.cols_orders['msc_head_without_photo']]
                prediction = self.heads['msc_head_without_photo'].predict(request)[0]
            else:
                request = pd.DataFrame(request, index=[0])
                request = request[self.cols_orders['msc_head_without_photo_and_zhkh']]
                prediction = self.heads['msc_head_without_photo_and_zhkh'].predict(request)[0]

        return (np.exp(prediction) * request['area'])[0]
    
    def get_repair(self, photos) -> dict:
        '''
        photos': list of PIL.Image objects
        return: dict with keys:
            - 'interior_style': int
            - 'interior_qual': int
            - 'embeddings': dict with keys:
                - 'emb1': np.array
                - 'emb2': np.array
                - ...
                - 'emb100': np.array
        '''
        input_shape = (224, 224)

        image_array = np.zeros((len(photos), *input_shape, 3))

        for i, pil_image in enumerate(photos):
            # Преобразование PIL-изображения в массив NumPy
            img = pil_image.resize(input_shape)  # Подгоняем изображение под размер модели
            img_array = img_to_array(img)
            img_array /= 255.0  # Нормализация пикселей (если модель ожидает значения от 0 до 1)
            image_array[i] = img_array

        predictions_of_photo_type = self.photo_classifier.predict(image_array, verbose=0)
        flat_thr = 0.8
        outdoor_thr = 0.5
        flats = np.array(range(predictions_of_photo_type.shape[0]))[predictions_of_photo_type[:, 0] > flat_thr]

        iter_estims = torch.tensor([])
        embeddings = torch.tensor([])
        transform1 = transforms.Compose([   
        transforms.Resize(224),
            transforms.CenterCrop(224), 
            transforms.ToTensor(),
        ])

        with torch.no_grad():
            for photo_id in flats:
                image = photos[photo_id]
                image = transform1(image)
                data = image.to(self.device)
                x = self.estimator(data.view(1,3,224,224))
                x = x.view(x.size(0), -1)
                x2 = self.hook_info['avgpool'].reshape((1, 100))
                if(iter_estims.shape[0]==0):
                    iter_estims = x.cpu()
                    embeddings = x2.cpu()
                else:
                    iter_estims = torch.concat((iter_estims, x.cpu()))
                    embeddings = torch.concat((embeddings, x2.cpu()))

        interior_style, interior_qual = iter_estims.mean(axis = 0).numpy()
        embeddings = embeddings.mean(axis = 0).numpy()
        return {'interior_style': interior_style, 'interior_qual': interior_qual, 'embeddings': embeddings}