import { Component, Inject, inject, Input, Optional } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ExerciseMuscleGroupService } from '../../services/exercise-muscle-group.service';
import { IErrorMessage } from '../../../../../core/types/app.type';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { ValidationToErrorPipe } from '../../../../../core/pipes/validation-to-error.pipe';
import { MatInputComponent } from '../../../../../core/components/form/mat-input/mat-input.component';
import { InputImgComponent } from '../../../../../core/components/form/input-img/input-img.component';
import { IExerciseMuscleGroup, IExerciseMuscleGroupDTO } from '../../models/exerciseMuscleGroup.model';

@Component({
  selector: 'app-exercise-icon-edit',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatInputModule,
    ValidationToErrorPipe,
    MatInputComponent,
    InputImgComponent,
  ],
  templateUrl: './exercise-muscle-group-edit.component.html',
  styleUrl: './exercise-muscle-group-edit.component.css',
})
export class ExerciseIconEditComponent {
  exerciseIconService = inject(ExerciseMuscleGroupService);
  @Input() exerciseIcon: IExerciseMuscleGroup | undefined;

  constructor(
    @Optional()
    private dialogRefService: MatDialogRef<ExerciseIconEditComponent>,
    @Optional()
    @Inject(MAT_DIALOG_DATA)
    public data: IExerciseMuscleGroup | undefined
  ) {
    this.exerciseIcon = data;
  }
  formBuilder = inject(FormBuilder);
  errors: IErrorMessage<IExerciseMuscleGroup>[] = [];
  unexpectedError = { serverError: undefined };
  imgPreview?: string | ArrayBuffer | null =
    'https://res.cloudinary.com/dyzqa6uuu/image/upload/v1742384690/hof/yeq1yyvb1tdfyuwuxfga.avif';

  buttonText = 'Save';

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
    file: new FormControl<File | null | string>(null),
  });

  ngOnInit() {
    if (!this.exerciseIcon) {
      this.resetForm();
    }

    this.form.patchValue({
      ...this.exerciseIcon,
    });
  }

  resetForm() {
    this.form.reset();
    this.form.patchValue({
      file: 'imgs/1.png',
    });
    this.errors = [];
  }

  onUpload(event: any) {
    const file = event.target.files[0];
    this.form.controls.file.setValue(file);
    const reader = new FileReader();
    reader.onload = (e) => {
      this.imgPreview = e.target?.result;
    };
    reader.readAsDataURL(file);
  }

  save() {
    const exerciseIconData = this.form.value as IExerciseMuscleGroupDTO;
    this.exerciseIconService.save(exerciseIconData).subscribe({
      next: (res) => {
        this.dialogRefService.close();
      },
      error: (err) => {
        console.error(' err:', err);
      },
    });
  }

  get name() {
    const field = this.form.get('name');
    return field;
  }
}
