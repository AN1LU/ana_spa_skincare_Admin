import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteCita } from './delete-cita';

describe('DeleteCita', () => {
  let component: DeleteCita;
  let fixture: ComponentFixture<DeleteCita>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeleteCita]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteCita);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
