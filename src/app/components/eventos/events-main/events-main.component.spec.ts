import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventsMainComponent } from './events-main.component';

describe('EventsMainComponent', () => {
  let component: EventsMainComponent;
  let fixture: ComponentFixture<EventsMainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EventsMainComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EventsMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
