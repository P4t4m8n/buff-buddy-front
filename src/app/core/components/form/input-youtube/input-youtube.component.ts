import { Component, EventEmitter, Input, Output } from '@angular/core';
import { YoutubePlayerComponent } from '../../youtube-player/youtube-player.component';

@Component({
  selector: 'app-input-youtube',
  imports: [YoutubePlayerComponent],
  templateUrl: './input-youtube.component.html',
  styleUrl: './input-youtube.component.css',
})
export class InputYoutubeComponent {
  @Input()
  youtubeUrl: string | undefined = '';
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
