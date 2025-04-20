import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-input-img',
  imports: [],
  templateUrl: './input-img.component.html',
  styleUrl: './input-img.component.css',
})
export class InputImgComponent {
  @Input()
  formControlValue?: FormControl<any>;
  @Input()
  styleClass?: string;
  @Input()
  imgSize?: number = 56;
  @Output()
  valueChange = new EventEmitter<any>();
  @Input()
  imgPreview?: string | ArrayBuffer | null =
    'https://res.cloudinary.com/dyzqa6uuu/image/upload/v1742384690/hof/yeq1yyvb1tdfyuwuxfga.avif';

  handleChange(event: any) {
    const file = event.target.files[0];

    const reader = new FileReader();
    reader.onload = (e) => {
      this.imgPreview = e.target?.result;
    };
    reader.readAsDataURL(file);
    this.valueChange.emit(event);
  }
}
