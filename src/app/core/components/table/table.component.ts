import {
  ChangeDetectionStrategy,
  Component,
  inject,
  Input,
} from '@angular/core';
import { ItemListComponent } from '../item-list/item-list.component';
import { MatTableModule } from '@angular/material/table';
import { ExerciseIconEditDialogComponent } from '../../../features/admin/exercise-icon/components/exercise-icon-edit-dialog/exercise-icon-edit-dialog.component';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { CRUD_SERVICE_TOKEN } from '../../providers/providers';
import { IPaginationDTO } from '../pagination/pagination-dto';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { IEntity, IEntityDTO } from '../../types/app.type';
import { ICRUDService } from '../../interfaces/icrudservice';
import { MatButton } from '@angular/material/button';

@Component({
  selector: 'app-table',
  imports: [
    ItemListComponent,
    MatTableModule,
    ExerciseIconEditDialogComponent,
    SweetAlert2Module,
    MatPaginatorModule,
    MatButton,
  ],
  templateUrl: './table.component.html',
  styleUrl: './table.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TableComponent<T extends IEntity, TDTO extends IEntityDTO> {
  @Input({ required: true })
  columnsHeaders: string[] = [];
  CRUDService = inject(CRUD_SERVICE_TOKEN) as ICRUDService<T, TDTO>;
  pagination: IPaginationDTO = { page: 1, recordsPerPage: 10 };
  totalRecordsCount!: number;
  itemsSignal = this.CRUDService.itemSignal;

  constructor() {
    this.loadRecords();
  }
  loadRecords() {
    this.CRUDService.get(this.pagination).subscribe();
  }

  updatePagination(data: PageEvent) {
    this.pagination = {
      page: data.pageIndex + 1,
      recordsPerPage: data.pageSize,
    };
    this.loadRecords();
  }

  delete(id: string) {
    this.CRUDService.delete(id).subscribe(() => {
      this.loadRecords();
    });
  }
}
