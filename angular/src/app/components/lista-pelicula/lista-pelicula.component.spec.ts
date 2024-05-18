import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaPeliculaComponent } from './lista-pelicula.component';

describe('ListaPeliculaComponent', () => {
  let component: ListaPeliculaComponent;
  let fixture: ComponentFixture<ListaPeliculaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListaPeliculaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListaPeliculaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
