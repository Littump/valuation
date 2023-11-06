from typing import List, Dict

replace_region: Dict[str, str] = {
    "москва": "msc",
    "санкт-петербург": "spb",
    "новосибирск": "nsk",
    "екатеринбург": "ekb",
    "казань": "kzn",
    "нижний новгород": "nng",
    "татарстан": "kzn",
    "свердловск": "ekb",
    "нижегородская": "nng",
}

reg_to_coords: Dict[str, tuple[float, float]] = {"msc": (55.751999, 37.617734),
                                                 "nsk": (55.026498, 82.921457),
                                                 "ekb": (56.838060, 60.603651),
                                                 "nng": (56.326797, 44.006516),
                                                 "kzn": (55.796127, 49.106414),
                                                 "spb": (59.938784, 30.314997)}
num_features: List[str] = [
    'area',
    'dist_to_center',
    'floor',
    'floors',
    'cnt_rooms',
    'interior_qual',
    'interior_style',
]

cat_features: List[str] = ['house_material', 'has_lift', 'object_type', 'parking_type']

weights: Dict[str, float] = {
    'cnt_rooms': 1.0,
    'area': 0.8,
    'house_material': 0.7,
    'dist_to_center': 0.7,
    'interior_qual': 0.7,
    'interior_style': 0.5,
    'floor': 0.5,
    'object_type': 0.5,
    'parking_type': 0.3,
    'has_lift': 0.3,
    'floors': 0.2,
}

area_borders: Dict[str, float] = {
    'min': 0.25,
    'max': 1.25
}

rad: float = 3.5
flats_to_show: int = 5
