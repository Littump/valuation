from string import punctuation
from zhkh_utils import get_zhkh_new, get_formated_adress
from nltk.tokenize import word_tokenize
from catboost import CatBoostRegressor
import pandas as pd
import torch
import torch.nn as nn
import torchvision.transforms as transforms
from torchvision import models
import numpy as np
from tensorflow.keras.applications.efficientnet import EfficientNetB0
from tensorflow.keras.layers import Dense, GlobalAveragePooling2D
from tensorflow.keras.models import Model
from tensorflow.keras.preprocessing.image import img_to_array
import os
from gensim.models import Word2Vec
from nltk.stem.snowball import RussianStemmer
import nltk
import pymorphy2
from geopy.geocoders import Photon
from time import sleep
from scipy.spatial import cKDTree
import geopy.distance
import joblib
nltk.download('punkt')
nltk.download('stopwords')

_punctuation = list(punctuation)


class PriceEstimator:
    def _get_classifier(self, path):
        base_model = EfficientNetB0(weights=None, include_top=False)
        x = base_model.output
        x = GlobalAveragePooling2D()(x)
        x = Dense(200, activation='relu')(x)
        predictions_of_photo_type = Dense(3, activation='softmax')(x)
        model = Model(inputs=base_model.input,
                      outputs=predictions_of_photo_type)
        model.load_weights(path).expect_partial()
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

        model.load_state_dict(torch.load(
            path, map_location=torch.device('cpu')))
        model.to(self.device)
        model.eval()

        model.classifier[1].register_forward_hook(get_activation('avgpool'))
        return model

    def _load_heads(self):
        head_types = ['head_full', 'head_without_photo',
                      'head_without_photo_and_zhkh', 'head_without_zhkh']
        for region in self.regions:
            self.heads[region] = {}
            self.cols_orders[region] = {}
            for head_type in head_types:
                # _cat_features = []
                cols_order = []
                # with open(os.path.join(self.models_folder, "cat_cols_for_"+head_type+'.txt'), 'r', encoding='utf-8') as file:
                #     for line in file:
                #         _cat_features.append(line.strip())
                with open(os.path.join(self.models_folder, "cols_order_for_"+region+"_"+head_type+'.txt'), 'r', encoding='utf-8') as file:
                    for line in file:
                        cols_order.append(line.strip())
                # cat_features=_cat_features)
                self.heads[region][head_type] = CatBoostRegressor()
                self.heads[region][head_type].load_model(os.path.join(
                    self.models_folder, f'{region}_{head_type}.cbm'))
                self.cols_orders[region][head_type] = cols_order

    def _load_trees(self):
        self.metro_trees = {}
        for city in self.regions:
            self.metro_trees[city] = cKDTree(
                self.metro_df[self.metro_df.region == city][['x_coord', 'y_coord']])

        self.infro_tree = {}
        for city in self.regions:
            self.infro_tree[city] = cKDTree(
                self.infro_df[self.infro_df.city == city][['x_coord', 'y_coord']])

        self.focus_trans_types = ['plane', 'train', 'bus']
        self.station_trees = {}
        for city in self.regions:
            self.station_trees[city] = {}
            for type_ in self.focus_trans_types:
                a = self.df_stations[self.df_stations.region == city]
                self.station_trees[city][type_] = cKDTree(
                    a[a.transport_type == type_][['x_coord', 'y_coord']])

    def __init__(self, models_folder, device=torch.device("cuda" if torch.cuda.is_available() else "cpu")):
        self.city_centers = {"msc": (55.751999, 37.617734),
                             "nsk": (55.026498, 82.921457),
                             "ekb": (56.838060, 60.603651),
                             "nng": (56.326797, 44.006516),
                             "kzn": (55.796127, 49.106414),
                             "spb": (59.938784, 30.314997)}
        self.regions = list(self.city_centers.keys())
        self.device = device
        self.models_folder = models_folder
        self.photo_classifier = self._get_classifier(
            os.path.join(models_folder, 'photo_classifier'))
        self.estimator = self._get_estimator(
            os.path.join(models_folder, 'estimator.pth'))
        self.heads = {}
        self.cols_orders = {}
        self._load_heads()
        self.infro_df = pd.read_csv(os.path.join(
            models_folder, 'infro_decart_full.csv'))
        self.metro_df = pd.read_csv(os.path.join(
            models_folder, 'metro_with_decart_full.csv'))
        self.df_zhkh = pd.read_csv(
            os.path.join(models_folder, 'zhkh_final.csv'))
        self.df_stations = pd.read_csv(
            os.path.join(models_folder, 'stations_df.csv'))
        self._load_trees()
        self.pca_photo = joblib.load(
            os.path.join(models_folder, 'pca_photo.pkl'))
        self.pca_text = joblib.load(
            os.path.join(models_folder, 'pca_text.pkl'))
        self.w2v = Word2Vec.load(os.path.join(
            self.models_folder, "word2vec.model"))
        self.stemmer = RussianStemmer()
        self.infro_types = list(
            self.infro_df['text_query'].value_counts().index)

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

    def _get_metro_info(self, decart_coords, city):
        res = {'nearest_metro': None, 'nearest_metro_dist': None}
        dist, obj_id = self.metro_trees[city].query(decart_coords, k=1, p=2)
        # print(city, decart_coords, dist, obj_id, list(self.metro_df.iloc[obj_id]))

        if (dist != np.Inf):
            res['nearest_metro'] = self.metro_df.name.iloc[obj_id]
            res['nearest_metro_dist'] = dist
        return res

    def _coordinates_to_distance_from_city_center(self, point, city):
        lat, lon = point
        center = self.city_centers[city]
        lat_diff_km = geopy.distance.geodesic(center, (lat, center[1])).km
        lon_diff_km = geopy.distance.geodesic(center, (center[0], lon)).km
        if (lat < center[0]):
            lat_diff_km *= -1
        if (lon < center[1]):
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
        total = ''
        for el in stems:
            total += el
            total += ' '
        return total

    def _get_text_embeddings(self, text):
        normalized_text = self._normalize_text(text)
        model = self.w2v
        words = word_tokenize(normalized_text.lower())
        # Размерность вектора соответствует размерности модели (vector_size)
        vector = np.zeros(100)
        count = 0
        for word in words:
            if word in model.wv:
                vector += model.wv[word]
                count += 1
        if count > 0:
            vector /= count

        return vector

    def _get_infro_info(self, decart_coords, city):
        close_range = 1
        nearest_infro = {}
        for i in self.infro_types:
            nearest_infro[i] = 0
        neighbors = self.infro_tree[city].query_ball_point(
            decart_coords, close_range)

        for neighbor_idx in neighbors:
            neighbor = self.infro_df[self.infro_df.city ==
                                     city].iloc[neighbor_idx]
            text_query = neighbor['text_query']
            nearest_infro[text_query] += 1
        return nearest_infro
    
    def _get_nearest_infro_names(self, decart_coords, city):
        nearest_infro = {}
        for infro_type in self.infro_types:
            nearest_infro[infro_type] = {"count":0, "items": []}
        k_ns = 20
        max_one_type = 5
        close_range = 1
        neighbors = self.infro_tree[city].query_ball_point(
            decart_coords, close_range)

        processed = 0
        for neighbor_idx in neighbors:
            if(processed>=k_ns):
                break
            neighbor = self.infro_df[self.infro_df.city ==
                                    city].iloc[neighbor_idx]
            infro_type = neighbor['text_query']
            name = neighbor['name']
            lat, lng = neighbor['lat'], neighbor['lon']
            if(max_one_type<=nearest_infro[infro_type]['count']):
                continue
            nearest_infro[infro_type]['count']+=1
            nearest_infro[infro_type]['items'].append({'name':name, 'point':[lat, lng]})
            processed+=1
        return nearest_infro

    def _get_station_info(self, decart_coords, city):
        focus_trans_types = ['plane', 'train', 'bus']
        nearest_stations = {}
        for type_ in focus_trans_types:
            nearest_obj_dist = None
            dist, obj_id = self.station_trees[city][type_].query(
                decart_coords, k=1, p=2)
            if (dist != np.Inf):
                nearest_obj_dist = dist
            nearest_stations['nearest_'+type_+'_dist'] = nearest_obj_dist
        return nearest_stations

    def _get_city_by_coords(self, point):
        dists = [geopy.distance.geodesic(
            self.city_centers[city], point).km for city in self.regions]
        return self.regions[dists.index(min(dists))]

    def predict(self, params: dict) -> float:
        '''
        params: dict with keys:
            - 'address': str
            - 'object_type': '1' | '2'
            - 'text': str
            - 'house_material': str            
            - 'cnt_rooms': int
            - 'floor': int
            - 'area': float
            - 'has_lift': int
            - 'parking_type': str
            - 'repair': (float, float) or list of PIL.Image objects
        '''
        request = {}
        request['cnt_rooms'] = params['cnt_rooms']
        request['area'] = params['area']
        request['object_type'] = int(params['object_type'])
        request['house_material'] = params['house_material']
        request['floor'] = params['floor']
        request['has_lift'] = params['has_lift']
        request['parking_type'] = params['parking_type']
        adress = params['address']

        repair = params['repair']
        formated_adress = get_formated_adress(adress)

        has_photo = True
        if (len(repair) == 2):
            has_photo = False

        has_zhkh = True
        zhkh_id = get_zhkh_new(formated_adress, self.df_zhkh)
        if (zhkh_id == None):
            has_zhkh = False
        else:
            zhkh_info = self.df_zhkh.drop(
                columns=["Форматированный адрес", 'index', "Адрес", "Ссылка", ]).iloc[zhkh_id]
            for key in zhkh_info.keys():
                request[key] = zhkh_info[key]

        latitude, longitude = self._get_coordinates_photon_with_retry(
            params['address'])
        if latitude is None:
            latitude, longitude = self._get_coordinates_photon_with_retry(
                formated_adress)
            if latitude is None:
                raise Exception('Не удалось определить координаты по адресу')

        city = self._get_city_by_coords((latitude, longitude))
        request['y_coord'], request['x_coord'] = self._coordinates_to_distance_from_city_center(
            (latitude, longitude), city)
        request['dist_to_center'] = geopy.distance.geodesic(
            (latitude, longitude), self.city_centers[city]).km
        metro_info = self._get_metro_info(
            (request['x_coord'], request['y_coord']), city)
        request['nearest_metro'], request['nearest_metro_dist'] = metro_info['nearest_metro'], metro_info['nearest_metro_dist']

        infro_info = self._get_infro_info(
            (request['x_coord'], request['y_coord']), city)
        for key in infro_info.keys():
            request[key] = infro_info[key]
        request['nearest_infro_cnt'] = sum(infro_info.values())

        station_info = self._get_station_info(
            (request['x_coord'], request['y_coord']), city)
        for key in station_info.keys():
            request[key] = station_info[key]

        if (has_photo):
            photo_processing_res = self.get_repair(repair)
            pca_photo_res = self.pca_photo.transform(
                photo_processing_res['embeddings'].reshape(1, -1))[0]
            for i in range(len(pca_photo_res)):
                request[f'pca_photo_{i}'] = pca_photo_res[i]
            request['interior_style'] = photo_processing_res['interior_style']
            request['interior_qual'] = photo_processing_res['interior_qual']
        else:
            request['interior_style'] = repair[0]
            request['interior_qual'] = repair[1]

        text_embeddings = self._get_text_embeddings(params['text'])
        pca_text_res = self.pca_text.transform(
            text_embeddings.reshape(1, -1))[0]
        for i in range(len(pca_text_res)):
            request[f'pca_text_{i}'] = pca_text_res[i]

        # print(request)
        # print(city)
        prediction = 0
        if (has_photo):
            if (has_zhkh):
                request = pd.DataFrame(request, index=[0])
                request = request[self.cols_orders[city]['head_full']]
                prediction = self.heads[city]['head_full'].predict(request)[0]
                # print('head_full')
            else:
                request = pd.DataFrame(request, index=[0])
                request = request[self.cols_orders[city]['head_without_zhkh']]
                prediction = self.heads[city]['head_without_zhkh'].predict(request)[
                    0]
                # print('head_without_zhkh')
        else:
            if (has_zhkh):
                request = pd.DataFrame(request, index=[0])
                request = request[self.cols_orders[city]['head_without_photo']]
                prediction = self.heads[city]['head_without_photo'].predict(
                    pd.DataFrame(request, index=[0]))[0]
                # print('head_without_photo')
            else:
                request = pd.DataFrame(request, index=[0])
                request = request[self.cols_orders[city]
                                  ['head_without_photo_and_zhkh']]
                prediction = self.heads[city]['head_without_photo_and_zhkh'].predict(
                    pd.DataFrame(request, index=[0]))[0]
                # print('head_without_photo_and_zhkh')

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
            # Подгоняем изображение под размер модели
            img = pil_image.resize(input_shape)
            img_array = img_to_array(img)
            # Нормализация пикселей (если модель ожидает значения от 0 до 1)
            img_array /= 255.0
            image_array[i] = img_array

        predictions_of_photo_type = self.photo_classifier.predict(
            image_array, verbose=0)
        flat_thr = 0.8
        outdoor_thr = 0.5
        flats = np.array(range(predictions_of_photo_type.shape[0]))[
            predictions_of_photo_type[:, 0] > flat_thr]

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
                x = self.estimator(data.view(1, 3, 224, 224))
                x = x.view(x.size(0), -1)
                x2 = self.hook_info['avgpool'].reshape((1, 100))
                if (iter_estims.shape[0] == 0):
                    iter_estims = x.cpu()
                    embeddings = x2.cpu()
                else:
                    iter_estims = torch.concat((iter_estims, x.cpu()))
                    embeddings = torch.concat((embeddings, x2.cpu()))

        interior_style, interior_qual = iter_estims.mean(axis=0).numpy()
        embeddings = embeddings.mean(axis=0).numpy()
        return {'interior_style': interior_style, 'interior_qual': interior_qual, 'embeddings': embeddings}
    
    def get_appart_info(self, address) -> dict:
        '''
        params: dict with keys:
            - 'address': str
        return: dict with keys:
            - 'house_year': int
            - 'metro_name': str
            - 'metro_dist': float
        '''
        res = {}
        formated_adress = get_formated_adress(address)
        latitude, longitude = self._get_coordinates_photon_with_retry(address)
        if latitude is None:
            latitude, longitude = self._get_coordinates_photon_with_retry(
                formated_adress)
            if latitude is None:
                raise Exception('Не удалось определить координаты по адресу')

        city = self._get_city_by_coords((latitude, longitude))
        res['region'] = city
        zhkh_id = get_zhkh_new(formated_adress, self.df_zhkh)
        if (zhkh_id == None):
            res['house_year'] = 0
        else:
            info = self.df_zhkh.drop(
                columns=["Форматированный адрес", 'index', "Адрес", "Ссылка", ]).iloc[zhkh_id]
            res['house_year'] = info['Год постройки']
        y, x = self._coordinates_to_distance_from_city_center(
            (latitude, longitude), city)
        res['metro_name'] = self._get_metro_info((x, y), city)['nearest_metro']
        speed = 0.05
        res['metro_min'] = self._get_metro_info(
            (x, y), city)['nearest_metro_dist'] / speed        
        return res
    
    def get_infrastructure(self, address):
        '''
        params: dict with keys:
            - 'address': str
        return: dict with keys:
            - 'hospitals': {
                    "count": "int",
                    "items": [
                        {
                            "name": "str",
                            "point": ["int", "int"]
                        },
                        {
                            "name": "str",
                            "point": ["int", "int"]
                        },
                        ...
                    ]
            - 'shops': ...
            ...
        '''
        res = {}
        formated_adress = get_formated_adress(address)
        latitude, longitude = self._get_coordinates_photon_with_retry(address)
        if latitude is None:
            latitude, longitude = self._get_coordinates_photon_with_retry(
                formated_adress)
            if latitude is None:
                raise Exception('Не удалось определить координаты по адресу')

        city = self._get_city_by_coords((latitude, longitude))
        y, x = self._coordinates_to_distance_from_city_center(
            (latitude, longitude), city)
        return self._get_nearest_infro_names((x, y), city)
