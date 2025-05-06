import { Component, Input } from '@angular/core';
import { DialogComponent } from '../../../../core/components/dialog/dialog.component';
import { IProgram } from '../../models/iProgram';
import { ProgramEditComponent } from '../program-edit/program-edit.component';
import { ProgramToDtoPipe } from '../../pipes/program-to-dto.pipe';

@Component({
  selector: 'app-program-edit-dialog',
  imports: [DialogComponent,ProgramToDtoPipe],
  templateUrl: './program-edit-dialog.component.html',
  styleUrl: './program-edit-dialog.component.css',
})
export class ProgramEditDialogComponent {
  @Input() item: IProgram | undefined;

  editComponent = ProgramEditComponent;
  buttonText = 'Create';
  ngOnInit(): void {
    this.buttonText = this.item ? 'Update' : 'Create';
  }
}
