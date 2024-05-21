import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DetallesPeliculaComponent } from './components/detalles-pelicula/detalles-pelicula.component';
import { ResultadoBusquedaComponent } from './components/resultado-busqueda/resultado-busqueda.component';
import { HomeComponent } from './components/home/home.component';
import { DummyComponent } from './components/dummy/dummy.component';
import { PerfilUsuarioComponent } from './components/perfil-usuario/perfil-usuario.component';
import { AuthGuard } from './auth.guard';
import { PeliculaComponent } from './components/pelicula/pelicula.component';

const routes: Routes = [
  { path: '', component: HomeComponent},
  { path: 'peliculas', component: PeliculaComponent},
  { path: 'detalles/:id', component: DetallesPeliculaComponent},
  { path: 'buscar/:busqueda', component: ResultadoBusquedaComponent},
  { path: 'dummy', component: DummyComponent},
  { path: ':usuario', component: PerfilUsuarioComponent},
  { path: '', redirectTo: '', pathMatch: 'full' },
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
