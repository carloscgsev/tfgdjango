import { Injectable } from '@angular/core';
import { CookieService as NgxCookieService } from 'ngx-cookie-service';
@Injectable({
  providedIn: 'root'
})
export class CookiesService {

  constructor(private ngxCookieService: NgxCookieService) {}

  // Método para establecer una cookie
  setCookie(name: string, value: string, expiresDays: number): void {
    this.ngxCookieService.set(name, value, expiresDays, '/');
  }

  // Método para obtener el valor de una cookie
  getCookie(name: string): string | undefined {
    return this.ngxCookieService.get(name);
  }

  // Método para eliminar una cookie
  deleteCookie(name: string): void {
    this.ngxCookieService.delete(name, '/');
  }
}
