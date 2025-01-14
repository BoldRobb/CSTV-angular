import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoticiaMainComponent } from './noticia-main.component';

describe('NoticiaMainComponent', () => {
  let component: NoticiaMainComponent;
  let fixture: ComponentFixture<NoticiaMainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NoticiaMainComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NoticiaMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
