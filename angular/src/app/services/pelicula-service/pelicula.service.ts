import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Pelicula } from '../../models/pelicula-model';
import { Genero } from '../../models/genero-model';

@Injectable({
  providedIn: 'root'
})
export class PeliculaService {
  // El servicio, inyectado en tal, hace un request a las urlPatterns en la parte de backend (Django), de ahi
  // se procede a las views  y bla bla
  private urlLista = 'http://localhost:8000/getPeliculas';
  private urlDetalles = 'http://localhost:8000/getDetalles/';
  private urlGeneros = 'http://localhost:8000/getGeneros/'
  
  constructor(private http: HttpClient) {}
    
  getAll(): Observable<any>{
    return this.http.get<Pelicula[]>(this.urlLista);
  }

  getDetalles(id: string): Observable<Pelicula> {
    const detallesUrl = `${this.urlDetalles}${id}`;
    return this.http.get<Pelicula>(detallesUrl);
  }
  
  getGeneros(): Observable<any> {
    return this.http.get<Genero[]>(this.urlGeneros);
  }
  
}
