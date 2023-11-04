import os
import pandas as pd
from typing import List
from geopy.distance import geodesic
from utils.similar_objects.config import weights, num_features, cat_features, area_borders, rad, flats_to_show


class ObjectsHelper:
    
    def __init__(self):
        file_name = 'train_df_without_na.csv'
        current_file_path = os.path.abspath(__file__)
        current_directory = os.path.dirname(current_file_path)
        path_csv = os.path.join(current_directory, file_name)
        self.flat_df = ... # open(path_csv)

    @staticmethod
    def distance_multi(flat_df, target_flat_info) -> List[tuple[int, float]]:
        dist: pd.Series = pd.Series([0] * len(flat_df))
        dist.index = flat_df.index
        for feature in num_features:
            weight: float = weights[feature]
            value: float = target_flat_info[feature]
            mu: float = flat_df[feature].mean()
            sigma: float = flat_df[feature].std()
            print(feature, weight, mu, sigma, value)
            dist += weight  2 * ((flat_df[feature] - value) / sigma)  2
        for feature in cat_features:
            weight: float = weights[feature]
            value: str = target_flat_info[feature]
            dist[flat_df[feature] != value] += weight ** 2
        return [(index, dist[index]) for index in dist.index]

    @staticmethod
    def flat_neighbors(target_flat_info):
        target_flat_point: tuple[float, float] = (target_flat_info["latitude"], target_flat_info["longitude"])
        reg: str = target_flat_info['region']
        flat_df = self.flat_df[(self.flat_df["region"] == reg) &
                        (self.flat_df['area'] > area_borders['min'] * target_flat_info['area']) &
                        (self.flat_df['area'] < area_borders['max'] * target_flat_info['area'])]
        near_flats: List[int] = []
        for ind in flat_df.index:
            flat_from_df_point = (flat_df.loc[ind,"latitude"], flat_df.loc[ind,"longitude"])
            if geodesic(flat_from_df_point, target_flat_point) < rad:
                near_flats.append(ind)
        flat_df = flat_df.loc[near_flats,:]
        mas: List[tuple[int, float]] = distance_multi(flat_df, target_flat_info)
        mas.sort(key=lambda x: x[1])
        ret: List[int] = [elem[0] for elem in mas]
        return ret[:min(flats_to_show, len(mas))]
