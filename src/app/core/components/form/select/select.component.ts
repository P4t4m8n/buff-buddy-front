import { Component, Input, OnInit } from '@angular/core';
import { NgOptionComponent, NgSelectComponent } from '@ng-select/ng-select';
import { DisplayErrorComponent } from '../../displayError/display-error.component';
import { IErrorResponse } from '../../../types/app.type';
import { ValidationToErrorPipe } from '../../../pipes/validation-to-error.pipe';
import {
  FormControl,
  ReactiveFormsModule,
  ValidationErrors,
} from '@angular/forms';

@Component({
  selector: 'app-select',
  imports: [
    NgSelectComponent,
    NgOptionComponent,
    DisplayErrorComponent,
    ValidationToErrorPipe,
    ReactiveFormsModule,
  ],
  templateUrl: './select.component.html',
  styleUrl: './select.component.css',
})
export class SelectComponent implements OnInit {
  ngOnInit(): void {
  }
  @Input()
  error: ValidationErrors | null | undefined = null;
  @Input({ required: true })
  formControlValue!: FormControl<any>;
  @Input()
  options: any[] = [];
}
