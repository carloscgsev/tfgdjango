from rest_framework import serializers 
from core.models import Pelicula, Usuario

class PeliculaSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Pelicula
        fields = ('id_pelicula',
                'titulo',
                'fechaestreno',
                'duracion',
                'sinopsis',
                'puntuacion',
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