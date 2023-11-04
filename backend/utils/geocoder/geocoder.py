import requests
from utils.geocoder.keys import api_keys


def get_coordinates(address: str):
    url = 'https://catalog.api.2gis.com/3.0/items/geocode'
    params = {
        'q': address,
    }
    for key in api_keys:
        params['key'] = key
        response = requests.get(url, params=params)
        if response.status_code != 200:
            continue
        data = response.json()
        if data['meta']['code'] == 200:
            break
    point = data['items'][0]['point']
    full_name = data['items'][0]['full_name']
    return point['lat'], point['lon'], full_name
