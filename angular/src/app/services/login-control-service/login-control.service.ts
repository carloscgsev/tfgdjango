import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginControlService {

  public showLoginFormSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public showLoginForm$: Observable<boolean> = this.showLoginFormSubject.asObservable();
  public showNavbarSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true); // Agregada
  public showNavbar$: Observable<boolean> = this.showNavbarSubject.asObservable();
  constructor() {}

  toggleLoginForm(): void {
    const currentValue = this.showLoginFormSubject.value;
    this.showLoginFormSubject.next(!currentValue);
    if (!currentValue) {
      this.showNavbarSubject.next(false); // Oculta la navbar al abrir el formulario de inicio de sesión
    }
  }

  closeLoginForm(): void {
    this.showLoginFormSubject.next(false);
    this.showNavbarSubject.next(true); // Muestra la navbar al cerrar el formulario de inicio de sesión
  }
}
