from selenium import webdriver
from urllib.parse import parse_qs, urlparse

driver = webdriver.Chrome()

max_str = 54


def create_table():
    ...


def insert_data():
    ...


def parse(url_params):
    url = 'https://www.cian.ru/cat.php?deal_type=sale&engine_version=2'
    for page in range(1, max_str + 1):
        url_params['p'] = page
        url_with_params = url + "&" + "&".join(
            [f"{key}={value}" for key, value in url_params.items()]
        )
        driver.get(url_with_params)
        current_url = driver.current_url
        parsed_url = urlparse(current_url)
        query_params = parse_qs(parsed_url.query)
        p_value = query_params.get('p', [''])[0]
        if int(p_value) != page:
            break
        try:
            elements = driver.find_elements(
                'class name', '_93444fe79c--container--Povoi'
            )[::]
        except Exception:
            return

        urls = [
            element.find_element(
                'class name', '_93444fe79c--media--9P6wN'
            ).get_attribute('href') for element in elements
        ]
            
        for url in urls:
            try:
                driver.get(url)

                price = int(driver.find_element(
                    'css selector', "[data-name=PriceInfo]"
                ).find_element(
                    'class name', 'a10a3f92e9--color_black_100--Ephi7'
                ).text[:-2].replace(' ', ''))

                text = driver.find_element(
                    'class name', 'a10a3f92e9--layout--BaqYw'
                ).find_element(
                    'class name', 'a10a3f92e9--color_black_100--Ephi7'
                ).text

                floor = ...

                floors = ...

                insert_data(...)
            except Exception:
                continue


regions = {
    'msc': '1',  # москва
    'spb': '2',  # санкт-петербург
    'ekb': '4743',  # екатеринбург
    'nsk': '4897',  # новосибирск
    'kzn': '4777',  # казань
    'nng': '4885',  # нижний новгород
}

for reg in regions.values():
    url_params = dict()
    url_params['region'] = reg
    for price in range(1_000_000, 30_000_000, 150_000):
        url_params['minprice'] = price
        url_params['maxprice'] = price + 150_000
        parse(url_params)
