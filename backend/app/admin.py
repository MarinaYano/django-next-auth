from django.contrib import admin
from django.contrib.admin import ModelAdmin
from app.models import Post

class PostCustom(ModelAdmin):
    list_display = ('uid', 'user', 'title', 'created_at', 'updated_at')
    list_display_links = ('uid','user', 'title')
    ordering = ('-created_at',)
    readonly_fields = ('uid', 'created_at', 'updated_at')

admin.site.register(Post, PostCustom)
