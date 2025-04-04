import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExerciseIndexComponent } from './exercise-index.component';

describe('ExerciseIndexComponent', () => {
  let component: ExerciseIndexComponent;
  let fixture: ComponentFixture<ExerciseIndexComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExerciseIndexComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExerciseIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
