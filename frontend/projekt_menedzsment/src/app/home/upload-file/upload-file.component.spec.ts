import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadFIleComponent } from './upload-file.component';

describe('UploadFIleComponent', () => {
  let component: UploadFIleComponent;
  let fixture: ComponentFixture<UploadFIleComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UploadFIleComponent]
    });
    fixture = TestBed.createComponent(UploadFIleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
