import { Injectable } from "@angular/core";
import { UserApiRequest } from "app/core/requests/user.request";
import { UserSearchReq } from "../models/UserSearchReq";
import { User } from "../models/User";
import { Observable } from "rxjs";
import { PagedModel } from "app/core/interfaces/PagedModel";

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private _userRequest: UserApiRequest) {

  }

  searchUser(searchParams: UserSearchReq): Observable<PagedModel<User>> {
    return this._userRequest.get<PagedModel<User>>('/', searchParams);
  }
}
