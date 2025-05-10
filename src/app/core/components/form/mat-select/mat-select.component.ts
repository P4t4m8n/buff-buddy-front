import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule, ValidationErrors } from '@angular/forms';
import {
  MatError,
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
import { ErrorParsingPipe } from '../../../pipes/error-parsing.pipe';

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
    MatError,
    ErrorParsingPipe
  ],
  templateUrl: './mat-select.component.html',
  styleUrl: './mat-select.component.css',
})
export class MatSelectComponent<T> implements OnChanges {
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
  @Input()
  error: ValidationErrors | undefined | null = {};
  constructor() {

    
  }
  ngOnChanges(changes: SimpleChanges): void {
  }

}
