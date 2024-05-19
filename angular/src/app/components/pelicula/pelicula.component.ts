import { Component } from '@angular/core';
import { PeliculaService } from '../../services/pelicula-service/pelicula.service';
import { Pelicula } from '../../models/pelicula-model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-pelicula',
  templateUrl: './pelicula.component.html',
  styleUrl: './pelicula.component.css'
})
export class PeliculaComponent {
  peliculas: Pelicula[][] = []; 
  justReviewed: Pelicula[] = [];

  constructor(private peliculaService: PeliculaService) { }
  
  ngOnInit() {
    this.getPeliculas();
  }

  getPeliculas(): void {
    this.peliculaService.getAll().subscribe((peliculas: Pelicula[]) => {
      this.peliculas = this.chunkArray(peliculas.slice(0, 8), 4);
      this.justReviewed = this.getRandomPeliculas(peliculas.slice(8), 12);
      
      console.log('Películas para el carrusel:', this.peliculas);
      console.log('Películas para just-reviewed:', this.justReviewed);
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
}
