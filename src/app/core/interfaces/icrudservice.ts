import { Observable } from 'rxjs';
import { IPaginationDTO } from '../components/pagination/pagination-dto';
import { HttpResponse } from '@angular/common/http';
import { IEntity } from '../types/app.type';
import { Signal, WritableSignal } from '@angular/core';

export interface ICRUDService<T, TDTO> {
  get(pagination: IPaginationDTO): Observable<HttpResponse<T[]>>;
  getById(id: string): Observable<T>;
  save(dto: TDTO): Observable<TDTO>;
  delete(id: string): Observable<void>;
  itemSignal: WritableSignal<T[] | null>;
  totalItemsSignal: WritableSignal<number>;
}
