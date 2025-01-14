import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResponderTopicoComponent } from './responder-topico.component';

describe('ResponderTopicoComponent', () => {
  let component: ResponderTopicoComponent;
  let fixture: ComponentFixture<ResponderTopicoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResponderTopicoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResponderTopicoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
