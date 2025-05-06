import { Component, inject } from '@angular/core';
import { ProgramService } from '../../services/program.service';
import { IProgram } from '../../models/iProgram';
import { IPaginationDTO } from '../../../../core/components/pagination/pagination-dto';
import { HttpResponse } from '@angular/common/http';
import { TableComponent } from '../../../../core/components/table/table.component';
import { CRUD_SERVICE_TOKEN } from '../../../../core/providers/providers';
import { RouterOutlet } from '@angular/router';
import { ExerciseProgramEditDialogComponent } from '../../../program-exercise/components/exercise-program-edit-dialog/program-exercise-edit-dialog.component';
import { ProgramEditDialogComponent } from '../../componenets/program-edit-dialog/program-edit-dialog.component';

@Component({
  selector: 'app-program-index',
  imports: [TableComponent, RouterOutlet, ProgramEditDialogComponent],
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

  editDialogType = ProgramEditDialogComponent;

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
