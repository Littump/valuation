# import csv

# from backend.api.models import User, Property


# def main():
#     data = []
#     with open('train_df_without_na.csv', 'r') as file:
#         reader = csv.DictReader(file)
#         for row in reader:
#             data.append(row)
            
#     for elem in data:
#         Property.object.create(
#             address=,
#             house_material=,
#             text=,
#             object_type=,
#             cnt_rooms=,
#             floor=,
#             floors=,
#             area=,
#             repair=,
#             has_lift=,
#             parking_type=,
#             price_sell=,
#             metro_how=,
#             region=,
#             metro_name=,
#             house_year=,
#             metro_min=,
#             author=,
#         )
        
#         {'region': 'msc',
#          'object_type': '2', 
#          'rooms': '1',
#          'price': '6000000',
#          'house_material': '0', 
#          'parking_type': 'grn', 
#          'area': '28.0', 
#          'floor': '1', 
#          'id': '66', 
#          'cnt_rooms': '1',
#          'has_lift': '0',
#          'sq_m_price': '214285.7142857143', 
#          'latitude': '55.57804985', 
#          'longitude': '37.65739459377893', 
#          'y_coord': '-19.36675482653293', 
#          'x_coord': '2.4903569357658557', 
#          'dist_to_center': '19.526921102701305'}


# if __name__ == '__main__':
#     main()