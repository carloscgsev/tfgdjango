import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DetallesPeliculaComponent } from './components/detalles-pelicula/detalles-pelicula.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomeComponent } from './components/home/home.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { BarraBusquedaComponent } from './components/barra-busqueda/barra-busqueda.component';
import { ResultadoBusquedaComponent } from './components/resultado-busqueda/resultado-busqueda.component';
import { DummyComponent } from './components/dummy/dummy.component';
import { BodyWrapperComponent } from './components/body-wrapper/body-wrapper.component';
import { RegistroComponent } from './components/registro/registro.component';
import { LoginComponent } from './components/login/login.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { MatExpansionModule } from '@angular/material/expansion';
import { PerfilUsuarioComponent } from './components/perfil-usuario/perfil-usuario.component';
import { PeliculaComponent } from './components/pelicula/pelicula/pelicula.component';

@NgModule({
  declarations: [
    AppComponent,
    DetallesPeliculaComponent,
    HomeComponent,
    NavbarComponent,
    FooterComponent,
    BarraBusquedaComponent,
    ResultadoBusquedaComponent,
    DummyComponent,
    BodyWrapperComponent,
    RegistroComponent,
    LoginComponent,
    PerfilUsuarioComponent,
    PeliculaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgbModule,
    MatExpansionModule
  ],
  providers: [
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
