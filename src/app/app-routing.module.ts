import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./modules/group/group.module').then(m => m.GroupModule)
  },
  {
    path: 'group',
    loadChildren: () => import('./modules/group/group.module').then(m => m.GroupModule)
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
