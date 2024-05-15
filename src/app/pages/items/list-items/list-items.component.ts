//#region Imports

import { Component, OnInit } from '@angular/core';
import { NbToastrService } from '@nebular/theme';
import { ItemProxy } from '../../../models/proxies/item.proxy';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ItemsService } from '../../../services/items/items.service';

//#endregion

@Component({
  selector: 'ngx-list-items',
  templateUrl: './list-items.component.html',
})
export class ListItemsComponent implements OnInit {

  //#region Constructor

  constructor(
    protected readonly toast: NbToastrService,
    protected readonly firestore: AngularFirestore,
    protected readonly itemsService: ItemsService,
  ) { }

  //#endregion

  //#region Public Properties

  public listItems: ItemProxy[] = [];

  public displayedColumns: string[] = [
    'name',
    'lastUpdate',
    'weight',
    'actions',
  ];

  //#endregion

  public async ngOnInit() {
    try {
      this.listItems = await this.itemsService.getAll();
    } catch (error) {
      this.toast.danger('Houve um erro ao carregar informações.', 'Oops...');
    }
  }

}
