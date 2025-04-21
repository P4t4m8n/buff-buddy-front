import { HttpClient, HttpResponse } from '@angular/common/http';
import { inject, Injectable, signal, WritableSignal } from '@angular/core';
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
  itemSignal: WritableSignal<IExerciseIcon[] | null> = signal<
    IExerciseIcon[] | null
  >(null);
  totalItemsSignal = signal<number>(0);
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
          console.log(' response:', response);
          this.itemSignal.set(response.body as IExerciseIcon[]);
          const headers = response.headers.get('total-count');
          console.log(' headers:', +headers!);
          this.totalItemsSignal.set(+(headers || 0));
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

  public save(dto: IExerciseIconDTO) {
    if (dto.id) {
      return this.update(dto);
    } else {
      return this.create(dto);
    }
  }

  public delete(id: string) {
    if (this.verifySignal()) {
      throw new Error('itemSignal is not initialized');
    }
    return this.httpClient.delete<void>(`${this.baseUrl}/${id}`).pipe(
      tap(() => {
        const exerciseIcons = this.itemSignal();
        //exerciseIcons cant be null, because we check it in the if statement above, TS is fun
        const updatedExerciseIcons = exerciseIcons!.filter(
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

  private create(dto: IExerciseIconDTO) {
    const formData = this.dtoToFormData(dto);
    return this.httpClient.post<IExerciseIconDTO>(this.baseUrl, formData).pipe(
      tap((exerciseIcon) => {
        const exerciseIcons = this.itemSignal();
        this.itemSignal.set([...(exerciseIcons || []), exerciseIcon]);
      }),
      catchError((err) => {
        this.exerciseIconsErrorState.set(err.error.message as string);
        throw err;
      })
    );
  }

  private update(dto: IExerciseIconDTO) {
    const formData = this.dtoToFormData(dto);

    if (this.verifySignal()) {
      throw new Error('itemSignal is not initialized');
    }
    return this.httpClient
      .put<IExerciseIconDTO>(`${this.baseUrl}/${dto.id}`, formData)
      .pipe(
        tap((exerciseIcon) => {
          const exerciseIcons = this.itemSignal();
          //exerciseIcons cant be null, because we check it in the if statement above, TS is fun
          const index = exerciseIcons!.findIndex((icon) => icon.id === dto.id);
          if (index !== -1) {
            exerciseIcons![index] = exerciseIcon;
            this.itemSignal.set([...exerciseIcons!]);
          }
        }),
        catchError((err) => {
          this.exerciseIconsErrorState.set(err.error.message as string);
          throw err;
        })
      );
  }

  /*
   *check if itemSignal is initialized and not null throw early error before making the request
   *If Signal is not initialized in this stage then we have a problem in the app
   */
  private verifySignal() {
    return !this.itemSignal || !this.itemSignal();
  }
}
