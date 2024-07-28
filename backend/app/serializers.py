from rest_framework import serializers
from accounts.serializers import UserSerializer
from mysite.utils import Base64ImageField
from app.models import Post

class PostSerializer(serializers.ModelSerializer):
    uid = serializers.CharField(read_only=True)
    user = UserSerializer(read_only=True)
    image = Base64ImageField(max_length=None, use_url=True, required=False, allow_null=True)

    class Meta:
        model = Post
        fields = '__all__'