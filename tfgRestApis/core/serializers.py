from rest_framework import serializers 
from core.models import Pelicula, Usuario, Genero

class GeneroSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Genero
        fields = ('id_genero',
                  'nombre',
                  )

class PeliculaSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Pelicula
        fields = ('id_pelicula',
                'titulo',
                'fechaestreno',
                'duracion',
                'sinopsis',
                'puntuacion',
                'poster_url',
        )
        
class UsuarioSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Usuario
        fields = (
            'nombreusuario',
            'contrasena',
        )
        
class UsuarioPublicoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Usuario
        fields = ['nombreusuario', 'biografia', 'fotoperfil', 'fechaultimavisita'] 