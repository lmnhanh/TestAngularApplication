import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookListComponent } from './components/book-list/book-list.component';
import { BookRoutingModule } from './book-routing.module';
import {
  CdkDrag,
  CdkDropList,
  CdkDragPlaceholder
} from '@angular/cdk/drag-drop';

@NgModule({
  declarations: [
    BookListComponent
  ],
  imports: [
    CommonModule,
    CdkDropList,
    CdkDrag,
    CdkDragPlaceholder,
    BookRoutingModule
  ]
})
export class BookModule { }
