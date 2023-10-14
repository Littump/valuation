from django.contrib.auth.models import AbstractUser
from django.db import models


class User(AbstractUser):
    ROLE_CHOICES = (
        ('analyst', 'Аналитик'),
        ('appraiser', 'Оценщик'),
        ('investor', 'Инвестор'),
        ('employee', 'Сотрудник'),
    )

    role = models.CharField(max_length=10, choices=ROLE_CHOICES)


class Property(models.Model):
    address = models.TextField()
    house_material = models.TextField()
    object_type = models.CharField(max_length=10)
    cnt_rooms = models.PositiveIntegerField()
    floor = models.PositiveIntegerField()
    area = models.FloatField()
    repair = models.CharField(max_length=10)
    author = models.ForeignKey(User, on_delete=models.CASCADE)
    price = models.PositiveIntegerField()
    region = models.CharField(max_length=255)
    floors = models.PositiveIntegerField()
    house_year = models.PositiveIntegerField()
    metro_name = models.CharField(max_length=255)
    metro_min = models.PositiveIntegerField()
    metro_how = models.CharField(max_length=255)
    text = models.TextField(blank=True)
    has_lift = models.CharField(max_length=255, blank=True)
    parking_type = models.CharField(max_length=255, blank=True)
