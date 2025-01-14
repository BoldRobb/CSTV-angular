import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResponderRespuestaComponent } from './responder-respuesta.component';

describe('ResponderRespuestaComponent', () => {
  let component: ResponderRespuestaComponent;
  let fixture: ComponentFixture<ResponderRespuestaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResponderRespuestaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResponderRespuestaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
