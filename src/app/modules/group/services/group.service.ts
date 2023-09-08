import { Injectable, OnInit } from "@angular/core";
import { IPagedModel } from "app/core/interfaces/IPagedModel";
import { GroupApiRequest } from "app/core/requests/group.request";
import { IGroupView } from "../interfaces/IGroupView";
import { GroupSearchReq } from "../models/GroupSearchReq";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class GroupService {
  constructor(private groupRequest: GroupApiRequest) {
  }

  searchGroup(searchParams: GroupSearchReq): Observable<IPagedModel<IGroupView>> {
    return this.groupRequest.post<GroupSearchReq, IPagedModel<IGroupView>>('api/dt/Groups/search', searchParams)
  }
}