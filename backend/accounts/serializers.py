from rest_framework import serializers
from django.contrib.auth import get_user_model
from mysite.utils import Base64ImageField

User = get_user_model()


class UserSerializer(serializers.ModelSerializer):
    uid = serializers.CharField(read_only=True)
    avatar = Base64ImageField(max_length=None, use_url=True, required=False, allow_null=True)

    class Meta:
        model = User
        fields = '__all__'