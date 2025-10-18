import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteClient } from './delete-client';

describe('DeleteClient', () => {
  let component: DeleteClient;
  let fixture: ComponentFixture<DeleteClient>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeleteClient]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteClient);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
