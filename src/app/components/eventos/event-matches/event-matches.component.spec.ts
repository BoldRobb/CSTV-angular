import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventMatchesComponent } from './event-matches.component';

describe('EventMatchesComponent', () => {
  let component: EventMatchesComponent;
  let fixture: ComponentFixture<EventMatchesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EventMatchesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EventMatchesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
