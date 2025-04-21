import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-item-list',
  imports: [],
  templateUrl: './item-list.component.html',
  styleUrl: './item-list.component.css',
})
export class ItemListComponent implements OnInit {
  ngOnInit(): void {}
  @Input({ required: true })
  items: any[] | null = null;
}
