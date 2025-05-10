import {
  Component,
  EventEmitter,
  Inject,
  inject,
  Input,
  Optional,
  Output,
} from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
  FormGroup,
} from '@angular/forms';
import {
  IProgramExercise,
  IProgramExerciseEditDTO,
} from '../../models/iexercise-program';
import { ExerciseService } from '../../../exercise/services/exercise.service';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { ProgramExerciseEditDialogComponent } from '../exercise-program-edit-dialog/program-exercise-edit-dialog.component';
import { ValidationToErrorPipe } from '../../../../core/pipes/validation-to-error.pipe';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatInputComponent } from '../../../../core/components/form/mat-input/mat-input.component';
import { MatSelectComponent } from '../../../../core/components/form/mat-select/mat-select.component';
import { MatIconModule } from '@angular/material/icon';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { CommonModule } from '@angular/common';
import { ISetEditDTO } from '../../../set/models/iSet';
import { NestedDialogService } from '../../../../core/services/nested-dialog.service';
import { ExerciseEditComponent } from '../../../exercise/components/exercise-edit/exercise-edit.component';
import { ExerciseDetailsContentComponent } from '../../../exercise/components/exercise-details-content/exercise-details-content.component';
import { DAY_OF_WEEK, TDayOfWeek } from '../../../../core/types/app.type';

@Component({
  selector: 'app-exercise-program-edit',
  imports: [
    ReactiveFormsModule,
    ValidationToErrorPipe,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatInputModule,
    ValidationToErrorPipe,
    MatInputComponent,
    MatFormFieldModule,
    ReactiveFormsModule,
    ValidationToErrorPipe,
    MatSelectComponent,
    MatIconModule,
    MatCheckboxModule,
    CommonModule,
    ExerciseDetailsContentComponent,
  ],
  templateUrl: './program-exercise-edit.component.html',
  styleUrl: './program-exercise-edit.component.css',
})
export class ProgramExerciseEditComponent {
  formBuilder = inject(FormBuilder);
  @Input()
  programExercise: IProgramExerciseEditDTO | undefined;
  exerciseService = inject(ExerciseService);
  exerciseList = this.exerciseService.itemSignal;
  daysOfWeek = DAY_OF_WEEK;
  @Output()
  onAddProgramExercise? = new EventEmitter<IProgramExerciseEditDTO>();

  form = this.formBuilder.group({
    id: [''],
    programId: [''],
    order: [0],
    note: [''],
    exerciseId: [''],
    days: this.formBuilder.array([]),
    sets: this.formBuilder.array([]),
  });

  get setsArray(): FormArray {
    return this.form.get('sets') as FormArray;
  }

  constructor(
    @Optional()
    protected dialogRef: MatDialogRef<ProgramExerciseEditDialogComponent>,
    @Inject(MAT_DIALOG_DATA)
    private dialogData:
      | {
          item?: IProgramExerciseEditDTO;
          onExerciseAdded?: (exercise: IProgramExerciseEditDTO) => void;
        }
      | undefined,
    private nestedDialogService: NestedDialogService
  ) {}

  ngOnInit(): void {
    this.exerciseService.get({ page: 1, recordsPerPage: 10 }).subscribe();
    this.programExercise = this.dialogData?.item || this.programExercise;
    if (!this.programExercise) {
      this.resetForm();
    }

    this.form.patchValue({
      id: this.programExercise?.id,
      programId: this.programExercise?.programId,
      order: this.programExercise?.order,
      note: this.programExercise?.note,
      exerciseId: this.programExercise?.exerciseId,
    });

    if (this.programExercise?.sets && this.programExercise.sets.length > 0) {
      this.initSets(this.programExercise.sets);
    }
    this.initDays(this.programExercise?.days || []);
  }

  get daysArray(): FormArray {
    return this.form.get('days') as FormArray;
  }

  initDays(days: string[] = []) {
    this.daysOfWeek.forEach((day) => {
      this.daysArray.push(this.formBuilder.control(days.includes(day)));
    });
  }
  initSets(sets: ISetEditDTO[]) {
    while (this.setsArray.length) {
      this.setsArray.removeAt(0);
    }

    sets.forEach((set) => {
      this.setsArray.push(this.createSetFormGroup(set));
    });
  }

  createSetFormGroup(set?: ISetEditDTO): FormGroup {
    return this.formBuilder.group({
      id: [set?.id || ''],
      programExerciseId: [set?.programExerciseId || ''],
      actualReps: [set?.actualReps || 0],
      targetReps: [set?.targetReps || 0],
      weight: [set?.weight || 0],
      restTime: [set?.restTime || 30],
      order: [set?.order || this.setsArray.length],
      isCompleted: [set?.isCompleted || false],
      isMuscleFailure: [set?.isMuscleFailure || false],
      isWarmup: [set?.isWarmup || false],
      jointPain: [set?.jointPain || false],
    });
  }

  addSet() {
    this.setsArray.push(this.createSetFormGroup());
  }

  openExerciseDialog() {
    const dialogRef = this.nestedDialogService.openDialog(
      ExerciseEditComponent
    );

    // dialogRef.afterClosed().subscribe(result => {
    //   if (result) {
    //     // Refresh exercise list
    //     this.exerciseService.get().subscribe(() => {
    //       // Try to select the newly created exercise
    //       if (result.id) {
    //         this.form.get('exerciseId')?.setValue(result.id);
    //       }
    //     });
    //   }
    // });
  }

  removeSet(index: number) {
    this.setsArray.removeAt(index);

    // Update order for remaining sets
    for (let i = 0; i < this.setsArray.length; i++) {
      this.setsArray.at(i).get('order')?.setValue(i);
    }
  }

  resetForm() {
    this.form.reset();
    this.form.patchValue({
      order: 0,
      sets: [],
    });

    while (this.setsArray.length) {
      this.setsArray.removeAt(0);
    }
  }

  save() {
    if (this.form.invalid) return;

    const formValue = this.form.value as IProgramExerciseEditDTO;
    if (this.dialogData?.onExerciseAdded) {
      const days: TDayOfWeek[] = [];
      this.daysOfWeek.forEach((day, index) => {
        if (formValue?.days && formValue?.days[index]) {
          days.push(this.daysOfWeek[index]);
        }
      });
      formValue.days = days;
      this.dialogData.onExerciseAdded(formValue);
    }

    // Close dialog with form value
    // this.dialogRef?.close(formValue);
  }

  get order() {
    const field = this.form.get('order');
    return field;
  }

  get note() {
    const field = this.form.get('note');
    return field;
  }

  get exerciseId() {
    const field = this.form.get('exerciseId');
    return field;
  }

  getSelectedExercise() {
    const exerciseId = this.form.get('exerciseId')?.value;
    return this.exerciseList()?.find((m) => m.id === exerciseId);
  }
}
