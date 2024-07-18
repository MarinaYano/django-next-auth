from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('api/auth/', include('accounts.urls')),
    path('api/auth/', include('djoser.urls.jwt')),
    path('api/', include('accounts.urls')),
    path('admin/', admin.site.urls),
]
