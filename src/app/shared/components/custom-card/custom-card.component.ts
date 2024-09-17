import { AfterContentInit, AfterViewInit, Component, ContentChild, ContentChildren, ElementRef, Input, QueryList, TemplateRef } from '@angular/core';
import { HightlightHoverDirective } from 'app/shared/directives/hightlight-hover.directive';

@Component({
  standalone: true,
  selector: 'app-custom-card',
  templateUrl: './custom-card.component.html',
  styleUrls: ['./custom-card.component.scss'],
})
export class CustomCardComponent implements AfterContentInit{

  @Input('title')
  title: string = 'Card title';

  @ContentChildren(HightlightHoverDirective)
  cardContent!: QueryList<HightlightHoverDirective>

  constructor(){
  }

  ngAfterContentInit(): void {
    this.cardContent.forEach(x => x.addClass('text-green-600'));
  }
}
