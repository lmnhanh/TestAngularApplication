import { NgModule } from '@angular/core';
import { MainLayoutComponent } from './components/main-layout/main-layout.component';
import { MainLayoutRoutingModule } from './main-layout-routing.module';
import { SharedModule } from 'app/shared/shared.module';
import { BookModule } from '../book/book.module';



@NgModule({
  declarations: [
    MainLayoutComponent,
  ],
  imports: [
    SharedModule,
    MainLayoutRoutingModule
  ],
  bootstrap: [MainLayoutComponent]
})
export class MainLayoutModule { }
