import {
  Directive,
  inject,
  Inject,
  Input,
  OnInit,
  Optional,
} from '@angular/core';
import { IExerciseInfo, IExerciseInfoDTO } from '../models/exerciseInfo';
import { BaseCRUDService } from '../service/base-CRUD.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { IErrorMessage, IErrorResponse } from '../../../../core/types/app.type';
import { FirstCharToLowerCase } from '../../../../core/functions/FirstCharToLowerCase';

@Directive()
export abstract class BaseExerciseInfoEditDirective<
  T extends IExerciseInfo,
  DTO extends IExerciseInfoDTO
> implements OnInit
{
  protected abstract exerciseService: BaseCRUDService<T, DTO>;
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
  imgPreview?: string | ArrayBuffer | null = null;

  buttonText = 'Save';

  form = this.formBuilder.group({
    id: new FormControl<string>(''),
    name: new FormControl<string>('', {
      // validators: [
      //   Validators.required,
      //   Validators.minLength(3),
      //   Validators.maxLength(50),
      //   Validators.pattern(/^[a-zA-Z0-9 ]+$/),
      // ],
    }),
    file: new FormControl<File | null | string>(null, {
      // validators: [Validators.required],
    }),
  });

  ngOnInit() {
    const fileControl = this.form.controls.file;

    if (!this.exerciseItem) {
      this.resetForm();
      // fileControl.setValidators([Validators.required]);
      fileControl.updateValueAndValidity();
      return;
    }

    this.form.patchValue({
      id: this.exerciseItem.id,
      name: this.exerciseItem.name,
    });

    if (!this.exerciseItem.imgUrl) {
      this.imgPreview = this.exerciseItem.imgUrl;
      fileControl.clearValidators();
      fileControl.updateValueAndValidity();
      return;
    }

    fileControl.setValidators([Validators.required]);
    this.imgPreview = null;
    fileControl.updateValueAndValidity();
  }

  resetForm() {
    this.form.reset();
    this.imgPreview = null;
    this.errors = [];
  }

  onUpload(event: any) {
    if (event?.target?.files?.length > 0) {
      const file: File = event.target.files[0];
      this.form.controls.file.setValue(file);

      const reader = new FileReader();
      reader.onload = (e) => {
        this.imgPreview = e.target?.result;
      };
      reader.readAsDataURL(file);

      // if (!this.form.controls.file.hasValidator(Validators.required)) {
      //    this.form.controls.file.setValidators([Validators.required]);
      //    this.form.controls.file.updateValueAndValidity();
      // }

      return;
    }

    if (!this.exerciseItem?.imgUrl) {
      this.form.controls.file.setValue(null);
      this.form.controls.file.setValidators([Validators.required]);
      this.form.controls.file.updateValueAndValidity();
      this.imgPreview = null;
    }
  }

  save() {
    const formData = this.form.value as DTO;
    this.exerciseService.saveForm(formData).subscribe({
      next: () => {
        if (this.dialogRef) {
          this.dialogRef.close();
        }
      },
      error: (err) => {
        console.error('Error:', err.error.errors);

        const errors = Object.entries(err.error.errors).map(([key, value]) => {
          if (key === 'ImgUrl') {
            key = 'file';
          }
          return {
            key: FirstCharToLowerCase(key) as keyof T,
            error: (value as string[]).join(', '),
          };
        });
        errors.forEach((error) => {
          this.form.controls[error.key].setErrors({
            serverError: error.error,
          });
        });
      },
    });
  }

  get name() {
    return this.form.get('name');
  }

  get file() {
    return this.form.get('file');
  }
}
