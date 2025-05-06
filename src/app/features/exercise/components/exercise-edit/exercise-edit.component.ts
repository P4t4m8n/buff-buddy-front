import {
  Component,
  EventEmitter,
  Inject,
  inject,
  Input,
  OnInit,
  Optional,
  Output,
} from '@angular/core';
import { IExercise, IExerciseDto } from '../../types/exercise.type';
import {
  FormBuilder,
  FormControl,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { InputYoutubeComponent } from '../../../../core/components/form/input-youtube/input-youtube.component';
import { ExerciseUtilService } from '../../services/exercise-util.service';
import { ExerciseService } from '../../services/exercise.service';
import { Router } from '@angular/router';
import { YoutubeLinkValidator } from '../../../../core/validators/youtube-link-validator.directive';
import { IErrorMessage } from '../../../../core/types/app.type';
import { ValidationToErrorPipe } from '../../../../core/pipes/validation-to-error.pipe';
import { ExerciseMuscleService } from '../../../admin/exercise-info/exercise-muscle/services/exercise-muscle.service';
import { ExerciseTypeService } from '../../../admin/exercise-info/exercise-type/services/exercise-type.service';
import { ExerciseEquipmentService } from '../../../admin/exercise-info/exercise-equipment/services/exercise-equipment.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatInputComponent } from '../../../../core/components/form/mat-input/mat-input.component';
import { MatSelectComponent } from '../../../../core/components/form/mat-select/mat-select.component';
import { ExerciseEditDialogComponent } from '../../components/exercise-edit-dialog/exercise-edit-dialog.component';
import { FirstCharToLowerCase } from '../../../../core/functions/FirstCharToLowerCase';
import { HandleServerFormErrorService } from '../../../../core/services/handle-server-form-error.service';

@Component({
  selector: 'app-exercise-edit',
  imports: [
    ReactiveFormsModule,
    InputYoutubeComponent,
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
  ],
  templateUrl: './exercise-edit.component.html',
  styleUrl: './exercise-edit.component.css',
})
export class ExerciseEditComponent implements OnInit {
  exerciseUtilService: ExerciseUtilService = inject(ExerciseUtilService);
  exerciseService: ExerciseService = inject(ExerciseService);
  exerciseMusclesService: ExerciseMuscleService = inject(ExerciseMuscleService);
  exerciseTypeService: ExerciseTypeService = inject(ExerciseTypeService);
  exerciseEquipmentService: ExerciseEquipmentService = inject(
    ExerciseEquipmentService
  );
  formBuilder = inject(FormBuilder);
  router = inject(Router);
  serverErrorHandlingService = inject(HandleServerFormErrorService);

  @Input()
  exercise: IExerciseDto | undefined;
  @Output()
  itemSaved = new EventEmitter<IExercise>();

  unexpectedError = { serverError: undefined };

  youtubeVideoId: string = '';

  exerciseTypeList = this.exerciseTypeService.itemSignal;
  exerciseEquipmentList = this.exerciseEquipmentService.itemSignal;
  exerciseMuscleList = this.exerciseMusclesService.itemSignal;

  form = this.formBuilder.group({
    id: new FormControl<string>(''),
    name: new FormControl<string>('', {
      validators: [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(50),
        Validators.pattern(/^[a-zA-Z0-9 ]+$/),
      ],
    }),
    youtubeUrl: new FormControl<string>('', {
      validators: [Validators.required, YoutubeLinkValidator()],
    }),
    exerciseTypeId: new FormControl<string>('', {
      validators: [Validators.required],
    }),
    exerciseEquipmentId: new FormControl<string>('', {
      validators: [Validators.required],
    }),
    exerciseMuscleId: new FormControl<string>('', {
      validators: [Validators.required],
    }),
  });

  constructor(
    @Optional()
    protected dialogRef: MatDialogRef<ExerciseEditDialogComponent>,
    @Inject(MAT_DIALOG_DATA) private dialogData: IExercise | undefined
  ) {}
  ngOnInit(): void {
    this.exercise = this.dialogData || this.exercise;
    if (!this.exercise) {
      this.resetForm();
    }
    this.exerciseMusclesService
      .get({ page: 1, recordsPerPage: 10 })
      .subscribe();
    this.exerciseTypeService.get({ page: 1, recordsPerPage: 10 }).subscribe();
    this.exerciseEquipmentService
      .get({ page: 1, recordsPerPage: 10 })
      .subscribe();

    this.form.patchValue({
      id: this.exercise?.id,
      name: this.exercise?.name,
      youtubeUrl: this.exercise?.youtubeUrl,
      exerciseMuscleId: this.exercise?.exerciseMuscleId,
      exerciseTypeId: this.exercise?.exerciseTypeId,
      exerciseEquipmentId: this.exercise?.exerciseEquipmentId,
    });
  }

  handleVideoUrl(url: string) {
    this.form.controls.youtubeUrl.setValue(url);
  }

  save() {
    this.exercise = this.form.value as IExercise;
    this.exerciseService.saveJson(this.exercise).subscribe({
      next: (res) => {
        this.itemSaved.emit();

        this.exercise = undefined;
        this.dialogRef?.close(this.exercise);
      },
      error: (err) => {
        this.serverErrorHandlingService.mapErrorsToForm<IExerciseDto>(
          this.form,
          err
        );
      },
    });
  }

  resetForm() {
    this.form.reset();
    this.form.patchValue({});
  }

  get youtubeUrl() {
    const field = this.form.get('youtubeUrl');
    return field;
  }

  get name() {
    const field = this.form.get('name');
    return field;
  }

  get type() {
    const field = this.form.get('exerciseTypeId');
    return field;
  }

  get equipment() {
    const field = this.form.get('exerciseEquipmentId');
    return field;
  }

  get targetMuscle() {
    const field = this.form.get('exerciseMuscleId');
    return field;
  }
  get imgUrl() {
    const field = this.form.get('imgUrl');
    return field;
  }

  getSelectedMuscle() {
    const muscleId = this.form.get('exerciseMuscleId')?.value;
    return this.exerciseMuscleList()?.find((m) => m.id === muscleId);
  }

  getSelectedType() {
    const typeId = this.form.get('exerciseTypeId')?.value;
    return this.exerciseTypeList()?.find((t) => t.id === typeId);
  }

  getSelectedEquipment() {
    const equipmentId = this.form.get('exerciseEquipmentId')?.value;
    return this.exerciseEquipmentList()?.find((e) => e.id === equipmentId);
  }
}
