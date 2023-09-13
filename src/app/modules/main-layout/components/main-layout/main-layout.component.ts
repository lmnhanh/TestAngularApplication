import { Component } from '@angular/core';
import { AuthenticatedUser } from 'app/core/models/AuthenticatedUser';
import { AuthService } from 'app/modules/auth/services/auth.service';

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss']
})
export class MainLayoutComponent {
  user: AuthenticatedUser | null = null;
  isCollapsed: boolean = false;

  constructor(private _authService: AuthService){
    this._authService.getAuthenticatedUserObservable().subscribe(user => {
      this.user = user;
    })
  }

  logOut(){
    this._authService.logOut();
  }

}
