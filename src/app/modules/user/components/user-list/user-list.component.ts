import { AfterViewInit, Component } from '@angular/core';
import { UserService } from '../../services/user.service';
import { UseBreadCrum } from 'app/shared/interfaces/UseBreadCrum';
import { BreadCrumService } from 'app/modules/main-layout/services/BreadCrumService';
import { BreadCrumItem } from 'app/shared/components/breadcrum/breadcrum.component';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
})
export class UserListComponent implements AfterViewInit {
  constructor(private _userSerivce: UserService, private _breadCrum: BreadCrumService) {
  }

  ngAfterViewInit(): void {
    this._breadCrum.next(new BreadCrumItem(1, "Users", "/user"))
  }
}
