import csv

from api.models import User, Property


def data_from_csv():
    data = []
    with open('data.csv', 'r') as file:
        reader = csv.DictReader(file)
        for row in reader:
            data.append(row)
    return data


def main():
    try:
        user, created = User.objects.get_or_create(
            username="theUser",
            first_name="John",
            last_name="James",
            email="john@email.com",
            password="12345asdeq",
        )
    except Exception:
        pass
    data = data_from_csv()
    for elem in data:
        try:
            Property.objects.create(
                house_material=elem['house_material'],
                object_type=elem['object_type'],
                repair=elem['repair'],
                metro_how=elem['metro_how'],
                has_lift=elem['has_lift'],
                parking_type=elem['parking_type'],
                region=elem['region'],
                address=elem['address'],
                metro_name=elem['metro_name'],
                floor=elem['floor'],
                house_year=elem['house_year'],
                cnt_rooms=elem['cnt_rooms'],
                floors=elem['floors'],
                metro_min=elem['metro_min'],
                price_sell=elem['price_sell'],
                area=elem['area'],
                latitude=elem['latitude'],
                longitude=elem['longitude'],
                author=user,
            )
        except Exception:
            continue
