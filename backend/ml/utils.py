import os
from functools import lru_cache
from io import BytesIO

from PIL import Image

from ml.model import PriceEstimator


def convert_uploaded_files_to_images(uploaded_files):
    images = []
    for uploaded_file in uploaded_files:
        file_data = uploaded_file.read()
        image = Image.open(BytesIO(file_data))
        images.append(image)
    return images


@lru_cache
def get_model():
    current_file_path = os.path.abspath(__file__)
    current_directory = os.path.dirname(current_file_path)
    models_directory = os.path.join(current_directory, "models")
    model = PriceEstimator(models_directory)
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


def get_infrastructure(address):
    model = get_model()
    result = model.get_infrastructure(address)
    return result


def get_appart_info(address):
    model = get_model()
    result = model.get_appart_info(address)
    return result
