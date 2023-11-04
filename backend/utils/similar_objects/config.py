from typing import List, Dict

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
    'min': 0.5,
    'max': 1.5
}

rad: float = 10.0
flats_to_show: int = 5
