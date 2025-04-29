import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  MatFormField,
  MatFormFieldAppearance,
  MatFormFieldModule,
} from '@angular/material/form-field';
import {
  MatOption,
  MatSelect,
  MatSelectTrigger,
} from '@angular/material/select';
import { IExerciseInfo } from '../../../../features/admin/exercise-info/models/exerciseInfo';

@Component({
  selector: 'app-mat-select',
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatSelect,
    ReactiveFormsModule,
    MatOption,
    MatSelectTrigger,
  ],
  templateUrl: './mat-select.component.html',
  styleUrl: './mat-select.component.css',
})
export class MatSelectComponent<T>  {
  @Input()
  alt?: string; // Alt text for the image
  @Input({ required: true })
  formControlInput!: FormControl<any>; // Alt text for the image
  @Input()
  getSelectItem?: () => IExerciseInfo | undefined;
  @Input()
  options?: IExerciseInfo[]|null;
  @Input()
  label: string = '';
  constructor() {}

}
