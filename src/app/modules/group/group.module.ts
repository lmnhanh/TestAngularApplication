import { NgModule } from '@angular/core';
import { GroupListComponent } from './components/group-list/group-list.component';
import { GroupCreateFormComponent } from './components/group-create-form/group-create-form.component';
import { GroupRoutingModule } from './group-routing.module';
import { SharedModule } from 'app/modules/shared/shared.module';

@NgModule({
  declarations: [
    GroupListComponent,
    GroupCreateFormComponent,
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
