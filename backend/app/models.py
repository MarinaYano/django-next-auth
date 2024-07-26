from django.db import models
from django.conf import settings
from django.db.models.signals import post_save
from django.dispatch import receiver
from hashids import Hashids

class Post(models.Model):
    uid = models.CharField('uid', max_length=30, unique=True)
    user = models.ForeignKey(settings.AUTH_USER_MODEL, verbose_name='user', on_delete=models.CASCADE)
    image = models.ImageField(upload_to='post', verbose_name='image', null=True, blank=True)
    title = models.CharField('title', max_length=255)
    content = models.TextField('content')
    created_at = models.DateTimeField('created_at', auto_now_add=True)
    updated_at = models.DateTimeField('updated_at', auto_now=True)

    class Meta:
        verbose_name = 'post'
        verbose_name_plural = 'posts'

    def __str__(self):
        return self.title
    
@receiver(post_save, sender=Post)
def generate_random_post_uid(sender, instance, created, **kwargs):
    if created:
        hashids = Hashids(salt='xRXSMT8XpzdUbDNM9qkv6raerwre3223', min_length=10)
        instance.uid = hashids.encode(instance.id)
        instance.save()