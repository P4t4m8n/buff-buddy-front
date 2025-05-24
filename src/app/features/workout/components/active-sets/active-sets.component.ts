import {
  Component,
  EventEmitter,
  inject,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import {
  ICoreSetDTO,
  ISetFrom,
  IUserSetEditDTO,
} from '../../../set/models/iSet';
import { FormBuilder, FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatInputComponent } from '../../../../core/components/form/mat-input/mat-input.component';
import { MatCheckbox } from '@angular/material/checkbox';
import { MatButton } from '@angular/material/button';

@Component({
  selector: 'app-active-sets',
  imports: [MatInputComponent, MatCheckbox, ReactiveFormsModule, MatButton],
  templateUrl: './active-sets.component.html',
  styleUrl: './active-sets.component.css',
})
export class ActiveSetsComponent implements OnInit {
  @Input({ required: true })
  set!: {
    coreSet: ICoreSetDTO;
    userSet: IUserSetEditDTO;
  };
  @Output()
  setFinished = new EventEmitter<IUserSetEditDTO>();
  isFinished = false;

  ngOnInit(): void {
    if (!this.set) {
      console.error('coreSet is null');
      return;
    }

    if (this.set?.userSet?.isFinished) {
      this.isFinished = true;
      console.warn('Set is already finished:', this.set.userSet);
      return;
    }

    this.form.patchValue({
      reps: this.set.userSet.reps || 0,
      weight: this.set.userSet.weight || 0,
      restTime: this.set.userSet.restTime || 0,
      isMuscleFailure: this.set.userSet.isMuscleFailure || false,
      isJointPain: this.set.userSet.isJointPain || false,
      isCompleted: this.set.userSet.isCompleted || false,
    });
  }

  formBuilder = inject(FormBuilder);
  form = this.formBuilder.group<ISetFrom>({
    reps: new FormControl<number | null>(null),
    weight: new FormControl<number | null>(null),
    restTime: new FormControl<number | null>(null),
    isMuscleFailure: new FormControl<boolean | null>(null),
    isJointPain: new FormControl<boolean | null>(null),
    isCompleted: new FormControl<boolean | null>(null),
    coreSetId: new FormControl<string>(this.set?.coreSet?.id),
  });

  onSubmit(e: SubmitEvent) {
    e.preventDefault();
    if (this.form.valid) {
      const formValue = this.form.value;
      const userSet: IUserSetEditDTO = {
        ...formValue,
        coreSetId: this.set.coreSet?.id!,
        programExerciseId: this.set.userSet.programExerciseId,
        isFinished: true, // Mark the set as finished
      };
      this.set.userSet = userSet;
      this.setFinished.emit(userSet);
      this.isFinished = true;
    } else {
      console.error('Form is invalid');
    }
  }
}
