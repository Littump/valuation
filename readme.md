# Проект "Оценка стоимости недвижимости"

## Описание проекта

Проект "Оценка стоимости недвижимости" представляет собой веб-приложение, разработанное для определения стоимости квартиры на основе различных входных параметров. В проекте используется искусственный интеллект (ИИ), который прогнозирует реальную стоимость квартиры на основе предоставленных данных.

## Основные функции

Проект включает следующие основные функции:

- **Ввод параметров квартиры:** Пользователь может ввести различные параметры квартиры, такие как адрес, этаж, площадь, количество комнат и другие.
- **Использование машинного обучения:** Проект использует модели машинного обучения для анализа введенных данных и предсказания стоимости квартиры.
- **Аналитика:** ...
- **...**

## Технологии и инструменты

Проект использует следующие технологии и инструменты:

- **Python / Django:** Веб-фреймворк для создания веб-приложений.
- **Postgres:** Для хранения данных.
- **...:** Библиотека для машинного обучения и анализа данных.
- **HTML/CSS:** Для создания пользовательского интерфейса.
- **Nginx и Gunicorn:** Для развертывания веб-приложения.
- **NLTK (Natural Language Toolkit):** Для обработки естественного языка.

## Как запустить проект
Чтобы использовать проект "Оценка стоимости квартиры", выполните следующие шаги:

1. **Склонируйте репозиторий:**
    Вы можете склонировать репозиторий проекта из GitHub, выполнив следующую команду в командной строке:

    ```
    git clone https://github.com/Littump/valuation.git
    ```
2. **Перейдите в папку infra-local:**
    После того как репозиторий склонирован, перейдите в папку infra-local, где находится файл docker-compose.yml:

    ```
    cd valuation/infra-local
    ```
3. **Запустите Docker Compose:**
    Вы можете запустить проект с использованием Docker Compose с помощью следующей команды:
    
    ```
    docker-compose up --build
    ```
4. **Выполните миграции и установки:**
    Для настройки проекта выполните следующие команды:
    
    ```
    sudo docker-compose exec backend python manage.py migrate
    sudo docker-compose exec backend python -m nltk.downloader punkt
    sudo docker-compose exec backend python -m nltk.downloader stopwords
    ```
5. **Посещение веб-сайта:**
    Веб-сайт проекта будет доступен по адресу localhost.

## API:

...

## Дальнейшие улучшения

Проект может быть доработан и улучшен следующими способами:

- Оптимизация моделей: Улучшение точности моделей машинного обучения.

- Разработка мобильного приложения: Создание мобильного приложения для оценки стоимости квартиры.

- ...

## Авторы

1. Виноградов Иван (@Rollersman) - ML-developer
2. Даутов Максим (@abobanetrar) - Data Scientist
3. Игитов Максим (@MaksIgitov) - Data Scientist
4. Ратков Виктор (@physnomath) - ML-developer
5. Якимов Роман (@littump) - Fullstack-developer

Проект был сделан при поддержке Газпромбанк.Тех

## Лицензия

Проект распространяется под лицензией MIT с ограничениями.

Автор (создатель) обладает всеми правами на это программное обеспечение и его использование ограничивается следующими условиями:

1. Это программное обеспечение предназначено только для личного использования автора (создателя) и не может быть распространено, скопировано, передано или предоставлено другим лицам без явного письменного разрешения автора (создателя).

2. Модификация и адаптация этого программного обеспечения разрешены только для личного использования автора (создателя) и не могут быть распространены или использованы другими пользователями без разрешения автора (создателя).

3. Этот текст лицензии должен быть включен во все копии и модификации программного обеспечения.

Данная лицензия не предоставляет никаких гарантий и не несет ответственности за ущерб, прямой или косвенный, который может возникнуть в результате использования этого программного обеспечения.

Автор (создатель) оставляет за собой право изменять условия этой лицензии в любое время и без уведомления.
