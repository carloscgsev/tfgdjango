from django.urls import path 
from core import views 

urlpatterns = [ 
    path('getPeliculas/', views.getPeliculas, name='lista'),
    path('getDetalles/<int:id>/', views.getDetalles, name='detalles'),
    path('buscar/<str:termino>/', views.buscarPeliculas, name='buscar'),
    path('registro/usuario/', views.registrar_usuario, {'rol': 'Usuario_Basico'}, name='registro-usuario'),
    path('registro/admin/', views.registrar_usuario, {'rol': 'Administrador'}, name='registro-admin'),
    path('login/', views.login_view, name='login'),
    path('perfil_publico/<str:nombre_usuario>/', views.perfilPublico, name='perfil'),
    path('getGeneros/', views.getGeneros, name='generos'),
]
