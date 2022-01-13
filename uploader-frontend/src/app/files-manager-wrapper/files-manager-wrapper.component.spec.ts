import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilesManagerWrapperComponent } from './files-manager-wrapper.component';

describe('FilesManagerWrapperComponent', () => {
  let component: FilesManagerWrapperComponent;
  let fixture: ComponentFixture<FilesManagerWrapperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FilesManagerWrapperComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FilesManagerWrapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
