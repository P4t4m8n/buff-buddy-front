import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ValidationToErrorPipe } from '../../../pipes/validation-to-error.pipe';
import {
  FormControl,
  ReactiveFormsModule,
  ValidationErrors,
} from '@angular/forms';
import { JsonPipe } from '@angular/common';
import { ErrorParsingPipe } from '../../../pipes/error-parsing.pipe';

@Component({
  selector: 'app-input',
  imports: [ValidationToErrorPipe, ReactiveFormsModule, ErrorParsingPipe],
  templateUrl: './input.component.html',
  styleUrl: './input.component.css',
})
export class InputComponent {
  @Input()
  formControlInput?: FormControl<any>;
  @Input({ required: true })
  placeHolder?: string;

  @Input()
  type: 'text' | 'file' = 'text';
  @Input()
  error: ValidationErrors | undefined | null = {};
  @Input({ required: true })
  id: string = '';

  @Output()
  valueChange = new EventEmitter<any>();

  handleChange(event: any) {
    this.valueChange.emit(event);
  }
}
