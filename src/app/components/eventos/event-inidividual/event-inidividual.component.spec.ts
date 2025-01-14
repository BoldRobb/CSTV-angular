import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventInidividualComponent } from './event-inidividual.component';

describe('EventInidividualComponent', () => {
  let component: EventInidividualComponent;
  let fixture: ComponentFixture<EventInidividualComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EventInidividualComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EventInidividualComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
