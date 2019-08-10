import { Component, OnInit } from '@angular/core';

import { PoPageAction, PoTableColumn } from '@portinari/portinari-ui';

import { TablesService } from './tables.service';

@Component({
  selector: 'app-tables',
  templateUrl: './tables.component.html',
  styleUrls: ['./tables.component.css'],
  providers: [TablesService]
})
export class TablesComponent implements OnInit {

  public literals: object;
  public isLoading: boolean;
  public hasNext: boolean;

  readonly actions: Array<PoPageAction> = [
    // actions of table here
  ];

  columns: Array<PoTableColumn>;

  items: Array<any> = [];

  constructor(private tablesService: TablesService) {
    this.literals = this.tablesService.literals;
    this.columns = this.tablesService.getColumns();
  }

  ngOnInit() {
    this.isLoading = true;
    this.tablesService.get().subscribe(response => {
      this.items = response.items;
      this.hasNext = response.hasNext;
    },
    error => console.error('Erro ao buscar Tabelas', error),
    () => this.isLoading = false
    );

   }

}