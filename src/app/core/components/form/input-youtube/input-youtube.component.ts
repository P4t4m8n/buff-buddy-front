import { Component, EventEmitter, Input, Output } from '@angular/core';
import { YoutubePlayerComponent } from '../../youtube-player/youtube-player.component';
import { ValidationErrors } from '@angular/forms';
import { DisplayErrorComponent } from '../../displayError/display-error.component';
import { ValidationToErrorPipe } from '../../../pipes/validation-to-error.pipe';

@Component({
  selector: 'app-input-youtube',
  imports: [
    YoutubePlayerComponent,
    DisplayErrorComponent,
    ValidationToErrorPipe,
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

  @Output()
  youtubeUrlEmitter = new EventEmitter<string>();

  onChange(event: Event) {
    const input = event.target as HTMLInputElement;
    const value = input.value;
    this.youtubeUrl = value;
    this.youtubeUrlEmitter.emit(value);
  }
}
