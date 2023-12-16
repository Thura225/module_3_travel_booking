from booking.models import BookingModel
from rest_framework.views import APIView,status
from rest_framework.viewsets import ModelViewSet
from rest_framework.response import Response
from .serializer import BookingSerializer,UserSerializer
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth.models import User
from rest_framework.authtoken.models import Token

class BookingViewSet(ModelViewSet):
    queryset = BookingModel.objects.all()
    serializer_class = BookingSerializer
    authentication_classes = [TokenAuthentication]


class UserView(APIView):
    serializer_class = UserSerializer
    def post(self,request):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            user = User.objects.create_user(
                username=serializer.data['username'],
                email = serializer.data['email'],
                password = serializer.data['password']
            )
            token = Token.objects.get(user=user)
            return Response({"token":token.key},status=status.HTTP_200_OK)
