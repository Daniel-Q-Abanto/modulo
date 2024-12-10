
# Gestor de usuarios personalizado
from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin
from django.contrib.auth.hashers import make_password, check_password


# Gestor personalizado de usuarios
class UsuarioManager(BaseUserManager):
    def create_user(self, correo, password=None, **extra_fields):
        if not correo:
            raise ValueError("El correo es obligatorio")
        correo = self.normalize_email(correo)
        user = self.model(correo=correo, **extra_fields)
        if password:
            user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, correo, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)
        return self.create_user(correo, password, **extra_fields)


# Modelo de usuario
class Usuario(AbstractBaseUser, PermissionsMixin):
    id_usuario = models.AutoField(primary_key=True)
    nombre_usuario = models.CharField(max_length=100)
    correo = models.EmailField(max_length=150, unique=True)  # Campo único
    contraseña = models.CharField(max_length=255)  # Almacena contraseñas cifradas
    rol = models.CharField(max_length=10, choices=[('cliente', 'Cliente'), ('empleado', 'Empleado'), ('admin', 'Admin')], default='cliente')
    fecha_registro = models.DateTimeField(auto_now_add=True)

    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)

    objects = UsuarioManager()

    USERNAME_FIELD = 'correo'
    REQUIRED_FIELDS = ['nombre_usuario']

    def set_password(self, raw_password):
        self.contraseña = make_password(raw_password)
        self.save()

    def check_password(self, raw_password):
        return check_password(raw_password, self.contraseña)

    class Meta:
        db_table = 'usuarios'


# Modelo de historial de IA
class HistorialIA(models.Model):
    id_historial = models.AutoField(primary_key=True)
    usuario = models.ForeignKey(Usuario, on_delete=models.CASCADE, db_column='id_usuario')
    prompt = models.TextField()  # Texto ingresado por el usuario
    imagen_generada = models.CharField(max_length=255, blank=True, null=True)  # En este caso puede quedar nulo
    fecha_generacion = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Historial de {self.usuario.nombre_usuario}: {self.prompt[:30]}..."

    class Meta:
        db_table = 'historial_IA'

# Modelo de Diseños
class Diseño(models.Model):
    id_diseño = models.AutoField(primary_key=True)
    nombre_diseño = models.CharField(max_length=150)
    descripcion = models.TextField(blank=True, null=True)
    imagen_diseño = models.CharField(max_length=255)  # URL o ruta de la imagen
    usuario = models.ForeignKey(Usuario, on_delete=models.CASCADE, db_column='id_usuario')
    fecha_creacion = models.DateTimeField(auto_now_add=True)
    estado = models.CharField(
        max_length=20,
        choices=[
            ('generado', 'Generado'),
            ('personalizado', 'Personalizado')
        ],
        default='generado'
    )

    def __str__(self):
        return self.nombre_diseño

    class Meta:
        db_table = 'diseños'


# Modelo de Personalizaciones
class Personalizacion(models.Model):
    id_personalizacion = models.AutoField(primary_key=True)
    diseño = models.ForeignKey(Diseño, on_delete=models.CASCADE, db_column='id_diseño')
    tipo_personalizacion = models.CharField(max_length=150)
    valores = models.JSONField()
    fecha_personalizacion = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Personalización de {self.diseño.nombre_diseño}"

    class Meta:
        db_table = 'personalizaciones'


# Modelo de Órdenes
class Orden(models.Model):
    id_orden = models.AutoField(primary_key=True)
    usuario = models.ForeignKey(Usuario, on_delete=models.CASCADE, db_column='id_usuario')
    diseño = models.ForeignKey(Diseño, on_delete=models.CASCADE, db_column='id_diseño')
    cantidad = models.PositiveIntegerField()
    precio_total = models.DecimalField(max_digits=10, decimal_places=2)
    estado = models.CharField(
        max_length=20,
        choices=[
            ('pendiente', 'Pendiente'),
            ('pagado', 'Pagado'),
            ('en producción', 'En producción'),
            ('enviado', 'Enviado')
        ],
        default='pendiente'
    )
    fecha_orden = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Orden #{self.id_orden} - {self.usuario.nombre_usuario}"

    class Meta:
        db_table = 'ordenes'


# Modelo de Productos
class Producto(models.Model):
    id_producto = models.AutoField(primary_key=True)
    nombre_producto = models.CharField(max_length=150)
    descripcion = models.TextField(blank=True, null=True)
    precio = models.DecimalField(max_digits=10, decimal_places=2)
    stock = models.PositiveIntegerField()
    imagen_producto = models.CharField(max_length=255)

    def __str__(self):
        return self.nombre_producto

    class Meta:
        db_table = 'productos'



# Modelo de Roles y Permisos
class RolPermiso(models.Model):
    id_rol = models.AutoField(primary_key=True)
    rol = models.CharField(max_length=50, unique=True)
    permiso = models.CharField(max_length=150)

    def __str__(self):
        return f"{self.rol} - {self.permiso}"

    class Meta:
        db_table = 'roles_y_permisos'
