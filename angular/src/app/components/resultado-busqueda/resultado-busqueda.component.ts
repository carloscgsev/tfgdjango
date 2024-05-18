import { Component, OnInit } from '@angular/core';
import { BusquedaService } from '../../services/busqueda-service/busqueda.service';
import { ActivatedRoute } from '@angular/router';
import { Pelicula } from '../../models/pelicula-model';

@Component({
  selector: 'app-resultado-busqueda',
  templateUrl: './resultado-busqueda.component.html',
  styleUrl: './resultado-busqueda.component.css',
})
export class ResultadoBusquedaComponent implements OnInit {
  public termino: string | null;
  public resultados: Pelicula [] ;
  constructor(
    private busquedaService: BusquedaService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.termino = this.route.snapshot.paramMap.get('busqueda');
    this.getResultados();
  }

  getResultados() {
    if (this.termino != null) {
      this.busquedaService.buscar(this.termino).subscribe(resultados => {
        this.resultados = resultados;
      },);
    }
  }
}
