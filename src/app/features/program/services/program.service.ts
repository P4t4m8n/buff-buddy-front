import { Injectable } from '@angular/core';
import { BaseCRUDService } from '../../../core/services/base-CRUD.service';
import { IProgram, IProgramEditDTO } from '../models/iProgram';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ProgramService extends BaseCRUDService<IProgram, IProgramEditDTO> {
  protected baseUrl = environment.apiUrl + '/program';
}
