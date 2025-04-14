import { Component, input, Input } from '@angular/core';
import { DisplayErrorComponent } from '../../displayError/display-error.component';
import { ValidationToErrorPipe } from '../../../pipes/validation-to-error.pipe';
import {
  FormControl,
  ReactiveFormsModule,
  ValidationErrors,
} from '@angular/forms';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-input',
  imports: [DisplayErrorComponent, ValidationToErrorPipe, ReactiveFormsModule],
  templateUrl: './input.component.html',
  styleUrl: './input.component.css',
})
export class InputComponent {
  @Input({ required: true })
  formControlValue!: FormControl<any>;
  @Input({ required: true })
  placeHolder!: string;
  @Input({ required: true })
  class: string = '';
  @Input()
  type: string = 'text';
  @Input()
  error: ValidationErrors | undefined | null = {};
}
