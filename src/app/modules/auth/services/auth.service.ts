import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { DEFAULT_BASIC_TOKEN } from 'app/core/const/defaultBasicToken';
import { AuthenticatedUser } from 'app/core/models/AuthenticatedUser';
import { AuthApiRequest } from 'app/core/requests/auth.request';
import { LocalStorageService } from 'app/core/storage/LocalStorageService';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

interface ILoginRequest {
  username: string;
  password: string;
}

interface IAuthenticateResponse {
  userName: string;
  fullname: string;
  roles: string[];
  token: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private _authUser = new AuthenticatedUser();
  private _userSubject = new BehaviorSubject<AuthenticatedUser>(this._authUser);
  private _user$ = this._userSubject.asObservable();

  static authorizationType: 'bearer' | 'basic' = 'bearer';

  constructor(private storage: LocalStorageService, private authRequest: AuthApiRequest, private _router: Router) {
    this._authUser.storage = this.storage;
  }

  logIn(request: ILoginRequest, ifSuccess: () => void): void {
    this.authRequest.post<ILoginRequest, IAuthenticateResponse>('login', request).subscribe({
      next: (userInfo) => {
        this.storeUserToken(userInfo.token);
        this.saveToStorage('username', userInfo.userName);
        this.saveToStorage('fullname', userInfo.fullname);
        this.saveToStorage('roles', userInfo.roles.join(','));
        ifSuccess();
      },
    });
  }

  getAuthenticatedUserObservable(): Observable<AuthenticatedUser> {
    return this._user$;
  }

  setAuthenticatedUser(user: AuthenticatedUser): void {
    this._userSubject.next(user);
  }

  saveToStorage(key: string, value: string) {
    this.storage.set(key, value);
  }

  storeUserToken(value: string): void {
    this.saveToStorage('token', value);
  }

  getUserToken(): string | null {
    return AuthService.authorizationType == 'bearer' ? this._authUser.token : DEFAULT_BASIC_TOKEN;
  }

  logOut(): void {
    this._authUser.clear();
    this._userSubject.next(new AuthenticatedUser());
    this._authUser.storage?.clear();
    this._router.navigate(['auth', 'login'], { replaceUrl: true });
  }

  isLoggedIn(): boolean {
    let token = this.getUserToken();
    return token != '' && token != null;
  }
}
