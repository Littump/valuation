# Инструкция по запуску и использованию проекта "valuation"

Следуйте этой инструкции, чтобы склонировать, собрать и запустить проект "valuation" в Docker-контейнере.

## 1. Клонирование репозитория

1. Сначала склонируйте репозиторий с помощью команды:

```
git clone https://github.com/Littump/valuation.git
```
2. Переход в папку backend
Перейдите в папку проекта:

```
cd valuation/backend
```
3. Сборка Docker-образа
Соберите Docker-образ с помощью команды:

```
docker build -t valuation_backend .
```
4. Запуск контейнера
Запустите контейнер с помощью команды:

```
docker run --rm -p 8000:8000 valuation_backend
```
## 2. Отправка запросов
Теперь вы можете отправлять HTTP-запросы на http://localhost:8000/.

1. Создание пользователя
Отправьте POST-запрос для создания пользователя:

```
POST http://localhost:8000/api/users/
{
  "email": "vpupkin@yandex.ru",
  "username": "vasya.pupkin",
  "first_name": "Вася",
  "last_name": "Пупкин",
  "password": "Qwerty123Qwerty"
}
```
2. Получение токена
Для получения токена отправьте POST-запрос:

```
POST http://localhost:8000/api/auth/token/login/
{
  "password": "Qwerty123Qwerty",
  "username": "vasya.pupkin"
}
```
3. Оценка ремонта
Для оценки ремонта отправьте POST-запрос на:

```
POST http://localhost:8000/api/property/calculate_repair
{
    "photos": ["sdfnjw2bj", "asdhu2gduiq"]
}
```
4. Получение стоимости
Отправьте POST-запрос, чтобы получить стоимость:

```
POST http://localhost:8000/api/property/get_price/
{
    "address": "Москва, Ленинский проспект, дом 11, квартира 7",
    "house_material": "mnl",
    "object_type": "2",
    "cnt_rooms": "3",
    "floor": "4",
    "area": "60.5",
    "repair": "2;2",
    "has_lift": "",
    "parking_type": "",
    "text": ""
}
```
5. Управление квартирами
Вы можете создавать, удалять и получать информацию о квартирах с использованием GET, POST и DELETE запросов на:

```
POST http://localhost:8000/api/property/
Authorization: Token {token}
{
    "address": "Москва, Ленинский проспект, дом 11, квартира 7",
    "house_material": "mnl",
    "object_type": "2",
    "cnt_rooms": "5",
    "floor": "6",
    "area": "66.5",
    "repair": "2;2",
    "has_lift": "",
    "parking_type": "",
    "text": "",
    "price": 2
}
Variants: {
    "address": any str
    "house_material": "brc" | "mnl" | "pnl" | "blc" | "wdn" | "stl" | "brm"
    "object_type": "1" | "2"
    "cnt_rooms": any str
    "floor": any str
    "area": any str
    "repair": str: "int;int"
    "has_lift": 0 | 1
    "parking_type": "0" | "grn" | "mlt" | "und" | "orf"
    "text": any str
    "price": any int
}
```

```
GET http://localhost:8000/api/property/
Authorization: Token {token}

Filters-params: {
    "price": int_min,int_max
    "cnt_rooms": int_min,int_max
    "floor": int_min,int_max
    "area": int_min,int_max
    "floors": int_min,int_max
    "house_year": int_min,int_max
    "metro_min": int_min,int_max

    "house_material": "brc" | "mnl" | "pnl" | "blc" | "wdn" | "stl" | "brm"
    "object_type": "1" | "2"
    "repair": str: "int;int"
    "metro_name": any str

    "address": "Москва" | "Санкт-Петербург" | "Казань" | "Нижний Новгород" | "Новосибирск" | "Екатеринбург"

    "author": 1, если хотим только свои квартиры
}
```
