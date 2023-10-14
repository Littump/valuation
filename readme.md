# Инструкция по запуску и использованию проекта "valuation"

Следуйте этой инструкции, чтобы склонировать, собрать и запустить проект "valuation" в Docker-контейнере.

## 1. Клонирование репозитория

Сначала склонируйте репозиторий с помощью команды:

```bash
git clone https://github.com/Littump/valuation.git
2. Переход в папку backend
Перейдите в папку проекта:

bash
Copy code
cd valuation/backend
3. Сборка Docker-образа
Соберите Docker-образ с помощью команды:

bash
Copy code
docker build -t valuation_backend .
4. Запуск контейнера
Запустите контейнер с помощью команды:

bash
Copy code
docker run --rm -p 8000:8000 valuation_backend
5. Отправка запросов
Теперь вы можете отправлять HTTP-запросы на http://localhost:8000/.

Создание пользователя
Отправьте POST-запрос для создания пользователя:

json
Copy code
POST http://localhost:8000/api/users/
{
  "email": "vpupkin@yandex.ru",
  "username": "vasya.pupkin",
  "first_name": "Вася",
  "last_name": "Пупкин",
  "password": "Qwerty123Qwerty"
}
Получение токена
Для получения токена отправьте POST-запрос:

json
Copy code
POST http://localhost:8000/api/auth/token/login/
{
  "password": "Qwerty123Qwerty",
  "username": "vasya.pupkin"
}
Получение стоимости
Отправьте GET-запрос, чтобы получить стоимость:

json
Copy code
GET http://localhost:8000/api/property/get_price/
{
    "address": "Moscow",
    "house_material": "1",
    "object_type": "2",
    "cnt_rooms": "3",
    "floor": "4",
    "area": "5",
    "repair": "6"
}
Управление квартирами
Вы можете создавать, удалять и получать информацию о квартирах с использованием GET, POST и DELETE запросов на:

json
Copy code
GET/POST/DELETE http://localhost:8000/api/property/
Authorization: Token {token}
{
    "address": "Moscow",
    "house_material": "1",
    "object_type": "2",
    "cnt_rooms": "3",
    "floor": "4",
    "area": "5",
    "repair": "6"
}
Оценка ремонта
Для оценки ремонта отправьте GET-запрос на:

json
Copy code
GET http://localhost:8000/api/property/calculate_repair
Authorization: Token {token}
{
    "photos": ["sdfnjw2bj", "asdhu2gduiq"]
}