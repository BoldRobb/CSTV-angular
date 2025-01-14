import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForumTopicsComponent } from './forum-topics.component';

describe('ForumTopicsComponent', () => {
  let component: ForumTopicsComponent;
  let fixture: ComponentFixture<ForumTopicsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ForumTopicsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ForumTopicsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
