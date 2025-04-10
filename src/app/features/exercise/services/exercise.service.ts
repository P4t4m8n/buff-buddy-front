import { inject, Injectable } from '@angular/core';
import { IExercise } from '../types/exercise.type';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { IPaginationDTO } from '../../../core/components/pagination/pagination-dto';
import { buildQueryParams } from '../../../core/functions/buildQueryParams';

@Injectable({
  providedIn: 'root',
})
export class ExerciseService {
  private http = inject(HttpClient);
  private baseUrl = environment.apiUrl + '/exercises';

  constructor() {}

  public get(
    pagination: IPaginationDTO
  ): Observable<HttpResponse<IExercise[]>> {
    const queryParams = buildQueryParams(pagination);
    return this.http.get<IExercise[]>(this.baseUrl, {
      params: queryParams,
      observe: 'response',
    });
  }

  public getById(id: string): Observable<IExercise> {
    return this.http.get<IExercise>(`${this.baseUrl}/${id}`);
  }

  public save(exercise: IExercise): Observable<IExercise> {
    if (exercise.id) {
      return this.update(exercise);
    } else {
      return this.create(exercise);
    }
  }

  public delete(id: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }

  private create(exercise: IExercise) {
    return this.http.post<IExercise>(this.baseUrl, exercise);
  }

  private update(exercise: IExercise) {
    const { id } = exercise;
    return this.http.put<IExercise>(`${this.baseUrl}/${id}`, exercise);
  }
}
