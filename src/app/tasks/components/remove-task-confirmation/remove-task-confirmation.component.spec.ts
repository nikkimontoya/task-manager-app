import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RemoveTaskConfirmationComponent } from './remove-task-confirmation.component';

describe('RemoveTaskConfirmationComponent', () => {
  let component: RemoveTaskConfirmationComponent;
  let fixture: ComponentFixture<RemoveTaskConfirmationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RemoveTaskConfirmationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RemoveTaskConfirmationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
