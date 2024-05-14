import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ItemModule } from './items/item.module';
import { CreateItemComponent } from './items/create-item.component';
import { UpdateItemComponent } from './items/update-item.component';
import { ItemsComponent } from './items.component';
import { ListItemsComponent } from './list-items/list-items.component';
import { ListItemsModule } from './list-items/list-items.module';
import { NotFoundComponent } from '../miscellaneous/not-found/not-found.component';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: '',
        component: ItemsComponent,
        children: [
          { path: '', component: ListItemsComponent },
          { path: 'create', component: CreateItemComponent },
          { path: ':entityId', component: UpdateItemComponent },
          { path: '**', component: NotFoundComponent },
        ],
      },
    ]),
    ListItemsModule,
    ItemModule,
  ],
  declarations: [
    ItemsComponent,
  ],
})
export class ItemsModule {}
