from django.db import models
from django.contrib.auth import get_user_model

User = get_user_model()


class LimitToken(models.Model):
    author = models.ForeignKey(User, on_delete=models.CASCADE)
    limit = models.IntegerField(default=5)


class Property(models.Model):
    id = models.AutoField(primary_key=True)

    HOUSE_MATERIAL_CHOICES = (
        ('brc', 'Кирпичный'),
        ('mnl', 'Монолитный'),
        ('pnl', 'Панельный'),
        ('blc', 'Блочный'),
        ('wdn', 'Деревянный'),
        ('stl', 'Сталинский'),
        ('brm', 'Кирпично-монолитный'),
        ('0', 'Отсутствует'),
    )
    house_material = models.CharField(
        max_length=3,
        choices=HOUSE_MATERIAL_CHOICES
    )

    OBJECT_TYPE = (
        (1, 'Первичка'),
        (2, 'Вторичка'),
    )
    object_type = models.PositiveIntegerField(choices=OBJECT_TYPE)

    REPAIR_TYPE = (
        ('0;0', 'Черновая отделка без ремонта'),
        ('1;0', 'Средняя отделка без ремонта'),
        ('2;0', 'Предчистовая отделка без ремонта'),
        ('0;1', 'Старый ремонт без мебели'),
        ('1;1', 'Косметический ремонт без мебели'),
        ('2;1', 'Евроремонт ремонт без мебели'),
        ('3;1', 'Дизайнерский ремонт без мебели'),
        ('0;2', 'Старый ремонт с мебелью'),
        ('1;2', 'Косметический ремонт с мебелью'),
        ('2;2', 'Евроремонт ремонт с мебелью'),
        ('3;2', 'Дизайнерский ремонт с мебелью'),
    )
    repair = models.CharField(
        max_length=3,
        choices=REPAIR_TYPE,
    )

    METRO_HOW_TYPE = (
        (1, 'Пешком'),
        (2, 'На машине'),
    )
    metro_how = models.PositiveIntegerField(choices=METRO_HOW_TYPE)

    HAS_LIFT_TYPE = (
        (1, 'Имеется'),
        (0, 'Отсутствует'),
    )
    has_lift = models.IntegerField(choices=HAS_LIFT_TYPE)

    PARKING_TYPE_TYPE = (
        ('grn', 'Наземная'),
        ('mlt', 'Многоуровневая'),
        ('und', 'Подземная'),
        ('orf', 'На крыше'),
        ('0', 'Отсутствует'),
    )
    parking_type = models.CharField(
        max_length=4,
        choices=PARKING_TYPE_TYPE
    )

    REGION_CHOICES = (
        ('msc', 'Москва'),
        ('spb', 'Санкт-Петербург'),
        ('kzn', 'Казань'),
        ('nng', 'Нижний Новгород'),
        ('ekb', 'Екатеринбург'),
        ('nsb', 'Новосибирск'),
    )
    region = models.CharField(
        max_length=32,
        choices=REGION_CHOICES,
    )

    address = models.CharField(max_length=256)
    metro_name = models.CharField(max_length=32, null=True)

    floor = models.IntegerField()
    house_year = models.IntegerField(null=True)
    cnt_rooms = models.FloatField()
    floors = models.PositiveIntegerField()
    metro_min = models.PositiveIntegerField(null=True)
    price_buy = models.IntegerField(null=True)
    price_sell = models.IntegerField(null=True)

    area = models.FloatField()
    latitude = models.FloatField(blank=True)
    longitude = models.FloatField(blank=True)

    author = models.ForeignKey(User, on_delete=models.CASCADE)

    text = models.TextField(null=True, blank=True)

    class Meta:
        constraints = [
            models.UniqueConstraint(
                fields=['address', 'price_sell', 'floor'],
                name='Unuque property',
            )
        ]
