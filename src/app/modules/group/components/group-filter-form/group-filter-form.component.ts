import { Component, EventEmitter, Input, Output } from '@angular/core';
import { GroupSearchReq } from '../../models/GroupSearchReq';

@Component({
  selector: 'app-group-filter-form',
  templateUrl: './group-filter-form.component.html',
  styleUrls: ['./group-filter-form.component.scss']
})
export class GroupFilterFormComponent {
  @Input()
  isVisible = false;

  constructor() {}
  @Input()
  showModal(): void {
    this.isVisible = true;
  }

  @Input()
  handleOk(): void {
    console.log('Button ok clicked!');
    this.isVisible = false;
  }

  @Input()
  handleCancel(): void {
    console.log('Button cancel clicked!');
    this.isVisible = false;
  }
}
