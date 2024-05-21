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
  private readonly storageKey = 'nombreusuario';

  constructor(private http: HttpClient, private cookieService: CookieService) {
    this.checkSession();
  }

  login(username: string, password: string): Observable<any> {
    return this.http.post<any>(this.urlLogin, { nombreusuario: username, contrasena: password }).pipe(
      tap((response) => {
        // Si el inicio de sesión tiene exito establece una cookie de sesión
        if (response && response.token) {
          this.setSessionCookie(response.token); 
          localStorage.setItem(this.storageKey, username);
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
    localStorage.removeItem(this.storageKey);
  }

  private setSessionCookie(token: string): void {
    this.cookieService.set('sessionToken', token, 1);
  }

  private checkSession(): void {
    const isLoggedIn = this.cookieService.check('sessionToken');
    this.isLoggedInSubject.next(isLoggedIn); 
  }

  isLoggedIn(): boolean {
    return this.cookieService.check('sessionToken');
  }

  getPerfilPublico(username: string): Observable<any> {
    return this.http.get<any>(`${this.urlBase}/perfil_publico/${username}/`, { withCredentials: true }).pipe(
      catchError((error) => {
        if (error.status === 404) {
          console.error('Usuario no encontrado');
        }
        return throwError(error);
      })
    );
  }

  getNombreUsuario(): string | null {
    return localStorage.getItem(this.storageKey);
  }
}
