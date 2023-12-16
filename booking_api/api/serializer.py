from rest_framework import serializers
from django.contrib.auth.hashers import make_password
from django.contrib.auth.models import User
from booking.models import BookingModel

class BookingSerializer(serializers.ModelSerializer):
    class Meta:
        model = BookingModel
        fields = "__all__"

class UserSerializer(serializers.Serializer):
    username = serializers.CharField()
    email = serializers.EmailField()
    password = serializers.CharField()
