import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  inject,
  Input,
  Output,
  signal,
} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { Router } from '@angular/router';
import { HandleServerFormErrorService } from '../../../../core/services/handle-server-form-error.service';
import { IProgram, IProgramEditDTO } from '../../models/iProgram';
import { MatDialogModule } from '@angular/material/dialog';
import { ProgramService } from '../../services/program.service';
import { MatInputComponent } from '../../../../core/components/form/mat-input/mat-input.component';
import { ValidationToErrorPipe } from '../../../../core/pipes/validation-to-error.pipe';
import { InputYoutubeComponent } from '../../../../core/components/form/input-youtube/input-youtube.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import {
  IProgramExercise,
  IProgramExerciseEditDTO,
} from '../../../program-exercise/models/iexercise-program';
import { ProgramExerciseEditDialogComponent } from '../../../program-exercise/components/exercise-program-edit-dialog/program-exercise-edit-dialog.component';
import { DAY_OF_WEEK, TDayOfWeek } from '../../../../core/types/app.type';
import { ExerciseService } from '../../../exercise/services/exercise.service';
import { HttpResponse } from '@angular/common/http';
import { ProgramToDtoPipe } from '../../pipes/program-to-dto.pipe';
import { ProgramExerciseDetailsComponent } from '../../../program-exercise/components/program-exercise-details/program-exercise-details.component';
import { ProgramExerciseDetailsDialogComponent } from '../../../program-exercise/components/program-exercise-details-dialog/program-exercise-details-dialog.component';

@Component({
  selector: 'app-program-edit',
  imports: [
    MatInputComponent,
    ValidationToErrorPipe,
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
    MatFormFieldModule,
    MatDatepickerModule,
    ProgramExerciseEditDialogComponent,
    ProgramExerciseDetailsDialogComponent,
  ],
  providers: [provideNativeDateAdapter()],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './program-edit.component.html',
  styleUrl: './program-edit.component.css',
})
export class ProgramEditComponent {
  programService = inject(ProgramService);
  exerciseService = inject(ExerciseService);

  formBuilder = inject(FormBuilder);
  router = inject(Router);
  serverErrorHandlingService = inject(HandleServerFormErrorService);
  programExercises = signal<IProgramExerciseEditDTO[]>([]);

  exerciseList = this.exerciseService.itemSignal;

  daysOfWeek = DAY_OF_WEEK;
  programToEdit: IProgramEditDTO | undefined;
  program: IProgram | undefined;

  @Output()
  itemSaved = new EventEmitter<IProgram>();

  form = this.formBuilder.group({
    id: new FormControl<string>(''),
    name: new FormControl<string>('', {
      validators: [],
    }),
    note: new FormControl<string>('', {
      validators: [],
    }),
    startDate: new FormControl<Date>(new Date(), {
      validators: [],
    }),
    endDate: new FormControl<Date>(new Date(), {
      validators: [],
    }),
    isActive: new FormControl<boolean>(true, {
      validators: [],
    }),
  });

  get id(): string {
    const field = this.form.get('id');
    console.log(' field:', field);
    return (field?.value as string) ?? '';
  }

  get name() {
    const field = this.form.get('name');
    return field;
  }

  get note() {
    const field = this.form.get('note');
    return field;
  }

  get startDate() {
    const field = this.form.get('startDate');
    return field;
  }

  get endDate() {
    const field = this.form.get('endDate');
    return field;
  }

  get isActive() {
    const field = this.form.get('isActive');
    return field;
  }

  constructor() {
    this.exerciseService.get({ page: 1, recordsPerPage: 10 }).subscribe();
  }

  ngOnInit(): void {
    this.programService
      .get({ page: 1, recordsPerPage: 10 })
      .subscribe((res: HttpResponse<IProgram[]>) => {});
  }

  resetForm() {
    this.form.reset();
    this.form.patchValue({});
  }
  addProgramExercise(programExercise: IProgramExerciseEditDTO) {
    this.programExercises.update((exercises) => [
      ...exercises,
      programExercise,
    ]);
  }
  getSelectedExercise(exerciseId: string) {
    console.log(' exerciseId:', exerciseId);
    return this.exerciseList()?.find((m) => m.id === exerciseId);
  }
  @Input()
  set id(id: string) {
    console.log(' id:', id);
    if (!id) {
      console.error('id is null');
      return;
    }

    this.programService.getById(id).subscribe((program) => {
      console.log(' program:', program);
      this.program = program;
      this.programToEdit = new ProgramToDtoPipe().transform(program);
      this.form.patchValue({
        id: this.programToEdit?.id,
        name: this.programToEdit?.name,
        note: this.programToEdit?.note,
        startDate: this.programToEdit?.startDate,
        endDate: this.programToEdit?.endDate,
        isActive: this.programToEdit?.isActive,
      });
    });
  }
  // // Helper to get exercise name
  // getExerciseName(exerciseId: string): string {
  //   const exercises = this.exerciseList();
  //   const exercise = exercises?.find((e) => e.id === exerciseId);
  //   return exercise?.name || 'Unknown';
  // }

  // Remove exercise from list
  // removeExercise(exercise: IProgramExerciseEditDTO) {
  //   this.programExercises = this.programExercises.filter((e) => e !== exercise);
  // }

  checkDaysOfWeek(day: TDayOfWeek, peDaysOfWeek?: TDayOfWeek[]): boolean {
    return !!peDaysOfWeek?.includes(day);
  }

  save() {
    if (this.form.invalid) return;
    const formValues = this.form.value;
    const programData: IProgramEditDTO = {
      id: formValues.id || '',
      name: formValues.name || '',
      note: formValues.note || '',
      startDate: formValues.startDate || new Date(),
      endDate: formValues.endDate || new Date(),
      isActive: formValues.isActive ?? true,
      programExercises: this.programExercises(),
    };

    this.programService.saveJson(programData).subscribe({
      next: (res) => {
        this.itemSaved.emit();
        this.program = undefined;
        this.router.navigate(['programs']);
      },
      error: (err) => {
        this.serverErrorHandlingService.mapErrorsToForm<IProgramEditDTO>(
          this.form,
          err
        );
      },
    });
  }

  onBack() {
    this.router.navigate(['programs']);
  }
}
