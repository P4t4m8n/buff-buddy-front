import { Component, inject, Input, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IExercise } from '../../types/exercise.type';
import { ExerciseService } from '../../services/exercise.service';
import { of, Subject, switchMap } from 'rxjs';
import { DialogComponent } from '../../../../core/components/dialog/dialog.component';
import { ExerciseDetailsContentComponent } from '../../components/exercise-details-content/exercise-details-content.component';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-exercise-details',
  imports: [ ],
  templateUrl: './exercise-details.component.html',
  styleUrl: './exercise-details.component.css',
})
export class ExerciseDetailsComponent implements OnInit, OnDestroy {
  ngOnDestroy(): void {
    console.log('ngOnDestroy');
  }
  private route = inject(ActivatedRoute);
  id: string | undefined | null;
  item: IExercise | undefined | null;
  exerciseService = inject(ExerciseService);
  router = inject(Router);

  contentComponent = ExerciseDetailsContentComponent;

  readonly dialog = inject(MatDialog);
  dialogRef: MatDialogRef<unknown> | null = null;

  openDialog(): void {
    this.dialogRef = this.dialog.open(this.contentComponent, {
      data: this.item,
    });
    this.dialogRef.afterClosed().subscribe(() => {
      this.router.navigate(['../'], { relativeTo: this.route });
      this.dialogRef = null;
    });
  }

  ngOnInit() {
    this.route.paramMap
      .pipe(
        switchMap((params) => {
          this.id = params.get('id');

          if (this.id) {
            return this.exerciseService.getById(this.id);
          } else {
            return of(null);
          }
        })
      )
      .subscribe({
        next: (res) => {
          console.log(" res:", res)
          this.item = res;
          if (this.item) {
            
            this.openDialog();
          }
        },
        error: (err) => {},
      });
  }
}
