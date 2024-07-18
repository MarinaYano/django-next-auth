from django.urls import path
from accounts import views

urlpatterns = [
  path('users/<uid>/', views.UserDetailView.as_view()),
]