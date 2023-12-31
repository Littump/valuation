import requests
from utils.geocoder.keys import api_keys


def get_coordinates(address: str):
    url = 'https://catalog.api.2gis.com/3.0/items/geocode'
    params = {
        'q': address,
        'fields': 'items.point',
    }
    for key in api_keys:
        params['key'] = key
        response = requests.get(url, params=params)
        if response.status_code != 200:
            continue
        data = response.json()
        if data['meta']['code'] == 200:
            break
    cities = [
        'Москва',
        'Санкт-Петербург',
        'Нижний Новгород',
        'Казань',
        'Новосибирск',
        'Екатеринбург',
    ]
    for elem in data['result']['items']:
        for city in cities:
            if city in elem['full_name']:
                point = elem['point']
                return point['lat'], point['lon'], elem['full_name']
    point = data['result']['items'][0]['point']
    full_name = data['result']['items'][0]['full_name']
    return point['lat'], point['lon'], full_name
