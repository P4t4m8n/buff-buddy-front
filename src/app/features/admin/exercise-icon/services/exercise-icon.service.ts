import { HttpClient, HttpResponse } from '@angular/common/http';
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
import { ICRUDService } from '../../../../core/interfaces/icrudservice';

@Injectable({
  providedIn: 'root',
})
export class ExerciseIconService
  implements ICRUDService<IExerciseIcon, IExerciseIconDTO>
{
  private httpClient = inject(HttpClient);
  private baseUrl = environment.apiUrl + '/exercise-icons';
  itemSignal = signal<IExerciseIcon[]>([]);
  private exerciseIconsErrorState = signal<string | null>(null);

  public get(
    pagination: IPaginationDTO
  ): Observable<HttpResponse<IExerciseIcon[]>> {
    const queryParams = buildQueryParams(pagination);
    return this.httpClient
      .get<IExerciseIcon[]>(this.baseUrl, {
        params: queryParams,
        observe: 'response',
      })
      .pipe(
        tap((response) => {
          console.log(' response:', response.body);
          this.itemSignal.set(response.body as IExerciseIcon[]);
          console.log(' this.exerciseIconsState:', this.itemSignal());
        }),
        catchError((err) => {
          this.exerciseIconsErrorState.set(err.error.message as string);
          throw err;
        })
      );
  }

  public getById(id: string): Observable<IExerciseIcon> {
    return this.httpClient.get<IExerciseIcon>(`${this.baseUrl}/${id}`);
  }

  public create(dto: IExerciseIconDTO) {
    const formData = this.dtoToFormData(dto);
    return this.httpClient.post<IExerciseIconDTO>(this.baseUrl, formData).pipe(
      tap((exerciseIcon) => {
        console.log(' exerciseIcon:', exerciseIcon);
        const exerciseIcons = this.itemSignal();
        console.log(" exerciseIcons:", exerciseIcons)
        this.itemSignal.set([...exerciseIcons, exerciseIcon]);
        console.log(' this.exerciseIconsState:', this.itemSignal());
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
          const exerciseIcons = this.itemSignal();
          const index = exerciseIcons.findIndex((icon) => icon.id === dto.id);
          if (index !== -1) {
            exerciseIcons[index] = exerciseIcon;
            this.itemSignal.set([...exerciseIcons]);
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
        const exerciseIcons = this.itemSignal();
        const updatedExerciseIcons = exerciseIcons.filter(
          (exerciseIcon) => exerciseIcon.id !== id
        );
        this.itemSignal.set(updatedExerciseIcons);
      }),
      catchError((err) => {
        this.exerciseIconsErrorState.set(err.error.message as string);
        throw err;
      })
    );
  }

  public getSignal(): Signal<IExerciseIcon[]> {
    return this.itemSignal;
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
