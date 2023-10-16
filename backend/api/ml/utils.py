from PIL import Image
import io


def convert_uploaded_files_to_images(uploaded_files):
    images = []
    for uploaded_file in uploaded_files:
        file_data = uploaded_file.read()
        image = Image.open(io.BytesIO(file_data))
        images.append(image)
    return images


def calculate_price(data):
    return None


def get_repair(photos):
    photos = convert_uploaded_files_to_images(photos)
    return None
