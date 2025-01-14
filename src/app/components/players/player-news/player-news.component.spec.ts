import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayerNewsComponent } from './player-news.component';

describe('PlayerNewsComponent', () => {
  let component: PlayerNewsComponent;
  let fixture: ComponentFixture<PlayerNewsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlayerNewsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlayerNewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
