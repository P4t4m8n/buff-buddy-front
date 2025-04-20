import { Component, Input } from '@angular/core';
import { IErrorResponse } from '../../types/app.type';

import { ErrorParsingPipe } from '../../pipes/error-parsing.pipe';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-display-error',
  imports: [ErrorParsingPipe,MatInputModule],
  templateUrl: './display-error.component.html',
  styleUrl: './display-error.component.css',
})
export class DisplayErrorComponent {
  @Input()
  error: IErrorResponse | null | undefined = null;
}
