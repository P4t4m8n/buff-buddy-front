import { ComponentType } from '@angular/cdk/portal';
import {
  Component,
  ComponentRef,
  EventEmitter,
  inject,
  Input,
  OnDestroy,
  OnInit,
  Output,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {
  MatDialog,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';

@Component({
  selector: 'app-dialog',
  imports: [MatButtonModule, MatDialogModule],
  templateUrl: './dialog.component.html',
  styleUrl: './dialog.component.css',
})
export class DialogComponent<T> {
  @Input({ required: true })
  dialogContent!: ComponentType<any>;

  @Input()
  buttonText = 'New';

  @Input()
  data: T | null | undefined;
  

 

  // @ViewChild('content', { read: ViewContainerRef })
  // content!: ViewContainerRef;

  readonly dialog = inject(MatDialog);
  dialogRef: MatDialogRef<unknown> | null = null;

  openDialog(): void {
    this.dialogRef = this.dialog.open(this.dialogContent, { data: this.data });
  }
}
