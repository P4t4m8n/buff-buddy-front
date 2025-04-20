import {
  Component,
  EventEmitter,
  inject,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { IExercise, IExerciseDto } from '../../types/exercise.type';
import {
  FormBuilder,
  FormControl,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { InputYoutubeComponent } from '../../../../core/components/form/input-youtube/input-youtube.component';
import { NgOptionComponent, NgSelectComponent } from '@ng-select/ng-select';
import { ExerciseUtilService } from '../../services/exercise-util.service';
import { ExerciseService } from '../../services/exercise.service';
import { Router } from '@angular/router';
import { YoutubeLinkValidator } from '../../../../core/validators/youtube-link-validator.directive';
import { IErrorMessage } from '../../../../core/types/app.type';
import { InputComponent } from '../../../../core/components/form/input/input.component';
import { SelectComponent } from '../../../../core/components/form/select/select.component';
import { DisplayErrorComponent } from '../../../../core/components/displayError/display-error.component';
import { ValidationToErrorPipe } from '../../../../core/pipes/validation-to-error.pipe';
import { ExerciseIconService } from '../../../admin/exercise-icon/services/exercise-icon.service';

@Component({
  selector: 'app-exercise-edit',
  imports: [
    ReactiveFormsModule,
    InputYoutubeComponent,
    NgSelectComponent,
    NgOptionComponent,
    InputComponent,
    SelectComponent,
    DisplayErrorComponent,
    ValidationToErrorPipe,
  ],
  templateUrl: './exercise-edit.component.html',
  styleUrl: './exercise-edit.component.css',
})
export class ExerciseEditComponent implements OnInit {
  exerciseUtilService: ExerciseUtilService = inject(ExerciseUtilService);
  exerciseService: ExerciseService = inject(ExerciseService);
  exerciseIconService: ExerciseIconService = inject(ExerciseIconService);
  formBuilder = inject(FormBuilder);
  router = inject(Router);

  @Input()
  exercise: IExercise | undefined;
  @Output()
  itemSaved = new EventEmitter<IExercise>();

  errors: IErrorMessage<IExerciseDto>[] = [];
  unexpectedError = { serverError: undefined };

  isEditOpen: boolean = false;
  buttonText: string = 'Edit';
  youtubeVideoId: string = '';

  equipmentList: string[] = [
    'Barbell',
    'Dumbbell',
    'Kettlebell',
    'Cable',
    'Bodyweight',
  ];

  targetMuscleList: string[] = [
    'Chest',
    'Back',
    'Shoulders',
    'Arms',
    'Legs',
    'Core',
  ];

  exerciseTypeList: string[] = [
    'Strength',
    'Cardio',
    'Flexibility',
    'Balance',
    'Endurance',
  ];

  exerciseIconsList = this.exerciseIconService.getSignal();

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
    imgUrl: new FormControl<string>('imgs/1.png'),
    type: new FormControl<string>('', { validators: [Validators.required] }),
    equipment: new FormControl<string>('', {
      validators: [Validators.required],
    }),
    targetMuscle: new FormControl<string>('', {
      validators: [Validators.required],
    }),
  });

  ngOnInit(): void {
    if (!this.exercise) {
      this.buttonText = 'Create';
      this.resetForm();
    }
    this.exerciseIconService.get({ page: 1, recordsPerPage: 10 }).subscribe();

    this.form.patchValue({
      ...this.exercise,
      imgUrl: this.exercise?.imgUrl || '',
    });
  }

  toggleEdit() {
    if (this.isEditOpen) {
      this.resetForm();
    }
    this.isEditOpen = !this.isEditOpen;
  }

  handleVideoUrl(url: string) {
    this.form.controls.youtubeUrl.setValue(url);
  }

  save() {
    this.exercise = this.form.value as IExercise;
    this.exerciseService.save(this.exercise).subscribe({
      next: (res) => {
        this.itemSaved.emit();
        this.isEditOpen = false;
        this.exercise = undefined;
      },
      error: (err) => {
        this.extractErrors(err);
      },
    });

    // this.isEditOpen = false;
  }

  resetForm() {
    this.form.reset();
    this.form.patchValue({
      imgUrl: 'imgs/1.png',
    });
    this.errors = [];
  }

  extractErrors(obj: any): void {
    const err = obj.error.errors as { [key: string]: string[] };

    if (!err) {
      this.unexpectedError = {
        ...{
          serverError: obj.error.message || 'Unexpected error',
        },
      };
      return;
    }

    const errors = Object.entries(err).map(([key, value]) => {
      const errorKey = key.charAt(0).toLowerCase() + key.slice(1);
      return {
        [errorKey]: value.join(', ') || '',
      };
    });

    errors.forEach((error) => {
      const key = Object.keys(error)[0];
      const value = Object.values(error)[0];
      if (value === 'required') {
        this.form.get(key)?.setErrors({ required: true });
      } else {
        this.form.get(key)?.setErrors({ serverError: value });
      }
    });
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
    const field = this.form.get('type');
    return field;
  }

  get equipment() {
    const field = this.form.get('equipment');
    return field;
  }

  get targetMuscle() {
    const field = this.form.get('targetMuscle');
    return field;
  }
  get imgUrl() {
    const field = this.form.get('imgUrl');
    return field;
  }
}
