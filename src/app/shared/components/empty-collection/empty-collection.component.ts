import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-empty-collection',
  templateUrl: './empty-collection.component.html',
  styleUrls: ['./empty-collection.component.scss']
})
export class EmptyCollectionComponent {
  @Input()
  description: string = "";
}
