import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoticiaPrincipalComponent } from './noticia-principal.component';

describe('NoticiaPrincipalComponent', () => {
  let component: NoticiaPrincipalComponent;
  let fixture: ComponentFixture<NoticiaPrincipalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NoticiaPrincipalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NoticiaPrincipalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
