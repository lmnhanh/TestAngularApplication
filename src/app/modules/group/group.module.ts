import { NgModule } from '@angular/core';
import { GroupComponent } from './group.component';
import { GroupListComponent } from './components/group-list/group-list.component';
import { GroupCreateFormComponent } from './components/group-create-form/group-create-form.component';
import { SharedModule } from 'app/shared/Shared.module';
import { GroupRoutingModule } from './group-routing.module';


@NgModule({
  declarations: [
    GroupComponent,
    GroupListComponent,
    GroupCreateFormComponent,
  ],
  imports: [
    SharedModule,
    GroupRoutingModule
  ],
  exports:[
    GroupComponent,
    GroupListComponent,
    GroupCreateFormComponent,
  ]
})
export class GroupModule { }
