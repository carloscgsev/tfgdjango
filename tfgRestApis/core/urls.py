from django.urls import path 
from core import views 

urlpatterns = [ 
    path('lista/', views.listaPelicula, name='lista'),
    path('detalles/<int:id>/', views.detallesID, name='detalles'),
    path('buscar/<str:termino>/', views.buscarPeliculas, name='buscar'),
    path('registro/usuario/', views.registrar_usuario, {'rol': 'Usuario_Basico'}, name='registro-usuario'),
    path('registro/admin/', views.registrar_usuario, {'rol': 'Administrador'}, name='registro-admin'),
    path('login/', views.login_view, name='login'),
    path('perfil_publico/<str:usuario>/', views.perfilPublico, name='perfil')
]
