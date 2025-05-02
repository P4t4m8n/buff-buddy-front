import { Component, Input, OnInit } from '@angular/core';
import { ExerciseEquipmentEditComponent } from '../../views/exercise-equipment-edit/exercise-equipment-edit.component';
import { IExerciseInfo } from '../../../models/exerciseInfo';
import { DialogComponent } from '../../../../../../core/components/dialog/dialog.component';

@Component({
  selector: 'app-exercise-equipment-edit-dialog',
  imports: [DialogComponent],
  templateUrl: './exercise-equipment-edit-dialog.component.html',
  styleUrl: './exercise-equipment-edit-dialog.component.css',
})
export class ExerciseEquipmentEditDialogComponent implements OnInit {
  @Input() item: IExerciseInfo | undefined;

  editComponent = ExerciseEquipmentEditComponent;
  buttonText = 'Create';
  ngOnInit(): void {
    this.buttonText = this.item ? 'Update' : 'Create';
  }
}
