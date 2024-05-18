# This is an auto-generated Django model module.
# You'll have to do the following manually to clean this up:
#   * Rearrange models' order
#   * Make sure each model has one field with primary_key=True
#   * Make sure each ForeignKey and OneToOneField has `on_delete` set to the desired behavior
#   * Remove `managed = False` lines if you wish to allow Django to create, modify, and delete the table
# Feel free to rename the models, but don't rename db_table values or field names.
from django.db import models

class Actividad(models.Model):
    id_actividad = models.AutoField(primary_key=True)
    id_usuario = models.ForeignKey('Usuario', models.DO_NOTHING, db_column='id_usuario', blank=True, null=True)
    tipo = models.CharField(max_length=255, blank=True, null=True)
    fecha = models.DateField(blank=True, null=True)
    privacidad = models.TextField(blank=True, null=True)  # This field type is a guess.

    class Meta:
        managed = False
        db_table = 'actividad'


class Actor(models.Model):
    id_actor = models.IntegerField(primary_key=True)
    sexo = models.TextField()  # This field type is a guess.
    puesto = models.CharField(max_length=255)
    nombre = models.CharField(max_length=255)
    nombre_original = models.CharField(max_length=255)
    popularidad = models.DecimalField(max_digits=5, decimal_places=2)
    url_perfil = models.CharField(max_length=255, blank=True, null=True)
    personaje = models.CharField(max_length=255)

    class Meta:
        managed = False
        db_table = 'actor'


class AuthGroup(models.Model):
    name = models.CharField(unique=True, max_length=150)

    class Meta:
        managed = False
        db_table = 'auth_group'


