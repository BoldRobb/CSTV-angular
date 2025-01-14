import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopicoIndividualComponent } from './topico-individual.component';

describe('TopicoIndividualComponent', () => {
  let component: TopicoIndividualComponent;
  let fixture: ComponentFixture<TopicoIndividualComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TopicoIndividualComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TopicoIndividualComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
