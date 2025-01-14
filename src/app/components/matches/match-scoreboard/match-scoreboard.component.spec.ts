import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatchScoreboardComponent } from './match-scoreboard.component';

describe('MatchScoreboardComponent', () => {
  let component: MatchScoreboardComponent;
  let fixture: ComponentFixture<MatchScoreboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MatchScoreboardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MatchScoreboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
