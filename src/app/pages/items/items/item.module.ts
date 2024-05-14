import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import {
  NbButtonModule,
  NbCardModule,
  NbFormFieldModule,
  NbIconModule,
  NbInputModule,
  NbSelectModule,
  NbSpinnerModule,
  NbToggleModule,
  NbTooltipModule,
} from '@nebular/theme';
import { CreateItemComponent } from './create-item.component';
import { UpdateItemComponent } from './update-item.component';

@NgModule({
  imports: [
    ReactiveFormsModule,
    RouterModule,
    CommonModule,
    NbButtonModule,
    NbCardModule,
    NbSpinnerModule,
    NbInputModule,
    NbSelectModule,
    NbToggleModule,
    NbFormFieldModule,
    NbTooltipModule,
    NbIconModule,
  ],
  exports: [
    CreateItemComponent,
    UpdateItemComponent,
  ],
  declarations: [
    CreateItemComponent,
    UpdateItemComponent,
  ],
})
export class ItemModule {}
