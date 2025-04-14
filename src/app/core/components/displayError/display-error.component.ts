import { Component, Input } from '@angular/core';
import { IErrorResponse } from '../../types/app.type';

import { ErrorParsingPipe } from '../../pipes/error-parsing.pipe';

@Component({
  selector: 'app-display-error',
  imports: [ErrorParsingPipe],
  templateUrl: './display-error.component.html',
  styleUrl: './display-error.component.css',
})
export class DisplayErrorComponent {
  @Input()
  error: IErrorResponse | null | undefined = null;
}
