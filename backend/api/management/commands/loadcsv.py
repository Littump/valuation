import csv
import os

from django.core.management.base import BaseCommand

from api.models import User, Property


class Command(BaseCommand):
    def handle(self, *args, **options):
        def data_from_csv():
            file_name = "data.csv"
            current_file_path = os.path.abspath(__file__)
            current_directory = os.path.dirname(current_file_path)
            path_csv = os.path.join(current_directory, file_name)

            data = []
            with open(path_csv, 'r') as file:
                reader = csv.DictReader(file)
                for row in reader:
                    data.append(row)
            return data

        def main():
            user, created = User.objects.get_or_create(
                username="theUser",
                first_name="John",
                last_name="James",
                email="john@email.com",
                password="12345asdeq",
            )
            data = data_from_csv()
            for elem in data:
                house_material = elem['house_material']
                parking_type = elem['parking_type']
                metro_name = elem['metro_name'] if elem['metro_name'] != '0' else None
                house_year = int(float(elem['house_year'])) if elem['house_year'] != '0' else None
                latitude = round(float(elem['latitude']), 6)
                longitude = round(float(elem['longitude']), 6)

                try:
                    Property.objects.create(
                        house_material=house_material,
                        object_type=int(elem['object_type']),
                        repair=elem['repair'],
                        metro_how=int(elem['metro_how']),
                        has_lift=int(elem['has_lift']),
                        parking_type=parking_type,
                        region=elem['region'],
                        address=elem['address'],
                        metro_name=metro_name,
                        floor=int(elem['floor']),
                        house_year=house_year,
                        cnt_rooms=float(elem['cnt_rooms']),
                        floors=int(elem['floors']),
                        metro_min=int(elem['metro_min']),
                        price_sell=int(elem['price_sell']),
                        area=float(elem['area']),
                        latitude=latitude,
                        longitude=longitude,
                        text='',
                        author=user,
                    )
                except Exception as e:
                    print(f'Error: {e}\nData: {elem}\n\n\n')

        main()
