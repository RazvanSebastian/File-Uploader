import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImageFileDisplayComponent } from './image-file-display.component';

describe('ImageFileDisplayComponent', () => {
  let component: ImageFileDisplayComponent;
  let fixture: ComponentFixture<ImageFileDisplayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImageFileDisplayComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ImageFileDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
