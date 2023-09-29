import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GroupListComponent } from './components/group-list/group-list.component';
import { GroupCreateFormComponent } from './components/group-create-form/group-create-form.component';
import { GroupDetailComponent } from './components/group-detail/group-detail.component';

const routes: Routes = [
  {
    path: '',
    component: GroupListComponent,
  },
  {
    path: 'list',
    component: GroupListComponent,
  },
  {
    path: 'details/:id',
    component: GroupDetailComponent,
  },
  {
    path: 'create',
    component: GroupCreateFormComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GroupRoutingModule {}
