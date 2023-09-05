import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjektFileComponent } from './projekt-file.component';

describe('ProjektFileComponent', () => {
  let component: ProjektFileComponent;
  let fixture: ComponentFixture<ProjektFileComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProjektFileComponent]
    });
    fixture = TestBed.createComponent(ProjektFileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
