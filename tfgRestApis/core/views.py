from django.http import JsonResponse,HttpResponseNotAllowed
from django.shortcuts import redirect, render
from django.utils import timezone
from django.contrib.auth.hashers import make_password
from django.contrib.auth.hashers import check_password

from requests import Response
from rest_framework.decorators import api_view
from django.contrib import messages
from .serializers import PeliculaSerializer, UsuarioPublicoSerializer
from .models import Pelicula
from .models import Usuario
from .forms import FormLogin
from django.shortcuts import get_object_or_404
import json
import jwt


@api_view(['GET', 'POST', 'DELETE'])
def listaPelicula(request):
    if request.method == 'GET':

        if 'id_usuario' in request.session:
            print('usuario logeado')

        peliculas = Pelicula.objects.all()

        titulo = request.GET.get('titulo', None)
        if titulo is not None:
            peliculas = peliculas.filter(titulo__icontains=titulo)

        pelicula_serializer = PeliculaSerializer(peliculas, many=True)
        return JsonResponse(pelicula_serializer.data, safe=False)


@api_view(['GET', 'POST', 'DELETE'])
def detallesID(request, id):
    try:
        pelicula = Pelicula.objects.get(pk=id)
    except Pelicula.DoesNotExist:
        return JsonResponse({'message': 'Pelicula no encontrada'}, status=404)

    if request.method == 'GET':
        pelicula_serializer = PeliculaSerializer(pelicula)
        return JsonResponse(pelicula_serializer.data)


@api_view(['GET', 'POST', 'DELETE'])
def buscarPeliculas(request, termino):
    try:
        if termino is not None:
            matching_movies = Pelicula.objects.filter(
                titulo__icontains=termino)
            pelicula_serializer = PeliculaSerializer(
                matching_movies, many=True)
            return JsonResponse(pelicula_serializer.data, safe=False)

        else:
            return JsonResponse({'message': 'ERROR 404'}, status=404)
    except Exception as e:
        return Response({'error': str(e)}, status=500)


@api_view(['POST'])
def registrar_usuario(request, rol):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            nombreusuario = data.get('nombreusuario')
            email = data.get('email')
            contrasena = data.get('contrasena')
        except json.JSONDecodeError:
            return JsonResponse({'error': 'Formato JSON invalido'}, status=400)

        if not all([nombreusuario, email, contrasena]):
            return JsonResponse({'error': 'Faltan campos'}, status=400)

        if Usuario.objects.filter(email=email).exists():
            return JsonResponse({'error': 'El email ya esta registrado'}, status=400)

        if Usuario.objects.filter(nombreusuario=nombreusuario).exists():
            return JsonResponse({'error': 'El nombre de usuario ya esta en uso'}, status=400)

        hashed_contrasena = make_password(contrasena)
        fecharegistro = timezone.now()
        user = Usuario(nombreusuario=nombreusuario, email=email,
                       contrasena=hashed_contrasena, fecharegistro=fecharegistro, rol=rol)
        user.save()

        return JsonResponse({'success': 'Usuario registrado correctamente'}, status=201)

    else:
        return JsonResponse({'error': 'Solo se permiten POST'}, status=405)


@api_view(['POST', 'GET'])
def login_view(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            form = FormLogin(data)
            print(form)
            if form.is_valid():
                nombreusuario = form.cleaned_data['nombreusuario']
                contrasena = form.cleaned_data['contrasena']
                try:
                    user = Usuario.objects.get(nombreusuario=nombreusuario)
                    if check_password(contrasena, user.contrasena):
                        token = jwt.encode(
                            {'usuario': user.nombreusuario}, 'tu_clave_secreta', algorithm='HS256')
                        return JsonResponse({'token': token})
                    else:
                        return JsonResponse({'error': 'Nombre de usuario o contraseña inválidos'}, status=400)
                except Usuario.DoesNotExist:
                    return JsonResponse({'error': 'Nombre de usuario o contraseña inválidos'}, status=400)
            else:
                return JsonResponse({'error': 'Datos de inicio de sesión no válidos'}, status=400)
        except json.JSONDecodeError:
            return JsonResponse({'error': 'Formato JSON inválido en el cuerpo de la solicitud'}, status=400)
    elif request.method == 'GET':
        form = FormLogin()
        return render(request, 'login.html', {'form': form})
    else:
        return HttpResponseNotAllowed(['GET', 'POST'])



@api_view(['GET'])

def perfilPublico(request, usuario):
    try:
        user = get_object_or_404(Usuario, nombreusuario=usuario)
        serializer = UsuarioPublicoSerializer(user)
        is_own_profile = False
        if 'user_id' in request.session:
            is_own_profile = int(request.session['id_usuario']) == user.id_usuario
        return JsonResponse({'usuario': serializer.data, 'propio_perfil': is_own_profile})

    except Usuario.DoesNotExist:
        return JsonResponse({'error': 'Usuario no encontrado'}, status=404)
