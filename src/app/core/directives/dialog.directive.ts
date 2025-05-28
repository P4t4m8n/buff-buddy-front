import {
  Directive,
  ElementRef,
  Output,
  EventEmitter,
  inject,
} from '@angular/core';

@Directive({
  selector: '[appDialog]',
  standalone: true,
})
export class DialogDirective {
  private el = inject(ElementRef<HTMLDialogElement>);
  @Output() dialogClosed = new EventEmitter<void>();

  open(): void {
    if (!this.el.nativeElement.open) {
      this.el.nativeElement.showModal();
    }
  }

  close(): void {
    this.dialogClosed.emit();
    this.el.nativeElement.close();
  }
}
