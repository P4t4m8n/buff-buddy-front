import { ComponentType } from '@angular/cdk/overlay';
import { inject, Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

@Injectable({
  providedIn: 'root',
})
export class NestedDialogService {
  private dialog = inject(MatDialog);

  openDialog<T, D = any, R = any>(component: ComponentType<T>, data?: D): R {
    const dialogRef = this.dialog.open(component, {
      data,
      panelClass: 'nested-dialog',
      disableClose: false,
      autoFocus: false,
      restoreFocus: false,
    });

    return dialogRef as unknown as R;
  }
}
