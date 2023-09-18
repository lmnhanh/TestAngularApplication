import { Injectable } from '@angular/core';
import { PagedModel } from 'app/core/interfaces/PagedModel';
import { GroupApiRequest } from 'app/core/requests/group.request';
import { GroupView } from '../../shared/interfaces/GroupView';
import { GroupSearchReq } from '../models/GroupSearchReq';
import { Observable, map, tap } from 'rxjs';
import { FleetApiRequest } from 'app/core/requests/fleet.request';
import { SelectOption } from 'app/core/interfaces/SelectOption';
import { GroupCreationInfo } from '../interfaces/GroupCreationInfo';
import { GroupCreateResp } from '../interfaces/GroupCreateResp';
import { GroupCreateReq } from '../interfaces/GroupCreateReq';
import { ResponseCallback } from 'app/core/interfaces/ResponseCallback';

@Injectable({
  providedIn: 'root',
})
export class GroupService {
  constructor(private _groupRequest: GroupApiRequest, private _fleetRequest: FleetApiRequest) {}

  searchGroup(searchParams: GroupSearchReq): Observable<PagedModel<GroupView>> {
    return this._groupRequest.post<GroupSearchReq, PagedModel<GroupView>>('search', searchParams);
  }

  getFleetSelectOptions(): Observable<SelectOption[]> {
    return this._fleetRequest.get<{ id: string; shortName: string }[]>('fleets').pipe(
      map((fleets) =>
        fleets.map((fleet) => ({
          label: fleet.shortName,
          value: fleet.id,
        })),
      ),
    );
  }

  getGroupCreationInfo(): Observable<GroupCreationInfo> {
    return this._groupRequest.get<GroupCreationInfo>('getGroupCreationInfo', { onlyCustomizationProfile: false }).pipe(
      tap((creationInfo) => {
        creationInfo.customizationProfileModels ??= [];
        creationInfo.fleets ??= [];
      }),
    );
  }

  createGroup(createBody: GroupCreateReq): Observable<GroupCreateResp> {
    return this._groupRequest.post<GroupCreateReq, GroupCreateResp>('create', createBody);
  }

  deleteGroups(groupIds: number[], callbacks : ResponseCallback<any, any>): void {
    this._groupRequest.delete('delete', { groupIds: groupIds}).subscribe({
      next: () => {
        callbacks.ifSuccessThen(null);
      },
      error: (error) => {
        callbacks.ifErrorThen && callbacks.ifErrorThen(error);
      }
    })
  }
}
