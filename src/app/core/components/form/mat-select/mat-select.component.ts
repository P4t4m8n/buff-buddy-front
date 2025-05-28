import {
  Component,
  Input,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import {
  FormControl,
  FormsModule,
  ReactiveFormsModule,
  ValidationErrors,
} from '@angular/forms';
import {
  MatError,
  MatFormFieldModule,
} from '@angular/material/form-field';
import {
  MatOption,
  MatSelect,
  MatSelectTrigger,
} from '@angular/material/select';
import { IExerciseInfoEditDTO } from '../../../../features/admin/exercise-info/models/exerciseInfo';
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
    ErrorParsingPipe,
  ],
  templateUrl: './mat-select.component.html',
  styleUrl: './mat-select.component.css',
})
export class MatSelectComponent<T> implements OnChanges {
  @Input()
  alt?: string; 
  @Input({ required: true })
  formControlInput!: FormControl<any>; 
  @Input()
  getSelectItem?: () => IExerciseInfoEditDTO | undefined;
  @Input()
  options?: IExerciseInfoEditDTO[] | null;
  @Input()
  label: string = '';
  @Input()
  error: ValidationErrors | undefined | null = {};
  constructor() {}
  ngOnChanges(changes: SimpleChanges): void {}
}
