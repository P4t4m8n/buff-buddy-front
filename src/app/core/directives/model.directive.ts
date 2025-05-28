import {
  Directive,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  OnInit,
  Output,
  inject,
} from '@angular/core';

@Directive({
  selector: '[modal]',
})
export class ModelDirective implements OnInit {
  @Input() isOpen = false;
  @Output() clickOutside = new EventEmitter();
  private el = inject(ElementRef);

  ngOnInit(): void {
    setTimeout(() => {
      this.onClick = (ev: MouseEvent) => {
        if (!this.isOpen) return;
  
        const isClickedInside = this.el.nativeElement.contains(ev.target);
        if (!isClickedInside) this.clickOutside.emit();
      };
    }, 1);
  }

  @HostListener('document:click', ['$event'])
  onClick: (ev: MouseEvent) => void = () => {};
}
