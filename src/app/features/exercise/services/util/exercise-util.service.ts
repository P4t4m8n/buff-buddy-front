import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ExerciseUtilService {
  constructor() {}

  getEmpty() {
    return {
      id: '',
      name: '',
      youtubeUrl: '',
      imgUrl: '',
      type: '',
      equipment: '',
      targetMuscle: '',
    };
  }
}
