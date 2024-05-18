import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { LoginControlService } from '../../services/login-control-service/login-control.service';
import { LoginService } from '../../services/login-service/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(
    public loginControlService: LoginControlService,
    private loginService: LoginService,
    private formBuilder: FormBuilder
  ) {
    this.loginForm = this.formBuilder.group({
      nombreusuario: ['', Validators.required],
      contrasena: ['', Validators.required]
    });
  }

  closeLoginForm() {
    this.loginControlService.toggleLoginForm();
  }

  login() {
    if (this.loginForm.valid) {
      const { nombreusuario, contrasena } = this.loginForm.value;
      this.loginService.login(nombreusuario, contrasena).subscribe({
        next: (response) => {
          console.log('Usuario logeado', response);
          this.closeLoginForm()
          window.location.reload();
        },
        error: (error) => {
          console.error('Error al login:', error);
        },
      });
    }
  }
}
