import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-input-img',
  imports: [],
  templateUrl: './input-img.component.html',
  styleUrl: './input-img.component.css',
})
export class InputImgComponent {
  @Input()
  imgUrl?: string;

  imgBase64?: string;

  @Output()
  fileBulbEmitter = new EventEmitter<File | null>();

  change(event: Event) {
    const input = event.target as HTMLInputElement;

    if (input.files && input.files.length > 0) {
      const file: File = input.files[0];
      this.toBase64(file)
        .then((value: string) => (this.imgBase64 = value))
        .catch((error) => console.error(error));

      this.fileBulbEmitter.emit(file);
      this.imgUrl = undefined;
    }
  }

  private toBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        resolve(reader.result as string);
      };
      reader.onerror = (error) => {
        reject(error);
      };
    });
  }
}
