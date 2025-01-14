import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoticiaIndividualComponent } from './noticia-individual.component';

describe('NoticiaIndividualComponent', () => {
  let component: NoticiaIndividualComponent;
  let fixture: ComponentFixture<NoticiaIndividualComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NoticiaIndividualComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NoticiaIndividualComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
