from rest_framework.views import APIView
from rest_framework.viewsets import ModelViewSet
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.authentication import JWTAuthentication
from django.contrib.auth.hashers import make_password
from django.contrib.auth import authenticate
from .models import Usuario, Diseño, Personalizacion, Orden, Producto, HistorialIA, RolPermiso
from .serializers import (
    UsuarioSerializer,
    DiseñoSerializer,
    PersonalizacionSerializer,
    OrdenSerializer,
    ProductoSerializer,
    HistorialIASerializer,
    RolPermisoSerializer
)





# Vista para registro de usuario
class RegisterView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        serializer = UsuarioSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({"message": "Usuario registrado exitosamente"}, status=201)
        return Response(serializer.errors, status=400)
    
# Vista para inicio de sesión (JWT)
class LoginView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        correo = request.data.get('email')
        contraseña = request.data.get('password')

        try:
            # Buscar el usuario por correo
            user = Usuario.objects.get(correo=correo)

            # Validar la contraseña
            if user.check_password(contraseña):
                # Generar los tokens de JWT
                refresh = RefreshToken.for_user(user)
                return Response({
                    'access': str(refresh.access_token),
                    'refresh': str(refresh)
                })
            else:
                return Response({"detail": "Contraseña incorrecta"}, status=400)
        except Usuario.DoesNotExist:
            return Response({"detail": "Usuario no encontrado"}, status=404)


# Vista para obtener y actualizar el perfil del usuario autenticado
class ProfileView(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request):
        """
        Devuelve la información del usuario autenticado.
        """
        usuario = request.user
        serializer = UsuarioSerializer(usuario)
        return Response(serializer.data, status=200)

    def put(self, request):
        """
        Actualiza la información del usuario autenticado.
        """
        usuario = request.user
        serializer = UsuarioSerializer(usuario, data=request.data, partial=True)  # Permitir actualizaciones parciales
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=200)
        return Response(serializer.errors, status=400)

# Vistas para los modelos (CRUD completo)
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
    """
    ViewSet para manejar el historial de prompts.
    """
    queryset = HistorialIA.objects.all()
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]
    serializer_class = HistorialIASerializer

    def get_queryset(self):
        # Filtrar solo los historiales del usuario autenticado
        return HistorialIA.objects.filter(usuario=self.request.user).order_by('-fecha_generacion')

    def perform_create(self, serializer):
        # Asociar automáticamente el historial al usuario autenticado
        serializer.save(usuario=self.request.user)

class RolPermisoViewSet(ModelViewSet):
    queryset = RolPermiso.objects.all()
    serializer_class = RolPermisoSerializer
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]
