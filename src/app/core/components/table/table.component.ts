import {
  ChangeDetectionStrategy,
  Component,
  inject,
  Input,
  Type,
} from '@angular/core';
import { ItemListComponent } from '../item-list/item-list.component';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { CRUD_SERVICE_TOKEN } from '../../providers/providers';
import { IPaginationDTO } from '../pagination/pagination-dto';
import { IEntityDTO, IEntityEditDTO, IImgUrl } from '../../types/app.type';
import { ICRUDService } from '../../interfaces/icrudservice';
import { NgClass, NgComponentOutlet } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-table',
  imports: [
    ItemListComponent,
    SweetAlert2Module,
    NgComponentOutlet,
    NgClass
  ],
  templateUrl: './table.component.html',
  styleUrl: './table.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TableComponent<
  T extends IEntityDTO & IImgUrl,
  TDTO extends IEntityEditDTO
> {
  @Input({ required: true })
  columnsHeaders: string[] = [];

  @Input()
  editDialogType: Type<any> | null = null;

  @Input()
  detailsLink?: boolean = false;

  @Input() styleClass: string | null = null;

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

  // updatePagination(data: any) {
  //   this.pagination = {
  //     page: data.pageIndex + 1,
  //     recordsPerPage: data.pageSize,
  //   };
  //   this.loadRecords();
  // }

  delete(id: string) {
    this.CRUDService.delete(id).subscribe(() => {
      this.loadRecords();
    });
  }

  getItemValue(key: string, item: T): string | number {
    const fixKLey = key as keyof T;
    const value = item[fixKLey];
    if (typeof value === 'string' || typeof value === 'number') {
      return value;
    }
    return '';
  }
}
