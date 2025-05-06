import { Component, EventEmitter, Input, Output } from '@angular/core';
import { YoutubePlayerComponent } from '../../youtube-player/youtube-player.component';
import {
  FormControl,
  FormsModule,
  ReactiveFormsModule,
  ValidationErrors,
} from '@angular/forms';
import { DisplayErrorComponent } from '../../displayError/display-error.component';
import { ValidationToErrorPipe } from '../../../pipes/validation-to-error.pipe';
import {
  MatError,
  MatFormField,
  MatInput,
  MatInputModule,
} from '@angular/material/input';
import { ErrorParsingPipe } from '../../../pipes/error-parsing.pipe';
import { MatInputComponent } from '../mat-input/mat-input.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-input-youtube',
  imports: [
    YoutubePlayerComponent,
    MatInput,
    MatError,
    ErrorParsingPipe,
    MatFormField,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatInputModule,
    ErrorParsingPipe,
  ],
  templateUrl: './input-youtube.component.html',
  styleUrl: './input-youtube.component.css',
})
export class InputYoutubeComponent {
  @Input()
  youtubeUrl: string | undefined = '';
  @Input()
  error: ValidationErrors | undefined | null = {};
  youtubeVideoId: string = '';
  @Input({ required: true })
  formControlInput!: FormControl<any>;

  @Output()
  youtubeUrlEmitter = new EventEmitter<string>();

  onChange(event: Event) {
    const input = event.target as HTMLInputElement;
    const value = input.value;
    this.youtubeUrl = value;
    this.youtubeUrlEmitter.emit(value);
  }
}
