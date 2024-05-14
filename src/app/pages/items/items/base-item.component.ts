//#region Imports

import { Directive } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NbToastrService } from '@nebular/theme';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { ItemProxy } from '../../../models/proxies/item.proxy';

//#endregion

@Directive()
export class BaseItemComponent {

  //#region Constructor

  constructor(
    protected readonly formBuilder: FormBuilder,
    protected readonly route: ActivatedRoute,
    protected readonly firestore: AngularFirestore,
    protected readonly toast: NbToastrService,
  ) {
    this.backUrl = '/pages/items';

    this.form = this.firestore.collection('items');
    this.isUpdate = route.snapshot.paramMap.has('entityId');

    this.formGroup = formBuilder.group({
      name: ['', Validators.required],
      lastUpdate: [new Date()],
      description: [''],
      weight: ['', Validators.required],
    });
  }

  //#endregion

  //#region Public Properties

  public showLoading: boolean;
  public backUrl: string;
  public formGroup: FormGroup;

  public isUpdate: boolean = false;

  public form: AngularFirestoreCollection<ItemProxy>;

  //endregion

}
