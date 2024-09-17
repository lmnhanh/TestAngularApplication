import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookListComponent } from './components/book-list/book-list.component';
import { BookRoutingModule } from './book-routing.module';
import {
  CdkDrag,
  CdkDropList,
  CdkDragPlaceholder
} from '@angular/cdk/drag-drop';
import { HightlightHoverDirective } from '../../shared/directives/hightlight-hover.directive';
import { TemplateHoverDirective } from 'app/shared/directives/template-hover.directive';
import { CustomCardComponent } from 'app/shared/components/custom-card/custom-card.component';

@NgModule({
  declarations: [
    BookListComponent
  ],
  imports: [
    CommonModule,
    CdkDropList,
    CdkDrag,
    CdkDragPlaceholder,
    BookRoutingModule,
    HightlightHoverDirective,
    TemplateHoverDirective,
    CustomCardComponent
  ]
})
export class BookModule { }
