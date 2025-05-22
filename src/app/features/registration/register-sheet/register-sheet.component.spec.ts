import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterSheetComponent } from './register-sheet.component';

describe('RegisterSheetComponent', () => {
  let component: RegisterSheetComponent;
  let fixture: ComponentFixture<RegisterSheetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegisterSheetComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegisterSheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
