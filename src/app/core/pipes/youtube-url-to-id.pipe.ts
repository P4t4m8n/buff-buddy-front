import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'youtubeUrlToId',
})
export class YoutubeUrlToIdPipe implements PipeTransform {
  transform(url: string | undefined): string {
    if (!url) {
      return '';
    }

    // Handle YouTube Shorts URLs
    if (url.includes('/shorts/')) {
      const shortsMatch = url.match(/\/shorts\/([a-zA-Z0-9_-]{11})/);
      if (shortsMatch && shortsMatch[1]) {
        return shortsMatch[1];
      }
    }

    // Regular expression to extract YouTube video ID from standard URLs
    const regExp =
      /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);

    // Return the video ID (second capturing group) if found, otherwise empty string
    return match && match[2].length === 11 ? match[2] : '';
  }
}
