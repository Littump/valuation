import pandas as pd
from typing import List
from rapidfuzz import fuzz
from rapidfuzz import process
import re

street_change = {"ул.": "улица ", "улица": "улица ", "Улица": "улица ",
                 "пер.": "переулок ", "переулок": "переулок ", "пер..": "переулок ",
                 "проезд": "проезд ", "проезд.": "проезд ",
                 "квартал": "квартал ", "кв-л": "квартал ",
                 "дорога": "дорога ",
                 "ш.": "шоссе ", "шоссе": "шоссе ",
                 "ш": "шоссе",
                 "бульвар": "бульвар ",
                 "проспект": "проспект ",
                 "аллея": "аллея ", "ал.": "аллея ",
                 "линия": "линия ",
                 "тер.": "территория ",
                 "туп.": "тупик ", "тупик": "тупик ",
                 "наб.": "набережная ", "набережная": "набережная ",
                 "мкр.": "микрорайон ", "мкр": "микрорайон ", "мк.": "микрорайон ", "мк": "микрорайон ",
                 "пл.": "площадь ", "площадь": "площадь ", "Площадь": "площадь ",
                 "просек": "просек ",
                 "жилрайон": "жилрайон ",
                 "ЖК": "жилой комплекс ", "Жилой": "жилой комплекс "
                 }
town_change = {"гор.": "город ", "город": "город ",
               "с.": "село ", "село": "село ",
               "д.": "деревня ", "деревня": "деревня ",
               "пос.": "поселение ", "поселение": "поселение ", "п.": "поселение ",
               "Зеленоград": "город Зеленоград",
               "рп": "рабочий посёлок ",
               }

home_change: List[str] = ["дом", "Дом", "д.", "Д.", "д", "Д", "Литер", "литер"]


def PrepareToReformat(address: str) -> str:
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


def ReformatAddress(address: str) -> str:
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


def MatchAddress(address: str, df_zh: pd.DataFrame) -> pd.DataFrame:
    return df_zh[df_zh["Форматированный адрес"] == address]


def get_zhkh(address: str, df_zhkh: pd.DataFrame):
    try:
        res = MatchAddress(ReformatAddress(PrepareToReformat(address)), df_zhkh)
        res = res.drop(columns=["Форматированный адрес", 'index', "Адрес", "Ссылка", ])
        return res.iloc[0].to_dict()
    except:
        return None


def get_zhkh_new(address: str, df_zhkh: pd.DataFrame):
    best_match = process.extractOne(address, list(df_zhkh['Форматированный адрес']), scorer=fuzz.ratio, score_cutoff=97)
    if (best_match != None):
        return best_match[2]
    return None


def get_formated_adress(address):
    return ReformatAddress(PrepareToReformat(address))

