from django import forms
from .models import Usuario
from django.utils import timezone

class FormRegistro(forms.ModelForm):
    class Meta:
        model = Usuario
        fields = ['nombreusuario', 'email', 'contrasena']

    def clean(self):
        cleaned_data = super().clean()
        cleaned_data['fotoperfil'] = ''
        cleaned_data['biografia'] = ''
        cleaned_data['fecharegistro'] = ''
        cleaned_data['fechaultimavisita'] = ''
        return cleaned_data

class FormLogin(forms.Form):
    nombreusuario = forms.CharField(label='Nombre de usuario', max_length=100)
    contrasena = forms.CharField(label='Contraseña', widget=forms.PasswordInput())
        
    def clean(self):
        cleaned_data = super().clean()
        return cleaned_data