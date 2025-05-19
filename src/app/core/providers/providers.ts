import { InjectionToken } from '@angular/core';
import { IEntityDTO, IEntityEditDTO } from '../types/app.type';
import { ICRUDService } from '../interfaces/icrudservice';

export const CRUD_SERVICE_TOKEN = new InjectionToken<
  ICRUDService<IEntityDTO, IEntityEditDTO>
>('CRUD_SERVICE_TOKEN');
