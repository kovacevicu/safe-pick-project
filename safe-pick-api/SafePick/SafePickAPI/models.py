from django.db import models

class Users(models.Model):
    uid = models.AutoField('uid',primary_key=True)
    email = models.EmailField('email',max_length=254)
    password = models.CharField('password',max_length=254)
    country = models.CharField('country',max_length=254)
    city = models.CharField('city',max_length=254)
    active = models.BooleanField('active',default=False)
    token = models.CharField('token',max_length=254)