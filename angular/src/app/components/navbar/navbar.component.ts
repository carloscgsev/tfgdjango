import {
  Component,
  OnInit,
  TemplateRef,
  ViewChild,
  ElementRef,
  AfterViewInit,
  ChangeDetectorRef,
  HostListener,
} from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalService } from '../../services/modal-service/modal.service';
import { filter } from 'rxjs/operators';
import { RegistroComponent } from '../registro/registro.component';
import { MensajesService } from '../../services/mensajes-service/mensajes.service';
import { LoginControlService } from '../../services/login-control-service/login-control.service';
import { LoginService } from '../../services/login-service/login.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent implements OnInit {
  showLoginForm: boolean = false;
  successMsg: string | null = null;
  isLoggedIn: boolean = false;

  constructor(
    private router: Router,
    private modalService: ModalService,
    private msgService: MensajesService,
    public loginControlService: LoginControlService,
    private loginService: LoginService
  ) {}

  ngOnInit(): void {
    this.msgService.getSuccessMsg().subscribe((message) => {
      this.successMsg = message;
      this.displaySuccessMsg();
    });
    this.isLoggedIn = this.loginService.isLoggedIn();
  }

  logout(): void {
    this.router.navigate(['']);
    this.loginService.logout();
    window.location.reload();    
  }
  
  openVC() {
    this.modalService.open(RegistroComponent, {
      centered: true,
      backdropClass: 'darkMode',
    });
  }

  openPerfil() {
    const usuario = this.loginService.getNombreUsuario();
    console.log(usuario)
    this.router.navigate([`/${usuario}`]);
  }

  displaySuccessMsg() {
    setTimeout(() => {
      this.successMsg = '';
    }, 5000);
  }
}
