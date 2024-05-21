import { Component } from '@angular/core';
import { PeliculaService } from '../../services/pelicula-service/pelicula.service';
import { Pelicula } from '../../models/pelicula-model';
import { Observable } from 'rxjs';
import { Genero } from '../../models/genero-model';

@Component({
  selector: 'app-pelicula',
  templateUrl: './pelicula.component.html',
  styleUrl: './pelicula.component.css',
})
export class PeliculaComponent {
  peliculas: Pelicula[][] = [];
  justReviewed: Pelicula[] = [];
  years: number[] = [];
  generos: Genero[] = []

  constructor(private peliculaService: PeliculaService) {}

  ngOnInit() {
    this.getPeliculas();
    this.getGeneros();
  }

  getPeliculas(): void {
    this.peliculaService.getAll().subscribe((peliculas: Pelicula[]) => {
      this.peliculas = this.chunkArray(peliculas.slice(0, 8), 4);
      console.log(this.peliculas)
      this.justReviewed = this.getRandomPeliculas(peliculas.slice(8), 12);
      this.years = this.extractYears(peliculas);
    });
  }

  getGeneros(): void {
    this.peliculaService.getGeneros().subscribe((generos: Genero[]) => {
      this.generos = generos;
      console.log('Géneros:', this.generos);
    });
  }

  chunkArray(arr: Pelicula[], chunkSize: number): Pelicula[][] {
    let result: Pelicula[][] = [];
    for (let i = 0; i < arr.length; i += chunkSize) {
      result.push(arr.slice(i, i + chunkSize));
    }
    return result;
  }

  getRandomPeliculas(arr: Pelicula[], count: number): Pelicula[] {
    const shuffled = arr.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  }

  extractYears(peliculas: Pelicula[]): number[] {
    const yearsSet = new Set<number>();
    peliculas.forEach(pelicula => {
      if (pelicula.fechaestreno) {
        const date = new Date(pelicula.fechaestreno);
        if (!isNaN(date.getTime())) {
          const year = date.getFullYear();
          yearsSet.add(year);
        }
      }
    });
    return Array.from(yearsSet).sort((a, b) => b - a);
  }
}
