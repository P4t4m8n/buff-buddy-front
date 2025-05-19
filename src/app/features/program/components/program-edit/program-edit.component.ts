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
  IProgramExerciseDto,
  IProgramExerciseEditDTO,
} from '../../../program-exercise/models/iexercise-program';
import { ProgramExerciseEditDialogComponent } from '../../../program-exercise/components/exercise-program-edit-dialog/program-exercise-edit-dialog.component';
import { DAY_OF_WEEK, TDayOfWeek } from '../../../../core/types/app.type';
import { ExerciseService } from '../../../exercise/services/exercise.service';
import { HttpResponse } from '@angular/common/http';
import { ProgramToDtoPipe } from '../../pipes/program-to-dto.pipe';
import { ProgramExerciseDetailsComponent } from '../../../program-exercise/components/program-exercise-details/program-exercise-details.component';
import { ProgramExerciseDetailsDialogComponent } from '../../../program-exercise/components/program-exercise-details-dialog/program-exercise-details-dialog.component';
import { ProgramExerciseEditToDtoPipe } from '../../../program-exercise/pipes/program-exercise-edit-to-dto.pipe';
import { MatIcon } from '@angular/material/icon';

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
    ProgramExerciseEditToDtoPipe,
    MatIcon,
  ],
  providers: [provideNativeDateAdapter()],
  // changeDetection: ChangeDetectionStrategy.OnPush,
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
  newProgramExercises: IProgramExerciseEditDTO[] = [];
  updateProgramExercises: IProgramExerciseEditDTO[] = [];
  deleteProgramExercises: Partial<IProgramExerciseEditDTO>[] = [];

  exerciseList = this.exerciseService.itemSignal;

  daysOfWeek = DAY_OF_WEEK;
  programToEdit: IProgramEditDTO | undefined;
  program: IProgram | undefined;

  @Output()
  itemSaved = new EventEmitter<IProgram>();

  @Input()
  set id(id: string) {
    if (!id) {
      console.error('id is null');
      return;
    }

    this.programService.getById(id).subscribe((program) => {
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
      this.programExercises.set(this.programToEdit?.programExercises || []);
    });
  }

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
  saveProgramExercise(programExercise: IProgramExerciseEditDTO) {
    this.programExercises.update((exercises) => {
      const idx = exercises.findIndex((e) => e.id === programExercise.id);
      if (idx !== -1) {
        exercises[idx] = programExercise;
        return [...exercises];
      }
      return [...exercises, programExercise];
    });

    if (programExercise.id?.startsWith('temp')) {
      const idx = this.newProgramExercises.findIndex(
        (e) => e.id === programExercise.id
      );
      if (idx !== -1) {
        this.newProgramExercises[idx] = programExercise;
      } else {
        this.newProgramExercises.push(programExercise);
      }
      return;
    }

    const idx = this.updateProgramExercises.findIndex(
      (e) => e.id === programExercise.id
    );
    if (idx < 0) {
      this.updateProgramExercises.push({
        ...programExercise,
        programId: this.id,
      });
      return;
    }
    this.updateProgramExercises[idx] = {
      ...programExercise,
      programId: this.id,
    };

    return;
  }

  removeProgramExercise(id?: any, exerciseId?: any) {
    console.log(' id:', id);
    if (!id) {
      console.error('id is null');
      return;
    }
    this.programExercises.update((exercises) =>
      exercises.filter((exercise) => exercise.id !== id)
    );

    this.newProgramExercises = this.newProgramExercises.filter(
      (exercise) => exercise.id !== id
    );
    this.updateProgramExercises = this.updateProgramExercises.filter(
      (exercise) => exercise.id !== id
    );

    if (!id?.startsWith('temp')) {
      this.deleteProgramExercises.push({
        id,
        exerciseId,
      });
    }
  }

  getSelectedExercise(exerciseId: string) {
    return this.exerciseList()?.find((m) => m.id === exerciseId);
  }

  getExerciseName(exerciseId: string): string {
    const exercises = this.exerciseList();
    const exercise = exercises?.find((e) => e.id === exerciseId);
    return exercise?.name || 'Unknown';
  }

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
    };

    this.newProgramExercises = this.newProgramExercises.map((pe) => ({
      ...pe,
      id: '',
    }));

    programData.newProgramExercises = this.newProgramExercises;
    programData.updateProgramExercises = this.updateProgramExercises;
    programData.deleteProgramExercises = this.deleteProgramExercises;
    console.log(' programData:', programData);

    this.programService.saveJson(programData).subscribe({
      next: (res) => {
        this.itemSaved.emit();
        this.program = undefined;
        this.router.navigate(['programs']);
      },
      error: (err) => {
        console.log(' err:', err);
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

  get id(): string {
    const field = this.form.get('id');
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
}
