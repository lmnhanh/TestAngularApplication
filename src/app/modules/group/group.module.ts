import { NgModule } from '@angular/core';
import { GroupListComponent } from './components/group-list/group-list.component';
import { GroupCreateFormComponent } from './components/group-create-form/group-create-form.component';
import { SharedModule } from 'app/shared/shared.module';
import { GroupFilterFormComponent } from './components/group-filter-form/group-filter-form.component';
import { GroupDetailComponent } from './components/group-detail/group-detail.component';
import { EmptyCollectionComponent } from 'app/shared/components/empty-collection/empty-collection.component';
import { GroupRoutingModule } from './group-routing.module';

@NgModule({
  declarations: [
    GroupListComponent,
    GroupCreateFormComponent,
    GroupFilterFormComponent,
    GroupDetailComponent
  ],
  imports: [
    SharedModule,
    GroupRoutingModule
  ],
  exports:[
    GroupListComponent,
    GroupCreateFormComponent
  ]
})
export class GroupModule { }
