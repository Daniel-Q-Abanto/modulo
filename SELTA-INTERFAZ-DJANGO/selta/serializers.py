from rest_framework import serializers
from .models import Usuario, Diseño, Personalizacion, Orden, Producto, HistorialIA, RolPermiso




class UsuarioSerializer(serializers.ModelSerializer):
    class Meta:
        model = Usuario
        fields = ['id_usuario', 'nombre_usuario', 'correo', 'contraseña', 'rol', 'fecha_registro']
        extra_kwargs = {
            'contraseña': {'write_only': True},  # No exponer el campo de contraseña al cliente
            'rol': {'read_only': True},         # Evitar que el rol sea editable
        }

    def create(self, validated_data):
        user = Usuario(
            correo=validated_data['correo'],
            nombre_usuario=validated_data['nombre_usuario']
        )
        user.set_password(validated_data['contraseña'])  # Cifrar contraseña al crear usuario
        user.save()
        return user

    def update(self, instance, validated_data):
        if 'contraseña' in validated_data:
            instance.set_password(validated_data.pop('contraseña'))  # Cifrar la nueva contraseña
        return super().update(instance, validated_data)
    
    
class DiseñoSerializer(serializers.ModelSerializer):
    usuario = UsuarioSerializer(read_only=True)
    class Meta:
        model = Diseño
        fields = ['id_diseño', 'nombre_diseño', 'descripcion', 'imagen_diseño', 'usuario', 'fecha_creacion', 'estado']

class PersonalizacionSerializer(serializers.ModelSerializer):
    diseño = DiseñoSerializer(read_only=True)
    class Meta:
        model = Personalizacion
        fields = ['id_personalizacion', 'diseño', 'tipo_personalizacion', 'valores', 'fecha_personalizacion']

class OrdenSerializer(serializers.ModelSerializer):
    usuario = UsuarioSerializer(read_only=True)
    diseño = DiseñoSerializer(read_only=True)
    class Meta:
        model = Orden
        fields = ['id_orden', 'usuario', 'diseño', 'cantidad', 'precio_total', 'estado', 'fecha_orden']

class ProductoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Producto
        fields = ['id_producto', 'nombre_producto', 'descripcion', 'precio', 'stock', 'imagen_producto']

class HistorialIASerializer(serializers.ModelSerializer):
    usuario = UsuarioSerializer(read_only=True)  # Solo lectura para usuario
    
    class Meta:
        model = HistorialIA
        fields = ['id_historial', 'usuario', 'prompt', 'imagen_generada', 'fecha_generacion']



class RolPermisoSerializer(serializers.ModelSerializer):
    class Meta:
        model = RolPermiso
        fields = ['id_rol', 'rol', 'permiso']

class TokenObtainSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField(write_only=True)
