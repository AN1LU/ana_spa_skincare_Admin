import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditServices } from './edit-services';

describe('EditServices', () => {
  let component: EditServices;
  let fixture: ComponentFixture<EditServices>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditServices]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditServices);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
