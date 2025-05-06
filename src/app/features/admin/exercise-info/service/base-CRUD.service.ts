import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { inject, signal, WritableSignal } from '@angular/core';
import { IPaginationDTO } from '../../../../core/components/pagination/pagination-dto';
import { buildQueryParams } from '../../../../core/functions/buildQueryParams';
import { catchError, Observable, tap } from 'rxjs';
import { ICRUDService } from '../../../../core/interfaces/icrudservice';
import { IEntity, IEntityDTO } from '../../../../core/types/app.type';

@Injectable()
export abstract class BaseCRUDService<T extends IEntity, DTO extends IEntityDTO>
  implements ICRUDService<T, DTO>
{
  protected httpClient = inject(HttpClient);
  protected abstract baseUrl: string;

  itemSignal: WritableSignal<T[] | null> = signal<T[] | null>(null);
  totalItemsSignal = signal<number>(0);
  protected itemErrorState = signal<string | null>(null);

  public get(pagination: IPaginationDTO): Observable<HttpResponse<T[]>> {
    const queryParams = buildQueryParams(pagination);
    return this.httpClient
      .get<T[]>(this.baseUrl, {
        params: queryParams,
        observe: 'response',
      })
      .pipe(
        tap((response) => {
          this.itemSignal.set(response.body as T[]);
          const headers = response.headers.get('total-count');
          this.totalItemsSignal.set(+(headers || 0));
        }),
        catchError((err) => {
          this.itemErrorState.set(err.error.message as string);
          throw err;
        })
      );
  }

  public getById(id: string): Observable<T> {
    return this.httpClient.get<T>(`${this.baseUrl}/${id}`);
  }

  public saveForm(dto: DTO) {
    if (dto.id) {
      return this.updateForm(dto);
    } else {
      return this.createForm(dto);
    }
  }
  public saveJson(dto: DTO) {
    if (dto.id) {
      return this.updateJson(dto);
    } else {
      return this.createJson(dto);
    }
  }

  public delete(id: string) {
    if (this.verifySignal()) {
      throw new Error('itemSignal is not initialized');
    }
    return this.httpClient.delete<void>(`${this.baseUrl}/${id}`).pipe(
      tap(() => {
        const items = this.itemSignal()!.filter((item) => item.id !== id);

        this.itemSignal.set(items);
        this.totalItemsSignal.set(this.totalItemsSignal() - 1);
      }),
      catchError((err) => {
        this.itemErrorState.set(err.error.message as string);
        throw err;
      })
    );
  }

  protected dtoToFormData(dto: DTO): FormData | null {
    return null; // Default implementation returns null
  }
  protected createForm(dto: DTO) {
    const formData = this.dtoToFormData(dto);
    if (this.verifySignal()) {
      throw new Error('itemSignal is not initialized');
    }
    return this.httpClient.post<T>(this.baseUrl, formData).pipe(
      tap((createdItem) => {
        const items = this.itemSignal() || [];
        // If we're already at the first page and have less than page size
        if (items.length < 10) {
          this.itemSignal.set([...items, createdItem]);
          // Increment total count
          this.totalItemsSignal.set(this.totalItemsSignal() + 1);
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
  protected updateForm(dto: DTO) {
    const formData = this.dtoToFormData(dto);

    if (this.verifySignal()) {
      throw new Error('itemSignal is not initialized');
    }
    return this.httpClient.put<T>(`${this.baseUrl}/${dto.id}`, formData).pipe(
      tap((item) => {
        const items = this.itemSignal();
        const index = items!.findIndex((existing) => existing.id === dto.id);
        if (index !== -1) {
          items![index] = item;
          this.itemSignal.set([...items!]);
        }
      }),
      catchError((err) => {
        this.itemErrorState.set(err.error.message as string);
        throw err;
      })
    );
  }
  protected createJson(dto: DTO) {
    if (this.verifySignal()) {
      throw new Error('itemSignal is not initialized');
    }
    return this.httpClient.post<T>(this.baseUrl, dto).pipe(
      tap((createdItem) => {
        const items = this.itemSignal() || [];
        // If we're already at the first page and have less than page size
        if (items.length < 10) {
          this.itemSignal.set([...items, createdItem]);
          // Increment total count
          this.totalItemsSignal.set(this.totalItemsSignal() + 1);
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
  protected updateJson(dto: DTO) {
    if (this.verifySignal()) {
      throw new Error('itemSignal is not initialized');
    }
    return this.httpClient.put<T>(`${this.baseUrl}/${dto.id}`, dto).pipe(
      tap((item) => {
        const items = this.itemSignal();
        const index = items!.findIndex((existing) => existing.id === dto.id);
        if (index !== -1) {
          items![index] = item;
          this.itemSignal.set([...items!]);
        }
      }),
      catchError((err) => {
        this.itemErrorState.set(err.error.message as string);
        throw err;
      })
    );
  }

  /*
   * Check if itemSignal is initialized and not null throw early error before making the request
   * If Signal is not initialized in this stage then we have a problem in the app
   */
  protected verifySignal() {
    return !this.itemSignal || !this.itemSignal();
  }
}
