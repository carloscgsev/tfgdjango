import { Component, OnInit } from '@angular/core';
import { Pelicula } from '../../models/pelicula-model';
import { PeliculaService } from '../../services/pelicula-service/pelicula.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-detalles-pelicula',
  templateUrl: './detalles-pelicula.component.html',
  styleUrl: './detalles-pelicula.component.css',
  providers: [ PeliculaService ],
})
export class DetallesPeliculaComponent implements OnInit {
  pelicula: Pelicula | null; 
  public id: string | null;
  
  constructor(private peliculaService: PeliculaService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    this.getPeliculas();
  }

  getPeliculas(): void {
    if (this.id !== null) { 
      this.peliculaService.getDetalles(this.id).subscribe(
        pelicula => {
          this.pelicula = pelicula;
        },
        error => {
          console.error('Error fetching pelicula details:', error);
        }
      );
    } else {
      console.error('ID null');
    }
  }
}

