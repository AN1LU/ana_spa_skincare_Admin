import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCita } from './add-cita';

describe('AddCita', () => {
  let component: AddCita;
  let fixture: ComponentFixture<AddCita>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddCita]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddCita);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
