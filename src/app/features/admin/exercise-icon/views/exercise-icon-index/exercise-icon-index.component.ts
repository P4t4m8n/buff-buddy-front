import { Component, inject, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, ReactiveFormsModule } from '@angular/forms';
import { ExerciseIconService } from '../../services/exercise-icon.service';
import { IExerciseIcon, IExerciseIconDTO } from '../../models/exerciseIcon';
import { IErrorMessage } from '../../../../../core/types/app.type';
import { InputComponent } from '../../../../../core/components/form/input/input.component';
import { ItemListComponent } from '../../../../../core/components/item-list/item-list.component';

@Component({
  selector: 'app-exercise-icon-index',
  imports: [ReactiveFormsModule, InputComponent, ItemListComponent],
  templateUrl: './exercise-icon-index.component.html',
  styleUrl: './exercise-icon-index.component.css',
})
export class ExerciseIconIndexComponent implements OnInit {
  exerciseIconService = inject(ExerciseIconService);
  @Input()
  exerciseIcon: IExerciseIcon | undefined;
  formBuilder = inject(FormBuilder);
  errors: IErrorMessage<IExerciseIcon>[] = [];
  unexpectedError = { serverError: undefined };
  imgPreview?: string | ArrayBuffer | null =
    'https://res.cloudinary.com/dyzqa6uuu/image/upload/v1742384690/hof/yeq1yyvb1tdfyuwuxfga.avif';

  form = this.formBuilder.group({
    id: new FormControl<string>(''),
    name: new FormControl<string>(''),
    file: new FormControl<File | null | string>(null),
  });

  exerciseIcons = this.exerciseIconService.exerciseIconsSignal;
  ngOnInit() {
    if (!this.exerciseIcon) {
      this.resetForm();
    }
    this.form.patchValue({
      ...this.exerciseIcon,
      file: this.exerciseIcon?.imgUrl,
    });

    this.exerciseIconService.get({ page: 1, recordsPerPage: 10 }).subscribe();
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
    console.log(' file:', file);
    this.form.controls.file.setValue(file);
    const reader = new FileReader();
    reader.onload = (e) => {
      this.imgPreview = e.target?.result;
      console.log(' this.imgPreview:', this.imgPreview);
    };
    reader.readAsDataURL(file);
  }

  save() {
    this.exerciseIcon = this.form.value as IExerciseIconDTO;
    this.exerciseIconService
      .create(this.exerciseIcon as IExerciseIconDTO)
      .subscribe({
        next: (res) => {
          console.log(' res:', res);
        },
        error: (err) => {
          console.log(' err:', err);
        },
      });
  }
}
