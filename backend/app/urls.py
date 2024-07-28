from django.urls import path, include
from rest_framework import routers
from app import views

router = routers.DefaultRouter()
router.register('posts', views.PostViewSet)

urlpatterns = [
    path('post-list/', views.PostListView.as_new()),
    path('post-detail/<uid>/', views.PostDetailView.as_new()),
    path('', include(router.urls)),
]
