from django.contrib.auth.models import AbstractUser
from django.db import models


class User(AbstractUser):
    ROLE_CHOICES = (
        ('analyst', 'Аналитик'),
        ('appraiser', 'Оценщик'),
        ('investor', 'Инвестор'),
        ('employee', 'Сотрудник'),
    )

    role = models.CharField(choices=ROLE_CHOICES)


class Property(models.Model):

    HOUSE_MATERIAL_CHOICES = (
        ('brc', 'Кирпичный'),
        ('mnl', 'Монолитный'),
        ('pnl', 'Панельный'),
        ('blc', 'Блочный'),
        ('wdn', 'Деревянный'),
        ('stl', 'Сталинский'),
        ('brm', 'Кирпично-монолитный'),
    )
    house_material = role = models.CharField(choices=HOUSE_MATERIAL_CHOICES)

    OBJECT_TYPE = (
        (1, 'Первичка'),
        (2, 'Вторичка'),
    )
    object_type = models.PositiveIntegerField(choices=OBJECT_TYPE)

    REPAIR_TYPE = (
        ...
    )
    repair = models.CharField(choices=REPAIR_TYPE)

    METRO_HOW_TYPE = (
        (1, 'Пешком'),
        (2, 'На машине'),
    )
    metro_how = models.PositiveIntegerField(choices=METRO_HOW_TYPE)

    HAS_LIFT_TYPE = (
        (1, 'Имеется'),
        (2, 'Отсутствует'),
    )
    has_lift = models.PositiveIntegerField(choices=HAS_LIFT_TYPE)

    PARKING_TYPE_TYPE = (
        ('grn', 'Наземная'),
        ('mlt', 'Многоуровневая'),
        ('und', 'Подземная'),
        ('orf', 'На крыше'),
        ('none', 'Отсутствует'),
    )
    parking_type = models.CharField(choices=PARKING_TYPE_TYPE)

    address = models.CharField()
    region = models.CharField()
    metro_name = models.CharField()

    floor = models.IntegerField()
    cnt_rooms = models.PositiveIntegerField()
    price = models.PositiveIntegerField()
    floors = models.PositiveIntegerField()
    house_year = models.PositiveIntegerField()
    metro_min = models.PositiveIntegerField()

    area = models.FloatField()

    author = models.ForeignKey(User, on_delete=models.CASCADE)

    text = models.TextField(blank=True)
