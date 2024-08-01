from django.shortcuts import render
from rest_framework.generics import ListAPIView, RetrieveAPIView
from rest_framework.permissions import AllowAny
from rest_framework.viewsets import ModelViewSet
from .models import Post
from .serializers import PostSerializer

class PostListView(ListAPIView):
    queryset = Post.objects.all().order_by('-created_at')
    serializer_class = PostSerializer
    permission_classes = (AllowAny,)


class PostDetailView(RetrieveAPIView):
    queryset = Post.objects.all()
    serializer_class = PostSerializer
    permission_classes = (AllowAny,)
    lookup_field = 'uid'

    def perform_create(self, serializer, **kwargs):
        serializer.save(user=self.request.user)

class PostViewSet(ModelViewSet):
    queryset = Post.objects.all()
    serializer_class = PostSerializer
    lookup_field = 'uid'

    def perform_create(self, serializer, **kwargs):
        serializer.save(user=self.request.user)