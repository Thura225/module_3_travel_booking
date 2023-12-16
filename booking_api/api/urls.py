from django.urls import path,include
from .views import BookingViewSet
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register('bookings',BookingViewSet)

urlpatterns = [
    path('',include(router.urls)),
]