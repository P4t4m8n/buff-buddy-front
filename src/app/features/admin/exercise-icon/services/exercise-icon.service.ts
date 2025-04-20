import { HttpClient } from '@angular/common/http';
import {
  computed,
  inject,
  Injectable,
  Signal,
  signal,
  WritableSignal,
} from '@angular/core';
import { environment } from '../../../../../environments/environment';
import { IExerciseIcon, IExerciseIconDTO } from '../models/exerciseIcon';
import { IPaginationDTO } from '../../../../core/components/pagination/pagination-dto';
import { buildQueryParams } from '../../../../core/functions/buildQueryParams';
import { catchError, Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ExerciseIconService {
  private httpClient = inject(HttpClient);
  private baseUrl = environment.apiUrl + '/exercise-icons';
  private exerciseIconsState = signal<IExerciseIcon[]>([]);
  private exerciseIconsErrorState = signal<string | null>(null);

  public get(pagination: IPaginationDTO): Observable<IExerciseIcon[]> {
    const queryParams = buildQueryParams(pagination);
    return this.httpClient
      .get<IExerciseIcon[]>(this.baseUrl, {
        params: queryParams,
      })
      .pipe(
        tap((exerciseIcons) => {
          console.log(" exerciseIcons:", exerciseIcons)
          return this.exerciseIconsState.set(exerciseIcons);
        }),
        catchError((err) => {
          this.exerciseIconsErrorState.set(err.error.message as string);
          throw err;
        })
      );
  }

  public create(dto: IExerciseIconDTO) {
    const formData = this.dtoToFormData(dto);
    return this.httpClient.post<IExerciseIconDTO>(this.baseUrl, formData).pipe(
      tap((exerciseIcon) => {
        const exerciseIcons = this.exerciseIconsState();
        this.exerciseIconsState.set([...exerciseIcons, exerciseIcon]);
      }),
      catchError((err) => {
        this.exerciseIconsErrorState.set(err.error.message as string);
        throw err;
      })
    );
  }

  public update(dto: IExerciseIconDTO) {
    const formData = this.dtoToFormData(dto);
    return this.httpClient
      .put<IExerciseIconDTO>(`${this.baseUrl}/${dto.id}`, formData)
      .pipe(
        tap((exerciseIcon) => {
          const exerciseIcons = this.exerciseIconsState();
          const index = exerciseIcons.findIndex((icon) => icon.id === dto.id);
          if (index !== -1) {
            exerciseIcons[index] = exerciseIcon;
            this.exerciseIconsState.set([...exerciseIcons]);
          }
        }),
        catchError((err) => {
          this.exerciseIconsErrorState.set(err.error.message as string);
          throw err;
        })
      );
  }

  public delete(id: string) {
    return this.httpClient.delete<void>(`${this.baseUrl}/${id}`).pipe(
      tap(() => {
        const exerciseIcons = this.exerciseIconsState();
        const updatedExerciseIcons = exerciseIcons.filter(
          (exerciseIcon) => exerciseIcon.id !== id
        );
        this.exerciseIconsState.set(updatedExerciseIcons);
      }),
      catchError((err) => {
        this.exerciseIconsErrorState.set(err.error.message as string);
        throw err;
      })
    );
  }

  get exerciseIconsSignal(): Signal<IExerciseIcon[]> {
    return computed(() => this.exerciseIconsState());
  }

  get exerciseIconsErrorSignal(): Signal<string | null> {
    return computed(() => this.exerciseIconsErrorState());
  }

  private dtoToFormData(dto: IExerciseIconDTO): FormData {
    const formData = new FormData();
    formData.append('name', dto.name || '');

    if (dto.file) {
      formData.append('file', dto.file);
    }
    const id = dto.id;
    if (id) {
      formData.append('id', id);
    }

    if (dto.imgUrl) {
      formData.append('imgUrl', dto.imgUrl);
    }
    return formData;
  }
}
