import {
  Directive,
  inject,
  Inject,
  Input,
  OnInit,
  Optional,
} from '@angular/core';
import { IExerciseInfo, IExerciseInfoDTO } from '../models/exerciseInfo';
import { BaseExerciseInfoService } from '../service/base-exercise-info.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { IErrorMessage } from '../../../../core/types/app.type';

@Directive()
export abstract class BaseExerciseInfoEditDirective<
  T extends IExerciseInfo,
  DTO extends IExerciseInfoDTO
> implements OnInit
{
  protected abstract exerciseService: BaseExerciseInfoService<T, DTO>;
  @Input() exerciseItem: T | undefined;

  constructor(
    @Optional()
    protected dialogRef: MatDialogRef<any>,
    @Optional()
    @Inject(MAT_DIALOG_DATA)
    public data: T | undefined
  ) {
    this.exerciseItem = data;
  }

  formBuilder = inject(FormBuilder);
  errors: IErrorMessage<T>[] = [];
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
    if (!this.exerciseItem) {
      this.resetForm();
    }

    this.form.patchValue({
      ...this.exerciseItem,
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
    const formData = this.form.value as DTO;
    this.exerciseService.save(formData).subscribe({
      next: () => {
        if (this.dialogRef) {
          this.dialogRef.close();
        }
      },
      error: (err) => {
        console.error('Error:', err);
      },
    });
  }

  get name() {
    return this.form.get('name');
  }
}
