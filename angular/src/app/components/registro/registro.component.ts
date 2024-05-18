import { Component } from '@angular/core';
import { ModalService } from '../../services/modal-service/modal.service';
import { RegistroService } from '../../services/registro-service/registro.service';
import { Usuario } from '../../models/usuario-model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MensajesService } from '../../services/mensajes-service/mensajes.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css'],
})
export class RegistroComponent {
  registroForm: FormGroup; 

  erroMsg: string = '';
  successMsg: string = '';

  constructor(
    private modalService: ModalService,
    private registroService: RegistroService,
    private formBuilder: FormBuilder,
    private msgService: MensajesService
  ) {

    this.registroForm = this.formBuilder.group({
      nombreusuario: ['', Validators.required],
      email: ['', [Validators.email, Validators.required]],
      contrasena: [
        '',
        [Validators.minLength(8), Validators.required],
      ],
      captcha: [false, Validators.requiredTrue],
    });
  }

  closeModal() {
    this.modalService.close();
  }

  // Funcion para registrar
  registrarUsuario() {
    if (this.registroForm.invalid) {
      console.error('Formulario inválido');
      return;
    }

    const { captcha, ...usuarioData } = this.registroForm.value;

    this.registroService.registrar(usuarioData).subscribe({
      next: (response) => {
        console.log('Usuario registrado:', response);
        this.closeModal();
        this.msgService.sendSuccessMsg('USUARIO REGISTRADO');
      },
      error: (error) => {
        console.error('Error al registrar usuario:', error);
        if (error.error && error.error.error) {
          this.erroMsg = error.error.error;
        } else {
          this.erroMsg = 'Error al registrar usuario';
        }
      },
    });
  }
}
