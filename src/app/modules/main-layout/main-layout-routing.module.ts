import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { MainLayoutComponent } from "./components/main-layout/main-layout.component";

const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      {
        path: '',
        loadChildren: () => import('../group/group.module').then(m => m.GroupModule),
        title: "Group page",
      },
      {
        path: 'group',
        loadChildren: () => import('../group/group.module').then(m => m.GroupModule),
        title: "Group page",
      },
      {
        path: 'user',
        loadChildren: () => import('../user/user.module').then(m => m.UserModule),
        title: "Users page",
      },
    ]
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainLayoutRoutingModule { }
