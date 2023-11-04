import os
import pandas as pd
from typing import List, Dict, Union
from geopy.distance import geodesic
from .config import weights, num_features, cat_features, area_borders, rad, flats_to_show


class ObjectsHelper:
    def __init__(self):
        file_name = 'real_estate.csv'
        current_file_path = os.path.abspath(__file__)
        current_directory = os.path.dirname(current_file_path)
        path_csv = os.path.join(current_directory, file_name)
        self.flat_df = pd.read_csv(path_csv)

    @staticmethod
    def distance_multi(cut_flat_df: pd.DataFrame, target_flat_info: Dict[str, Union[str, float, int]]) -> (
            List)[tuple[int, float]]:
        target_flat_info["interior_style"]: float = float(target_flat_info["repair"].split(";")[0])
        target_flat_info["interior_qual"]: float = float(target_flat_info["repair"].split(";")[1])
        dist: pd.Series = pd.Series([0] * len(cut_flat_df))
        dist.index = cut_flat_df.index
        for feature in num_features:
            weight: float = weights[feature]
            value: float = target_flat_info[feature]
            sigma: float = cut_flat_df[feature].std()
            dist += weight ** 2 * ((cut_flat_df[feature] - value) / sigma) ** 2
        for feature in cat_features:
            weight: float = weights[feature]
            value: str = target_flat_info[feature]
            dist[cut_flat_df[feature] != value] += weight ** 2
        return [(index, dist[index]) for index in dist.index]

    def flat_neighbors(self, target_flat_info: Dict[str, Union[str, float, int]]) -> (
            List)[Dict[str, Union[int, float, str, None]]]:
        target_flat_point: tuple[float, float] = (target_flat_info["latitude"], target_flat_info["longitude"])
        reg: str = target_flat_info['region']
        cut_flat_df = self.flat_df[(self.flat_df["region"] == reg) &
                                   (self.flat_df['area'] > area_borders['min'] * target_flat_info['area']) &
                                   (self.flat_df['area'] < area_borders['max'] * target_flat_info['area'])]
        near_flats: List[int] = []
        for ind in cut_flat_df.index:
            flat_from_df_point = (cut_flat_df.loc[ind, "latitude"], cut_flat_df.loc[ind, "longitude"])
            if geodesic(flat_from_df_point, target_flat_point) < rad:
                near_flats.append(ind)
        cut_flat_df = cut_flat_df.loc[near_flats, :]
        mas: List[tuple[int, float]] = self.distance_multi(cut_flat_df, target_flat_info)
        mas.sort(key=lambda x: x[1])
        ret: List[int] = [elem[0] for elem in mas]
        ret = ret[:min(flats_to_show, len(mas))]
        neighbors_list: List[Dict[str, Union[int, float, str, None]]] = [dict()] * len(ret)
        for ind in range(len(ret)):
            neighbors_list[ind]["house_material"] = cut_flat_df.loc[ret[ind], "house_material"]
            neighbors_list[ind]["price"] = cut_flat_df.loc[ret[ind], "price"]
            neighbors_list[ind]["latitude"] = cut_flat_df.loc[ret[ind], "latitude"]
            neighbors_list[ind]["longitude"] = cut_flat_df.loc[ret[ind], "longitude"]
            neighbors_list[ind]["parking_type"] = cut_flat_df.loc[ret[ind], "parking_type"]
            neighbors_list[ind]["object_type"] = cut_flat_df.loc[ret[ind], "object_type"]
            neighbors_list[ind]["cnt_rooms"] = cut_flat_df.loc[ret[ind], "cnt_rooms"]
            neighbors_list[ind]["has_lift"] = cut_flat_df.loc[ret[ind], "has_lift"]
            neighbors_list[ind]["floor"] = cut_flat_df.loc[ret[ind], "floor"]
            neighbors_list[ind]["floors"] = cut_flat_df.loc[ret[ind], "floors"]
            neighbors_list[ind]["area"] = cut_flat_df.loc[ret[ind], "area"]
            neighbors_list[ind]["text"] = cut_flat_df.loc[ret[ind], "text"]
            neighbors_list[ind]["address"] = cut_flat_df.loc[ret[ind], "address"]
            neighbors_list[ind]["hot_water"] = cut_flat_df.loc[ret[ind], "Горячее водоснабжение"]
            neighbors_list[ind]["year"] = cut_flat_df.loc[ret[ind], "Год постройки"]
            neighbors_list[ind]["count_entrances"] = cut_flat_df.loc[ret[ind], "Количество подъездов"]
            neighbors_list[ind]["gas"] = cut_flat_df.loc[ret[ind], "Газоснабжение"]
            neighbors_list[ind]["repair"] = (str(int(cut_flat_df.loc[ret[ind], "interior_style"])) +
                                             ";" + str(int(cut_flat_df.loc[ret[ind], "interior_qual"])))
        return neighbors_list
        
