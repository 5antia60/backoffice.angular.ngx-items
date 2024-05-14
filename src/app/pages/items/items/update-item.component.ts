//#region Imports

import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NbToastrService } from '@nebular/theme';
import { BaseItemComponent } from './base-item.component';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { getCrudErrors } from '../../../shared/functions';

//#endregion

@Component({
  selector: 'ngx-update-items',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss'],
})
export class UpdateItemComponent extends BaseItemComponent implements OnInit {

  //#region Constructor

  constructor(
    protected readonly router: Router,
    protected readonly toast: NbToastrService,
    formBuilder: FormBuilder,
    route: ActivatedRoute,
    firestore: AngularFirestore,
  ) {
    super(formBuilder, route, firestore, toast);
  }

  //#endregion

  //#region Public Functions

  public async ngOnInit(): Promise<void> {
    this.showLoading = true;

    const entityId = this.route.snapshot.paramMap.get('entityId');

    this.form.doc(entityId)
      .valueChanges()
      .subscribe(item => {
        this.formGroup.controls.name.setValue(item.name);
        this.formGroup.controls.lastUpdate.setValue(item.lastUpdate);
        this.formGroup.controls.description.setValue(item.description);
        this.formGroup.controls.weight.setValue(item.weight);
      });

    this.showLoading = false;
  }

  public async onSubmit(): Promise<void> {
    if (this.showLoading)
      return;

    this.showLoading = true;

    try {
      const entityId = this.route.snapshot.paramMap.get('entityId');
      const payload = this.formGroup.getRawValue();

      await this.form.doc(entityId).update(payload);

      this.toast.success('Item atualizado com sucesso!', 'Sucesso');
      await this.router.navigateByUrl(this.backUrl);
    } catch (error) {
      this.toast.danger(getCrudErrors(error)[0], 'Oops...');
    } finally {
      this.showLoading = false;
    }
  }

  //#endregion

}
