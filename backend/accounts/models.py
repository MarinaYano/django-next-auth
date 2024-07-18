from django.db import models
from django.contrib.auth.models import (
    AbstractBaseUser,
    BaseUserManager,
    PermissionsMixin
)
from django.db.models.signals import post_save
from django.dispatch import receiver
from hashids import Hashids
import secrets

# user manager class
class UserManager(BaseUserManager):
    def create_user(self, email, password=None, **extra_fields):
        if not email:
            raise ValueError('The Email field must be set')
        
        email = self.normalize_email(email)
        email = email.lower()

        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save()
        return user

    def create_superuser(self, email, password=None, **extra_fields):
        user = self.create_user(email, password, **extra_fields)
        user.is_superuser = True
        user.is_staff = True
        user.save()

        return user
    

class UserAccount(AbstractBaseUser, PermissionsMixin):
    uid = models.CharField("uid", max_length=30, unique=True)
    email = models.EmailField('email', max_length=255, unique=True)
    name = models.CharField('name', max_length=30)
    avatar = models.ImageField(upload_to='avatars', verbose_name='profile-image', null=True, blank=True)
    introduction = models.TextField('introduction', max_length=500, blank=True)
    updated_at = models.DateTimeField('updated_at', auto_now=True)
    created_at = models.DateTimeField('created_at', auto_now_add=True)

    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)

    objects = UserManager()
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['name']

    class Meta:
        verbose_name = 'user'
        verbose_name_plural = 'users'

    def __str__(self):
        return self.name
    

@receiver(post_save, sender=UserAccount)
def generate_random_uid(sender, instance, created, **kwargs):
    if created:
        hashids = Hashids(salt=secrets.token_hex(32), min_length=8)
        instance.uid = hashids.encode(instance.id)
        instance.save()