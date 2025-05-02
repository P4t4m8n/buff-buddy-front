import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-upload-icon',
  imports: [],
  templateUrl: './upload-icon.component.html',
  styleUrl: './upload-icon.component.css',
})
export class UploadIconComponent {
  @Input({required: true})
  styleClass: string = ''; 
}