class AuthGroupPermissions(models.Model):
    id = models.BigAutoField(primary_key=True)
    group = models.ForeignKey(AuthGroup, models.DO_NOTHING)
    permission = models.ForeignKey('AuthPermission', models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'auth_group_permissions'
        unique_together = (('group', 'permission'),)


class AuthPermission(models.Model):
    name = models.CharField(max_length=255)
    content_type = models.ForeignKey('DjangoContentType', models.DO_NOTHING)
    codename = models.CharField(max_length=100)

    class Meta:
        managed = False
        db_table = 'auth_permission'
        unique_together = (('content_type', 'codename'),)


class AuthUser(models.Model):
    password = models.CharField(max_length=128)
    last_login = models.DateTimeField(blank=True, null=True)
    is_superuser = models.BooleanField()
    username = models.CharField(unique=True, max_length=150)
    first_name = models.CharField(max_length=150)
    last_name = models.CharField(max_length=150)
    email = models.CharField(max_length=254)
    is_staff = models.BooleanField()
    is_active = models.BooleanField()
    date_joined = models.DateTimeField()

    class Meta:
        managed = False
        db_table = 'auth_user'


class AuthUserGroups(models.Model):
    id = models.BigAutoField(primary_key=True)
    user = models.ForeignKey(AuthUser, models.DO_NOTHING)
    group = models.ForeignKey(AuthGroup, models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'auth_user_groups'
        unique_together = (('user', 'group'),)


class AuthUserUserPermissions(models.Model):
    id = models.BigAutoField(primary_key=True)
    user = models.ForeignKey(AuthUser, models.DO_NOTHING)
    permission = models.ForeignKey(AuthPermission, models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'auth_user_user_permissions'
        unique_together = (('user', 'permission'),)


class DjangoAdminLog(models.Model):
    action_time = models.DateTimeField()
    object_id = models.TextField(blank=True, null=True)
    object_repr = models.CharField(max_length=200)
    action_flag = models.SmallIntegerField()
    change_message = models.TextField()
    content_type = models.ForeignKey('DjangoContentType', models.DO_NOTHING, blank=True, null=True)
    user = models.ForeignKey(AuthUser, models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'django_admin_log'


class DjangoContentType(models.Model):
    app_label = models.CharField(max_length=100)
    model = models.CharField(max_length=100)

    class Meta:
        managed = False
        db_table = 'django_content_type'
        unique_together = (('app_label', 'model'),)


class DjangoMigrations(models.Model):
    id = models.BigAutoField(primary_key=True)
    app = models.CharField(max_length=255)
    name = models.CharField(max_length=255)
    applied = models.DateTimeField()

    class Meta:
        managed = False
        db_table = 'django_migrations'


class DjangoSession(models.Model):
    session_key = models.CharField(primary_key=True, max_length=40)
    session_data = models.TextField()
    expire_date = models.DateTimeField()

    class Meta:
        managed = False
        db_table = 'django_session'


class EquipoTecnico(models.Model):
    id_equipotecnico = models.IntegerField(primary_key=True)
    sexo = models.TextField()  # This field type is a guess.
    puesto = models.CharField(max_length=255)
    nombre = models.CharField(max_length=255)
    nombre_original = models.CharField(max_length=255)
    popularidad = models.DecimalField(max_digits=5, decimal_places=2)
    url_perfil = models.CharField(max_length=255, blank=True, null=True)
    departamento = models.CharField(max_length=255)
    trabajo = models.CharField(max_length=255)

    class Meta:
        managed = False
        db_table = 'equipo_tecnico'


class Follow(models.Model):
    id_follow = models.AutoField(primary_key=True)
    id_seguidor = models.ForeignKey('Usuario', models.DO_NOTHING, db_column='id_seguidor', blank=True, null=True)
    id_seguido = models.ForeignKey('Usuario', models.DO_NOTHING, db_column='id_seguido', related_name='follow_id_seguido_set', blank=True, null=True)
    fecha = models.DateField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'follow'


class Genero(models.Model):
    id_genero = models.IntegerField(primary_key=True)
    nombre = models.CharField(max_length=255)

    class Meta:
        managed = False
        db_table = 'genero'


class Lista(models.Model):
    id_lista = models.AutoField(primary_key=True)
    id_autor = models.ForeignKey('Usuario', models.DO_NOTHING, db_column='id_autor', blank=True, null=True)
    titulo = models.CharField(max_length=255, blank=True, null=True)
    descripcion = models.TextField(blank=True, null=True)
    fecha = models.DateField(blank=True, null=True)
    privacidad = models.TextField(blank=True, null=True)  # This field type is a guess.

    class Meta:
        managed = False
        db_table = 'lista'


class Pelicula(models.Model):
    id_pelicula = models.IntegerField(primary_key=True)
    titulo = models.CharField(max_length=255)
    fechaestreno = models.DateField()
    duracion = models.IntegerField()
    sinopsis = models.TextField()
    puntuacion = models.DecimalField(max_digits=3, decimal_places=2, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'pelicula'


class PeliculaActor(models.Model):
    id_pelicula = models.OneToOneField(Pelicula, models.DO_NOTHING, db_column='id_pelicula', primary_key=True)  # The composite primary key (id_pelicula, id_actor) found, that is not supported. The first column is selected.
    id_actor = models.ForeignKey(Actor, models.DO_NOTHING, db_column='id_actor')

    class Meta:
        managed = False
        db_table = 'pelicula_actor'
        unique_together = (('id_pelicula', 'id_actor'),)


class PeliculaEquipotecnico(models.Model):
    id_pelicula = models.OneToOneField(Pelicula, models.DO_NOTHING, db_column='id_pelicula', primary_key=True)  # The composite primary key (id_pelicula, id_equipotecnico) found, that is not supported. The first column is selected.
    id_equipotecnico = models.ForeignKey(EquipoTecnico, models.DO_NOTHING, db_column='id_equipotecnico')

    class Meta:
        managed = False
        db_table = 'pelicula_equipotecnico'
        unique_together = (('id_pelicula', 'id_equipotecnico'),)


class PeliculaGenero(models.Model):
    id_pelicula = models.OneToOneField(Pelicula, models.DO_NOTHING, db_column='id_pelicula', primary_key=True)  # The composite primary key (id_pelicula, id_genero) found, that is not supported. The first column is selected.
    id_genero = models.ForeignKey(Genero, models.DO_NOTHING, db_column='id_genero')

    class Meta:
        managed = False
        db_table = 'pelicula_genero'
        unique_together = (('id_pelicula', 'id_genero'),)


class PeliculaLista(models.Model):
    id_peliculalista = models.AutoField(primary_key=True)
    id_pelicula = models.ForeignKey(Pelicula, models.DO_NOTHING, db_column='id_pelicula', blank=True, null=True)
    id_lista = models.ForeignKey(Lista, models.DO_NOTHING, db_column='id_lista', blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'pelicula_lista'


class Review(models.Model):
    id_review = models.AutoField(primary_key=True)
    id_usuario = models.ForeignKey('Usuario', models.DO_NOTHING, db_column='id_usuario', blank=True, null=True)
    id_pelicula = models.ForeignKey(Pelicula, models.DO_NOTHING, db_column='id_pelicula', blank=True, null=True)
    calificacion = models.DecimalField(max_digits=3, decimal_places=2, blank=True, null=True)
    texto = models.TextField(blank=True, null=True)
    fecha = models.DateField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'review'


class Usuario(models.Model):
    ROL_CHOICES = [
        ('Usuario_Basico', 'Usuario básico'),
        ('Administrador', 'Admin')
    ]
    id_usuario = models.AutoField(primary_key=True)
    nombreusuario = models.CharField(unique=True, max_length=255)
    rol = models.CharField(max_length=20, choices=ROL_CHOICES)
    email = models.CharField(unique=True, max_length=255)
    contrasena = models.CharField(max_length=255)
    fotoperfil = models.CharField(max_length=255, blank=True, null=True)
    biografia = models.TextField(blank=True, null=True)
    fecharegistro = models.DateTimeField(blank=True, null=True)
    fechaultimavisita = models.DateTimeField(blank=True, null=True)


    class Meta:
        managed = False
        db_table = 'usuario'

    def __str__(self):
        return f"Usuario: {self.nombreusuario}, Contrasena: {self.contrasena}, Email: {self.email}, Registro: {self.fecharegistro}"

class UsuarioLista(models.Model):
    id_usuariolista = models.AutoField(primary_key=True)
    id_usuario = models.ForeignKey(Usuario, models.DO_NOTHING, db_column='id_usuario', blank=True, null=True)
    id_lista = models.ForeignKey(Lista, models.DO_NOTHING, db_column='id_lista', blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'usuario_lista'