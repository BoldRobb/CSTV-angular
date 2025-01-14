import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoticiaContainerComponent } from './noticia-container.component';

describe('NoticiaContainerComponent', () => {
  let component: NoticiaContainerComponent;
  let fixture: ComponentFixture<NoticiaContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NoticiaContainerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NoticiaContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
