import base64

from rest_framework import serializers
from django.core.files.base import ContentFile

# deals with base64 encoded images
class Base64ImageField(serializers.ImageField):
    def to_internal_value(self, data):
        if isinstance(data, str) and data.startswith('data:image'):
            # base64 encoded image - decode
            format, imgstr = data.split(';base64,')
            # get the file extension
            ext = format.split('/')[-1]
            # decode image data and create a ContentFile object
            data = ContentFile(base64.b64decode(imgstr), name='temp.' + ext)

        return super(Base64ImageField, self).to_internal_value(data)