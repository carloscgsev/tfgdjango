import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Pelicula } from '../../models/pelicula-model';

@Injectable({
  providedIn: 'root',
})
export class BusquedaService {
  private urlBusqueda = 'http://localhost:8000/buscar/';

  constructor(private http: HttpClient) {}

  buscar(query: string): Observable<any> {
    console.log('se va a buscar por:', query)
    const busquedaUrl = `${this.urlBusqueda}${query}`
    return this.http.get<Pelicula[]>(busquedaUrl)
  }
}
