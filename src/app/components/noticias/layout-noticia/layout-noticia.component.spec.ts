import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LayoutNoticiaComponent } from './layout-noticia.component';

describe('LayoutNoticiaComponent', () => {
  let component: LayoutNoticiaComponent;
  let fixture: ComponentFixture<LayoutNoticiaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LayoutNoticiaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LayoutNoticiaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
