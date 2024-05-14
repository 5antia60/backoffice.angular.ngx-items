//#region Imports

import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NbToastrService } from '@nebular/theme';
import { BaseItemComponent } from './base-item.component';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { getCrudErrors } from '../../../shared/functions';

//#endregion

@Component({
  selector: 'ngx-create-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss'],
})
export class CreateItemComponent extends BaseItemComponent {

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

  //#region Public Methods

  public async onSubmit(): Promise<void> {
    if (this.showLoading)
      return;

    this.showLoading = true;

    try {
      const payload = this.formGroup.getRawValue();
      await this.form.add(payload);

      this.toast.success('Item criado com sucesso!', 'Sucesso');
      await this.router.navigateByUrl(this.backUrl);
    } catch (error) {
      this.toast.danger(getCrudErrors(error)[0], 'Oops...');
    } finally {
      this.showLoading = false;
    }
  }

  //#endregion
}
