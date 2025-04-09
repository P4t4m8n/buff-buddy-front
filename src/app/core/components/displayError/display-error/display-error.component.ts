import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-display-error',
  imports: [],
  templateUrl: './display-error.component.html',
  styleUrl: './display-error.component.css',
})
export class DisplayErrorComponent {
  @Input()
  errors: string[] = [];
}
