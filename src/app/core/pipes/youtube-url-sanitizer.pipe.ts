import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Pipe({
  name: 'youtubeUrlSanitizer',
})
export class YoutubeUrlSanitizerPipe implements PipeTransform {
  constructor(private sanitizer: DomSanitizer) {}
  transform(url: string | undefined): string {
    if (!url) {
      return '';
    }

    console.log(this.sanitizer.bypassSecurityTrustResourceUrl(url) as string)
    return this.sanitizer.bypassSecurityTrustResourceUrl(url) ;
  }
}
