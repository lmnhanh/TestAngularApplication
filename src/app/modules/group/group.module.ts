import { NgModule } from '@angular/core';
import { GroupListComponent } from './components/group-list/group-list.component';
import { GroupCreateFormComponent } from './components/group-create-form/group-create-form.component';
import { GroupRoutingModule } from './group-routing.module';
import { SharedModule } from 'app/modules/shared/shared.module';
import { GroupFilterFormComponent } from './components/group-filter-form/group-filter-form.component';

@NgModule({
  declarations: [
    GroupListComponent,
    GroupCreateFormComponent,
    GroupFilterFormComponent
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
