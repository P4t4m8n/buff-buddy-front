import {
  ChangeDetectionStrategy,
  Component,
  inject,
  Input,
  Optional,
  TemplateRef,
  Type,
} from '@angular/core';
import { ItemListComponent } from '../item-list/item-list.component';
import { MatTableModule } from '@angular/material/table';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { CRUD_SERVICE_TOKEN } from '../../providers/providers';
import { IPaginationDTO } from '../pagination/pagination-dto';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { IEntity, IEntityDTO } from '../../types/app.type';
import { ICRUDService } from '../../interfaces/icrudservice';
import { MatButton, MatButtonModule } from '@angular/material/button';
import { NgComponentOutlet } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';

@Component({
  selector: 'app-table',
  imports: [
    ItemListComponent,
    MatTableModule,
    SweetAlert2Module,
    MatPaginatorModule,
    MatButton,
    NgComponentOutlet,
    RouterLink,
    MatButtonModule,
    MatDividerModule,
    MatIconModule,
  ],
  templateUrl: './table.component.html',
  styleUrl: './table.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TableComponent<T extends IEntity, TDTO extends IEntityDTO> {
  @Input({ required: true })
  columnsHeaders: string[] = [];

  @Input()
  editDialogType: Type<any> | null = null;

  @Input()
  detailsLink?: boolean = false;

  CRUDService = inject(CRUD_SERVICE_TOKEN) as ICRUDService<T, TDTO>;
  pagination: IPaginationDTO = { page: 1, recordsPerPage: 10 };
  totalRecordsCount!: number;
  itemsSignal = this.CRUDService.itemSignal;
  totalItemsSignal = this.CRUDService.totalItemsSignal;

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
