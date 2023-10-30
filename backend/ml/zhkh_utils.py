from typing import List

import pandas as pd

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


def RenameDataFrame(df: pd.DataFrame) -> pd.DataFrame:
    df ['Адрес'] = df ['Адрес'].str.replace ('корпус ', 'к')
    df ['Адрес'] = df ['Адрес'].str.replace ('строение ', 'с')
    df ['Адрес'] = df ['Адрес'].str.replace ('Строение ', 'с')
    df ['Адрес'] = df ['Адрес'].str.replace ('кв-л', 'квартал')
    df ['Адрес'] = df ['Адрес'].str.replace ('пр-д', 'проезд')
    df ['Адрес'] = df ['Адрес'].replace (r'^п\. .*, ул\. (.*),(.*)', r'\1 ул.,\2', regex=True)
    df ['Адрес'] = df ['Адрес'].replace (r'^п\. (.*?), (.*)', r'\2', regex=True)
    df ['Адрес'] = df ['Адрес'].replace (r'^ул\. (.*),(.*)', r'\1 ул.,\2', regex=True)
    df ['Адрес'] = df ['Адрес'].replace (r'^проезд,?\.? (.*),(.*)', r'\1 проезд,\2', regex=True)
    df ['Адрес'] = df ['Адрес'].replace (r'^пер\.,?\.? (.*),(.*)', r'\1 пер,\2', regex=True)
    df ['Адрес'] = df ['Адрес'].str.replace ('пер\.', 'пер')
    df ['Адрес'] = df ['Адрес'].str.replace ('б-р', 'бульвар')
    df ['Адрес'] = df ['Адрес'].str.replace ('пр-кт', 'проспект')
    df ['Адрес'] = df ['Адрес'].replace (r'^туп\.,?\.? (.*),(.*)', r'\1 туп,\2', regex=True)
    df ['Адрес'] = df ['Адрес'].replace (r'^ш\.,?\.? (.*),(.*)', r'\1 ш,\2', regex=True)
    return df


def ReformatAddress(df: pd.DataFrame) -> pd.DataFrame:
    df["Изначальный адрес"] = df["Адрес"]
    df = RenameDataFrame(df)
    df["Регион"] =  [df["Адрес"][i].split(", ")[0] for i in range(len(df))]
    df["Населённый пункт"] = ["Empty" for _ in range(len(df))]
    df["Улица"] =  ["Empty" for _ in range(len(df))]
    df["Дом"] =  ["Empty" for _ in range(len(df))]
    for i in range(len(df)):
        if df["Регион"][i] == "Москва":
            df.loc[i, "Населённый пункт"] = "город Москва"
        elif df["Регион"][i] == "Санкт-Петербург":
            df.loc[i, "Населённый пункт"] = "город Санкт-Петербург"
        else:
            df.loc[i, "Населённый пункт"] = "город " + df["Адрес"][i].split(", ")[1]
        parts: List[str] = df["Адрес"][i].split(", ")
        for k in range(len(parts)):
            words: List[str] = parts[k].split()
            for j in range(len(words)):
                if words[j] in town_change.keys():
                    df.loc[i, "Населённый пункт"] = town_change[words[j]]+" ".join(words[0:j] + words[j+1:])
                    df.loc[i, "Адрес"] = ", ".join(parts[:k]+parts[k+1:])
                    break
            rest = ""
            for j in range(len(words)):
                if words[j].find("м.")!=-1:
                    break
                if words[j] in street_change.keys():
                    rest = street_change[words[j]]
                    street = " ".join(words[0:j] + words[j+1:])
                    break
            if rest != "":
                if k == len(parts) - 1:
                    df.loc[i, "Дом"] = df.loc[i, "Улица"]
                df.loc[i, "Улица"] = rest + street
                break
            df.loc[i, "Улица"] = df["Населённый пункт"][i]
        if df.loc[i, "Дом"] == "Empty":
            home = df["Адрес"][i].split(", ")[-1]
            home = home.split()
            for k in range(len(home)):
                if home[k] == "Литер":
                    home[k] = ""
            home = "".join(home)
            res = ""
            for symb in home:
                if symb in ['к','К', 'k', 'K']:
                    if res != "":
                        res += " "
                    res += "к"
                elif symb in ['с','С', 'c', 'C']:
                    if res != "":
                        res += " "
                    res += "с"
                else:
                    res += symb.lower()
            df.loc[i, "Дом"] = res
    df["Форматированный адрес"] = df["Регион"] + ", " + df["Населённый пункт"] + ", " + df["Улица"] + ", " + df["Дом"]
    df["Адрес"] = df["Изначальный адрес"]
    df = df.drop(columns = ["Регион", "Населённый пункт", "Улица", "Дом",])
    df = df.drop(columns = ["Изначальный адрес"])
    return df


def MatchAddress(df_flats: pd.DataFrame, df_zh: pd.DataFrame) -> pd.DataFrame:
    return df_zh[df_zh["Форматированный адрес"] == df_flats["Форматированный адрес"][0]]


def get_zhkh(adress, df_zhkh):
    try:
        res = MatchAddress(ReformatAddress(pd.DataFrame({'Адрес':[adress]})), df_zhkh)
        res = res.drop(columns = ["Форматированный адрес", 'index', "Адрес", "Ссылка", ])
        return res.iloc[0].to_dict()
    except Exception:
        return None
