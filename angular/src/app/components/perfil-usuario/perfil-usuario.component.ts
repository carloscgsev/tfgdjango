import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginService } from '../../services/login-service/login.service';

@Component({
  selector: 'app-perfil-usuario',
  templateUrl: './perfil-usuario.component.html',
  styleUrl: './perfil-usuario.component.css'
})
export class PerfilUsuarioComponent {
  usuario: any;
  errorMessage: string | null = null;
  propioPerfil: boolean = false;

  constructor(private route: ActivatedRoute, private loginService: LoginService,    private router: Router) {}

  ngOnInit(): void {
    const username = this.route.snapshot.paramMap.get('usuario');
    if (username) {
      this.loginService.getPerfilPublico(username).subscribe({
        next: (data) => {
          this.usuario = data.usuario;
          this.propioPerfil = data.propio_perfil;
          console.log(this.propioPerfil)
        },
        error: (error) => {
          if (error.status === 404) {
            this.errorMessage = 'Usuario no encontrado';
            this.router.navigate(['']);
          }
        },
      });
    }
  }

  editarPerfil(): void {
    // Lógica para editar el perfil
    console.log('Edit profile clicked');
  }
}
