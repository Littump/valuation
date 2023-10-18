from PIL import Image
from io import BytesIO
from .model import PriceEstimator
from functools import lru_cache


def convert_uploaded_files_to_images(uploaded_files):
    images = []
    for uploaded_file in uploaded_files:
        file_data = uploaded_file.read()
        image = Image.open(BytesIO(file_data))
        images.append(image)
    return images


@lru_cache
def get_model():
    model = PriceEstimator('/app/api/models')
    return model


def calculate_price(data):
    model = get_model()
    price = model.predict(data)
    return price


def get_repair(photos):
    model = get_model()
    photos = convert_uploaded_files_to_images(photos)
    result = model.get_repair(photos)
    return result
