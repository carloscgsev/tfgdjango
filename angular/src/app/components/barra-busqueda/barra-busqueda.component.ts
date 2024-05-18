import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-barra-busqueda',
  templateUrl: './barra-busqueda.component.html',
  styleUrls: ['./barra-busqueda.component.css'],
})
export class BarraBusquedaComponent {
  constructor(private formBuilder: FormBuilder, private router: Router) {}
  busquedaForm = this.formBuilder.group({
    param: ['', Validators.required],
  });

  onSubmit(): void {
    if (this.busquedaForm.valid) {
      const query: string = this.busquedaForm.value.param!;
      const urlQuery = `buscar/${query}`;
      console.log('Has buscado por:', query);

      // Se navega a un componente ligero, se salta el cambio de pagina y se procede a
      // cargar la URL deseada de nuevo
      this.router
        .navigateByUrl('/dummy', { skipLocationChange: true })
        .then(() => {
          this.router.navigate([urlQuery]);
          this.busquedaForm.reset();
        });
    } else {
      console.error('Busqueda invalida');
    }
  }
}
