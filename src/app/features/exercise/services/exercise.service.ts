import { inject, Injectable } from '@angular/core';
import { TExercise } from '../types/exercise.type';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ExerciseService {
  private http = inject(HttpClient);
  private baseUrl = environment.apiUrl + '/exercises';

  constructor() {}
  public get(): Observable<TExercise[]> {
    return this.http.get<TExercise[]>(this.baseUrl);
  }

  public create(exercise: TExercise) {
    return this.http.post<TExercise>(this.baseUrl, exercise);
  }
}
