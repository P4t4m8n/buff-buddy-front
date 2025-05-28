import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, ValidationErrors } from '@angular/forms';
import { MatError } from '@angular/material/input';
import { UploadIconComponent } from "../../icons/upload-icon/upload-icon.component";
import { ValidationToErrorPipe } from '../../../pipes/validation-to-error.pipe';
import { ErrorParsingPipe } from '../../../pipes/error-parsing.pipe';

@Component({
  selector: 'app-input-img',
  imports: [ UploadIconComponent,ValidationToErrorPipe,ErrorParsingPipe],
  templateUrl: './input-img.component.html',
  styleUrl: './input-img.component.css',
})
export class InputImgComponent 
 {
  @Input()
  @Input()
  formControlInput!: FormControl<any>; 
  @Input()
  styleClass?: string;
  @Input()
  imgSize?: number = 56;
  @Output()
  valueChange = new EventEmitter<any>();
  @Input()
  imgPreview?: string | ArrayBuffer | null = null;


  handleChange(event: any) {
    const file = event.target.files?.[0];

    if (file && this.formControlInput) {
      this.formControlInput.setValue(file); 
      this.formControlInput.markAsTouched();

      const reader = new FileReader();
      reader.onload = (e) => {
        this.imgPreview = e.target?.result;
      };
      reader.readAsDataURL(file);
    } else if (this.formControlInput) {
      this.formControlInput.setValue(null);
      this.formControlInput.markAsTouched();
      this.imgPreview = null;
    }
   
  }

  get isInvalid(): boolean {
    return !!(this.formControlInput?.invalid && this.formControlInput?.touched);
  }

   getFormError(): string {
    if (!this.formControlInput) {
      return '';
    }
    if (this.formControlInput.errors) {
      const errorKeys = Object.keys(this.formControlInput.errors);
      if (errorKeys.length > 0) {
        return this.formControlInput.errors[errorKeys[0]];
      }
    }
    return '';
  }
}
