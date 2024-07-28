from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('api/auth/', include('djoser.urls')),
    path('api/auth/', include('djoser.urls.jwt')),
    path('api/', include('accounts.urls')),
    path('api/', include('app.urls')),
    path('admin/', admin.site.urls),
]
