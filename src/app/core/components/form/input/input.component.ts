import { Component, EventEmitter, input, Input, Output } from '@angular/core';
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
  @Input()
  formControlValue?: FormControl<any>;

  @Input()
  placeHolder?: string;
  @Input({ required: true })
  class: string = '';
  @Input()
  type: 'text' | 'file' = 'text';
  @Input()
  error: ValidationErrors | undefined | null = {};

  @Output()
  valueChange = new EventEmitter<any>();

  handleChange(event: any) {
    this.valueChange.emit(event);
  }
}
