import { AfterContentInit, AfterViewChecked, ChangeDetectionStrategy, Component } from '@angular/core';
import { AuthenticatedUser } from 'app/core/models/AuthenticatedUser';
import { AuthService } from 'app/modules/auth/services/auth.service';
import { BreadCrumService } from '../../services/BreadCrumService';
import { BreadCrumItem } from 'app/shared/components/breadcrum/breadcrum.component';
import { UseBreadCrum } from './../../../../shared/interfaces/UseBreadCrum';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss']
})
export class MainLayoutComponent implements AfterContentInit  {
  user: AuthenticatedUser | null = null;
  isCollapsed: boolean = false;
  breadCrums: BreadCrumItem[] = [];

  constructor(private _authService: AuthService, private _breadCrumService: BreadCrumService){
    this._authService.getAuthenticatedUserObservable().subscribe(user => {
      this.user = user;
      console.log(user);
    })

    this._breadCrumService.item$.subscribe(newBreadCrums => {
      this.breadCrums = newBreadCrums;
    })
  }
  ngAfterContentInit (): void {
    this.breadCrums = this._breadCrumService.current();
  }

  logOut(){
    this._authService.logOut();
  }
}
