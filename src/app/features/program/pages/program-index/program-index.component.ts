import { Component, inject } from '@angular/core';
import { ProgramService } from '../../services/program.service';
import { IProgram } from '../../models/iProgram';
import { IPaginationDTO } from '../../../../core/components/pagination/pagination-dto';
import { HttpResponse } from '@angular/common/http';
import { TableComponent } from '../../../../core/components/table/table.component';
import { CRUD_SERVICE_TOKEN } from '../../../../core/providers/providers';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-program-index',
  imports: [TableComponent, RouterLink, MatButtonModule],
  templateUrl: './program-index.component.html',
  styleUrl: './program-index.component.css',
  providers: [{ provide: CRUD_SERVICE_TOKEN, useExisting: ProgramService }],
})
export class ProgramIndexComponent {
  programService = inject(ProgramService);
  programs: IProgram[] = [];
  pagination: IPaginationDTO = {
    page: 1,
    recordsPerPage: 10,
  };
  totalRecords: number = 0;
  columnsHeaders = [
    'name',
    'startDate',
    'endDate',
    'isActive',
    'Number of exercises',
  ];

  constructor() {
    this.loadItems();
  }


  loadItems() {
    this.programService
      .get(this.pagination)
      .subscribe((res: HttpResponse<IProgram[]>) => {
        console.log(' res:', res);
        this.programs = res.body || [];
        this.totalRecords = Number(res.headers.get('total-count'));
      });
  }

  onItemSave() {
    this.loadItems();
  }
}
