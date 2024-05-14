//#region Imports

import { Component, OnDestroy } from '@angular/core';
import { NbToastrService } from '@nebular/theme';
import { ItemProxy } from '../../../models/proxies/item.proxy';
import { Subscription } from 'rxjs';
import { AngularFirestore } from '@angular/fire/compat/firestore';

//#endregion

@Component({
  selector: 'ngx-list-items',
  templateUrl: './list-items.component.html',
})
export class ListItemsComponent implements OnDestroy {

  //#region Constructor

  constructor(
    protected readonly toast: NbToastrService,
    protected readonly firestore: AngularFirestore,
  ) {
    this.getItemsSubscription = this.firestore.collection('items').snapshotChanges().subscribe((items: any) => {
      this.listItems = items.map(item => {
        const itemId = item.payload.doc.id;
        const itemData = item.payload.doc.data();

        return {
          id: itemId,
          name: itemData.name,
          lastUpdate: new Date(itemData.lastUpdate.seconds * 1000),
          weight: itemData.weight,
        };
      });
    });
  }

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

  //#region Private Properties

  private getItemsSubscription: Subscription | any;

  //#endregion

  //#region Public Methods

  public ngOnDestroy(): void {
    this.getItemsSubscription.unsubscribe();
  }

  //#endregion

}
