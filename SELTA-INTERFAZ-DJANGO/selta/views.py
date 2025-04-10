from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.authentication import JWTAuthentication
from .models import Usuario, Diseño, Personalizacion, Orden, Producto, HistorialIA, RolPermiso
from .serializers import (
    UsuarioSerializer, DiseñoSerializer, PersonalizacionSerializer,
    OrdenSerializer, ProductoSerializer, HistorialIASerializer, RolPermisoSerializer
)
import requests

class RegisterView(APIView):
    permission_classes = [AllowAny]
    def post(self, request):
        serializer = UsuarioSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({"message": "Usuario registrado exitosamente"}, status=201)
        return Response(serializer.errors, status=400)

class LoginView(APIView):
    permission_classes = [AllowAny]
    def post(self, request):
        correo = request.data.get('email')
        contrasena = request.data.get('password')
        try:
            user = Usuario.objects.get(correo=correo)
            if user.check_password(contrasena):
                refresh = RefreshToken.for_user(user)
                return Response({
                    'access': str(refresh.access_token),
                    'refresh': str(refresh)
                })
            else:
                return Response({"detail": "Contraseña incorrecta"}, status=400)
        except Usuario.DoesNotExist:
            return Response({"detail": "Usuario no encontrado"}, status=404)

class ProfileView(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]
    def get(self, request):
        serializer = UsuarioSerializer(request.user)
        return Response(serializer.data, status=200)
    def put(self, request):
        serializer = UsuarioSerializer(request.user, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=200)
        return Response(serializer.errors, status=400)

class GenerarImagenAPIView(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

    def post(self, request):
        prompt = request.data.get("prompt")
        if not prompt:
            return Response({"error": "El prompt es obligatorio."}, status=400)

        try:
            access_key = "TU_ACCESS_KEY_AQUÍ"
            url = f"https://api.unsplash.com/search/photos?query={prompt}&per_page=1&client_id={access_key}"
            response = requests.get(url)
            data = response.json()

            if "results" in data and data["results"]:
                image_url = data["results"][0]["urls"]["regular"]

                HistorialIA.objects.create(
                    usuario=request.user,
                    prompt=prompt,
                    imagen_generada=image_url
                )

                return Response({"imagen_url": image_url}, status=200)
            else:
                return Response({"error": "No se encontró imagen para este prompt."}, status=404)

        except Exception as e:
            return Response({"error": str(e)}, status=500)


# CRUDs
class UsuarioViewSet(ModelViewSet):
    queryset = Usuario.objects.all()
    serializer_class = UsuarioSerializer
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

class DiseñoViewSet(ModelViewSet):
    queryset = Diseño.objects.all()
    serializer_class = DiseñoSerializer
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

class PersonalizacionViewSet(ModelViewSet):
    queryset = Personalizacion.objects.all()
    serializer_class = PersonalizacionSerializer
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

class OrdenViewSet(ModelViewSet):
    queryset = Orden.objects.all()
    serializer_class = OrdenSerializer
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

class ProductoViewSet(ModelViewSet):
    queryset = Producto.objects.all()
    serializer_class = ProductoSerializer
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

class HistorialIAViewSet(ModelViewSet):
    queryset = HistorialIA.objects.all()
    serializer_class = HistorialIASerializer
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return HistorialIA.objects.filter(usuario=self.request.user).order_by('-fecha_generacion')

    def perform_create(self, serializer):
        serializer.save(usuario=self.request.user)

class RolPermisoViewSet(ModelViewSet):
    queryset = RolPermiso.objects.all()
    serializer_class = RolPermisoSerializer
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]
