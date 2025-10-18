import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditCita } from './edit-cita';

describe('EditCita', () => {
  let component: EditCita;
  let fixture: ComponentFixture<EditCita>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditCita]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditCita);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
