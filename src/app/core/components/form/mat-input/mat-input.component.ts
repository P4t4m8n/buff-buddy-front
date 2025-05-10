import { Component, Input, OnInit } from '@angular/core';
import {
  FormControl,
  FormsModule,
  ReactiveFormsModule,
  ValidationErrors,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ErrorParsingPipe } from '../../../pipes/error-parsing.pipe';

@Component({
  selector: 'app-mat-input',
  imports: [
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatInputModule,
    ErrorParsingPipe,
  ],
  templateUrl: './mat-input.component.html',
  styleUrl: './mat-input.component.css',
})
export class MatInputComponent {
  @Input({ required: true })
  formControlInput!: FormControl<any>;
  @Input()
  error: ValidationErrors | undefined | null = {};
  @Input({ required: true })
  label: string = 'Label';
  @Input()
  type: 'text' | 'number' = 'text';

  
}
