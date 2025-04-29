import { Injectable } from '@angular/core';
import { BaseCRUDService } from '../../admin/exercise-info/service/base-CRUD.service';
import { IProgram, IProgramEditDTO } from '../models/iProgram';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ProgramService extends BaseCRUDService<IProgram, IProgramEditDTO> {
  protected baseUrl = environment.apiUrl + '/program';
}
