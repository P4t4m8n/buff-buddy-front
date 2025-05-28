import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { ModelDirective } from '../../directives/model.directive';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-dialog',
  imports: [NgClass],
  templateUrl: './dialog.component.html',
  styleUrl: './dialog.component.css',
})
export class DialogComponent<T> {
  @Input() buttonText = '';
  @Output() closed = new EventEmitter<void>();

  @ViewChild('dialogElement') dialogElementRef!: ElementRef<HTMLDialogElement>;

  constructor() {}

  private _isOpen = false;
  buttonStyle = "crud-button"

  get isOpen(): boolean {
    return this._isOpen;
  }

  open(): void {
    if (this.dialogElementRef && this.dialogElementRef.nativeElement) {
      this.dialogElementRef.nativeElement.showModal(); 
      this._isOpen = true;
    } else {
      console.error('Dialog element is not yet available.');
    }
  }

  close(): void {
    if (
      this._isOpen &&
      this.dialogElementRef &&
      this.dialogElementRef.nativeElement
    ) {
      this.dialogElementRef.nativeElement.close();
    }
  }

  onDialogClosed(): void {
    this._isOpen = false;
    this.closed.emit();
  }
}
