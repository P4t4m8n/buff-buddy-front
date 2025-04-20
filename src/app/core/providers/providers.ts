import { InjectionToken } from '@angular/core';
import { IEntity, IEntityDTO } from '../types/app.type';
import { ICRUDService } from '../interfaces/icrudservice';

export const CRUD_SERVICE_TOKEN = new InjectionToken<
  ICRUDService<IEntity, IEntityDTO>
>('CRUD_SERVICE_TOKEN');
