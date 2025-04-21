import { HttpClient, HttpResponse } from '@angular/common/http';
import { inject, Injectable, signal, WritableSignal } from '@angular/core';
import { environment } from '../../../../../environments/environment';
import { IPaginationDTO } from '../../../../core/components/pagination/pagination-dto';
import { buildQueryParams } from '../../../../core/functions/buildQueryParams';
import { catchError, Observable, switchMap, tap } from 'rxjs';
import { ICRUDService } from '../../../../core/interfaces/icrudservice';
import {
  IExerciseMuscle,
  IExerciseMuscleDTO,
} from '../models/exerciseMuscle.model';

@Injectable({
  providedIn: 'root',
})
export class ExerciseMuscleService
  implements ICRUDService<IExerciseMuscle, IExerciseMuscleDTO>
{
  private httpClient = inject(HttpClient);
  private baseUrl = environment.apiUrl + '/exercise-muscle';
  itemSignal: WritableSignal<IExerciseMuscle[] | null> = signal<
    IExerciseMuscle[] | null
  >(null);
  totalItemsSignal = signal<number>(0);
  private itemErrorState = signal<string | null>(null);

  public get(
    pagination: IPaginationDTO
  ): Observable<HttpResponse<IExerciseMuscle[]>> {
    const queryParams = buildQueryParams(pagination);
    return this.httpClient
      .get<IExerciseMuscle[]>(this.baseUrl, {
        params: queryParams,
        observe: 'response',
      })
      .pipe(
        tap((response) => {
          this.itemSignal.set(response.body as IExerciseMuscle[]);
          const headers = response.headers.get('total-count');
          this.totalItemsSignal.set(+(headers || 0));
        }),
        catchError((err) => {
          this.itemErrorState.set(err.error.message as string);
          throw err;
        })
      );
  }

  public getById(id: string): Observable<IExerciseMuscle> {
    return this.httpClient.get<IExerciseMuscle>(`${this.baseUrl}/${id}`);
  }

  public save(dto: IExerciseMuscleDTO) {
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
        //exerciseMusclesGroup cant be null, because we check it in the if statement above, TS is fun
        const exerciseMusclesGroup = this.itemSignal()!.filter(
          (item) => item.id !== id
        );

        this.itemSignal.set(exerciseMusclesGroup);
        this.totalItemsSignal.set(this.totalItemsSignal() - 1);
      }),
      catchError((err) => {
        this.itemErrorState.set(err.error.message as string);
        throw err;
      })
    );
  }

  private dtoToFormData(dto: IExerciseMuscleDTO): FormData {
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

  private create(dto: IExerciseMuscleDTO) {
    const formData = this.dtoToFormData(dto);
    if (this.verifySignal()) {
      throw new Error('itemSignal is not initialized');
    }
    return this.httpClient.post<IExerciseMuscle>(this.baseUrl, formData).pipe(
      tap((createdItem) => {
        // First update the signals with the response
        const exerciseMusclesGroup = this.itemSignal() || [];
        // If we're already at the first page and have less than page size
        if (exerciseMusclesGroup.length < 10) {
          this.itemSignal.set([...exerciseMusclesGroup, createdItem]);
          // Increment total count
          this.totalItemsSignal.set(this.totalItemsSignal() + 1);
          //Else if we have more than 10 items, we need to refresh the dataset
        } else {
          this.get({ page: 1, recordsPerPage: 10 }).subscribe({
            error: (err) =>
              console.error('Error refreshing after create:', err),
          });
        }
      }),
      catchError((err) => {
        this.itemErrorState.set(err.error.message as string);
        throw err;
      })
    );
  }

  private update(dto: IExerciseMuscleDTO) {
    const formData = this.dtoToFormData(dto);

    if (this.verifySignal()) {
      throw new Error('itemSignal is not initialized');
    }
    return this.httpClient
      .put<IExerciseMuscle>(`${this.baseUrl}/${dto.id}`, formData)
      .pipe(
        tap((item) => {
          const exerciseMusclesGroup = this.itemSignal();
          //exerciseIcons cant be null, because we check it in the if statement above, TS is fun
          const index = exerciseMusclesGroup!.findIndex(
            (icon) => icon.id === dto.id
          );
          if (index !== -1) {
            exerciseMusclesGroup![index] = item;
            this.itemSignal.set([...exerciseMusclesGroup!]);
          }
        }),
        catchError((err) => {
          this.itemErrorState.set(err.error.message as string);
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
