import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Usuario } from '../../models/usuario-model';

@Injectable({
  providedIn: 'root'
})
export class RegistroService {

  private urlRegistro = 'http://localhost:8000/registro/usuario/'

  constructor(private http: HttpClient) { }

  registrar(usuario: Usuario): Observable<any> {
    return this.http.post<any>(this.urlRegistro, usuario)
  }
}
