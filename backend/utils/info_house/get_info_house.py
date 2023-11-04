import pandas as pd
from typing import List, Dict, Union
import re
import os

from config import street_change, home_change


class ObjectInfo:

    def __init__(self):
        file_name = "zhkh_final.csv"
        current_file_path = os.path.abspath(__file__)
        current_directory = os.path.dirname(current_file_path)
        path_csv = os.path.join(current_directory, file_name)
        self.zh_df = pd.read_csv(path_csv)

    def PrepareToReformat(self, address: str) -> str:
        address = address.replace('корпус ', 'к')
        address = address.replace('строение ', 'с')
        address = address.replace('Строение ', 'с')
        address = address.replace('кв-л', 'квартал')
        address = address.replace('пр-д', 'проезд')
        address = re.sub(r'^п\. .*, ул\. (.*),(.*)', r'\1 ул.,\2', address)
        address = re.sub(r'^п\. (.*?), (.*)', r'\2', address)
        address = re.sub(r'^ул\. (.*),(.*)', r'\1 ул.,\2', address)
        address = re.sub(r'^проезд,?\.? (.*),(.*)', r'\1 проезд,\2', address)
        address = re.sub(r'^пер\.,?\.? (.*),(.*)', r'\1 пер,\2', address)
        address = address.replace('пер\.', 'пер')
        address = address.replace('б-р', 'бульвар')
        address = address.replace('пр-кт', 'проспект')
        address = re.sub(r'^туп\.,?\.? (.*),(.*)', r'\1 туп,\2', address)
        address = re.sub(r'^ш\.,?\.? (.*),(.*)', r'\1 ш,\2', address)
        return address

    def ReformatAddress(self, address: str) -> str:
        formatted_address: str = ""
        if address.lower().find("москва") != -1:
            formatted_address = "Москва, город Москва"
        elif address.lower().find("санкт-петербург") != -1:
            formatted_address = "Санкт-Петербург, город Санкт-Петербург"
        elif address.lower().find("екатеринбург") != -1 or \
                address.lower().find("свердловская область") != -1 or \
                address.lower().find("область свердловская") != -1:
            formatted_address = "Свердловская область, город Екатеринбург"
        elif address.lower().find("новосибирск") != -1:
            formatted_address = "Новосибирская область, город Новосибирск"
        elif address.lower().find("казань") != -1 or \
                address.lower().find("республика татарстан") != -1 or \
                address.lower().find("татарстан республика") != -1:
            formatted_address = "Республика Татарстан, город Казань"
        elif address.lower().find("нижний новгород") != -1 or \
                address.lower().find("нижегородская область") != -1 or \
                address.lower().find("область нижегородская") != -1:
            formatted_address = "Нижегородская область, город Нижний Новгород"
        parts: List[str] = address.split(", ")
        for pattern in home_change:
            parts[-1] = re.sub(pattern, "", parts[-1])
        address = ", ".join(parts)
        for k in range(len(parts)):
            words: List[str] = parts[k].split()
            rest: str = ""
            street: str = ""
            for j in range(len(words)):
                if words[j] in street_change.keys():
                    rest = street_change[words[j]]
                    street = " ".join(words[0:j] + words[j + 1:])
                    break
            if rest != "":
                formatted_address += ", " + rest + street
                break
        home: str = "".join(address.split(", ")[-1].split())
        res = ""
        for symb in home:
            if symb in ['к', 'К', 'k', 'K']:
                if res != "":
                    res += " "
                res += "к"
            elif symb in ['с', 'С', 'c', 'C']:
                if res != "":
                    res += " "
                res += "с"
            else:
                res += symb.lower()
        formatted_address += ", " + res
        return formatted_address

    def get_info_house(self, address: str) -> Dict[str, Union[str, int, None]]:
        address = self.ReformatAddress(self.PrepareToReformat(address))
        res: Dict[str, Union[str, int, None]] = dict()
        if len(self.zh_df[self.zh_df["Форматированный адрес lowercase"] == address.lower()]) != 0:
            homes: pd.DataFrame = self.zh_df[self.zh_df["Форматированный адрес lowercase"] == address.lower()]
            res["year"] = homes.loc[homes.index[0], "Год постройки"]
            res["count_entrances"] = homes.loc[homes.index[0], "Количество подъездов"]
            res["gas"] = homes.loc[homes.index[0], "Газоснабжение"]
            res["hot_water"] = homes.loc[homes.index[0], "Горячее водоснабжение"]
        else:
            res["year"] = res["count_entrances"] = res["gas"] = res["hot_water"] = None
        return res
        
