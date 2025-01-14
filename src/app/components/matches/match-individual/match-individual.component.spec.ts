import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatchIndividualComponent } from './match-individual.component';

describe('MatchIndividualComponent', () => {
  let component: MatchIndividualComponent;
  let fixture: ComponentFixture<MatchIndividualComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MatchIndividualComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MatchIndividualComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
