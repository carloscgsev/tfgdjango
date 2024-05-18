import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private urlLogin = 'http://localhost:8000/login/';
  private urlBase = 'http://localhost:8000';
  private isLoggedInSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient, private cookieService: CookieService) {
    // Verificar la cookie de sesión al inicializar el servicio
    this.checkSession();
  }

  login(username: string, password: string): Observable<any> {
    return this.http.post<any>(this.urlLogin, { nombreusuario: username, contrasena: password }).pipe(
      tap((response) => {
        // Si el inicio de sesión es exitoso, establece una cookie de sesión
        if (response && response.token) {
          this.setSessionCookie(response.token); // Establece la cookie de sesión
        }
      }),
      catchError((error) => {
        throw error;
      })
    );
  }

  
  logout(): void {
    // Elimina la cookie de sesión y emite false al BehaviorSubject
    this.cookieService.delete('sessionToken');
    this.isLoggedInSubject.next(false);
    
  }

  private setSessionCookie(token: string): void {
    // Establece la cookie de sesión con un tiempo de expiración de 1 día
    this.cookieService.set('sessionToken', token, 1);
  }

  private checkSession(): void {
    // Verifica si la cookie de sesión está presente al inicializar el servicio
    const isLoggedIn = this.cookieService.check('sessionToken');
    this.isLoggedInSubject.next(isLoggedIn); // Emite el estado actual al BehaviorSubject
  }

  isLoggedIn(): boolean {
    return this.cookieService.check('sessionToken');
  }

  getPerfilPublico(username: string): Observable<any> {
    return this.http.get<any>(`${this.urlBase}/perfil_publico/${username}/`).pipe(
      map((response) => response),
      catchError((error) => {
        if (error.status === 404) {
          console.error('Usuario no encontrado');
        }
        return throwError(error);
      })
    );
  }
}
