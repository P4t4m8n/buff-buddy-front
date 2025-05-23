import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, ValidationErrors } from '@angular/forms';
import { MatError } from '@angular/material/input';
import { UploadIconComponent } from "../../icons/upload-icon/upload-icon.component";

@Component({
  selector: 'app-input-img',
  imports: [MatError, UploadIconComponent],
  templateUrl: './input-img.component.html',
  styleUrl: './input-img.component.css',
})
export class InputImgComponent {
  @Input()
  @Input()
  formControlInput!: FormControl<any>; // Accept the FormControl
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
      this.formControlInput.setValue(file); // Update the control directly
      this.formControlInput.markAsTouched();

      const reader = new FileReader();
      reader.onload = (e) => {
        this.imgPreview = e.target?.result;
      };
      reader.readAsDataURL(file);
    } else if (this.formControlInput) {
      // Handle file clearing
      this.formControlInput.setValue(null);
      this.formControlInput.markAsTouched();
      this.imgPreview = null;
    }
    // You might not need valueChange anymore if using formControlInput directly
    // this.valueChange.emit(event);
  }

  // Helper to show validation state (optional)
  get isInvalid(): boolean {
    return !!(this.formControlInput?.invalid && this.formControlInput?.touched);
  }
}
