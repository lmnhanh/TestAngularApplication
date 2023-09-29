import { Injectable } from '@angular/core';
import { PagedModel } from 'app/core/interfaces/PagedModel';
import { GroupApiRequest } from 'app/core/requests/group.request';
import { GroupSearchReq } from '../models/GroupSearchReq';
import { Observable, map, tap } from 'rxjs';
import { FleetApiRequest } from 'app/core/requests/fleet.request';
import { SelectOption } from 'app/core/interfaces/SelectOption';
import { GroupCreationInfo } from '../interfaces/GroupCreationInfo';
import { GroupCreateResp } from '../interfaces/GroupCreateResp';
import { GroupCreateReq } from '../interfaces/GroupCreateReq';
import { ResponseCallback } from 'app/core/interfaces/ResponseCallback';
import { GroupUpdateReq } from '../interfaces/GroupUpdateReq';
import { FirmwareApiRequest } from 'app/core/requests/firmware.request';
import { FirmwareSearchReq } from '../interfaces/FirmwareSearchReq';
import { AuthService } from 'app/modules/auth/services/auth.service';
import { SupportingApplicationApiRequest } from 'app/core/requests/supporting-appplication.request';
import { Feature } from 'app/shared/interfaces/Feature';
import { FirmwareRelease } from 'app/shared/interfaces/FirmwareRelease';
import { Group } from 'app/shared/interfaces/Group';
import { GroupDetail } from 'app/shared/interfaces/GroupDetail';
import { SupportingApplications } from 'app/shared/interfaces/SupportingApplication';

@Injectable({
  providedIn: 'root',
})
export class GroupService {
  constructor(
    private _groupRequest: GroupApiRequest,
    private _fleetRequest: FleetApiRequest,
    private _firmwareRequest: FirmwareApiRequest,
    private _supportAppRequest: SupportingApplicationApiRequest,
  ) {}

  searchGroup(searchParams: GroupSearchReq): Observable<PagedModel<Group>> {
    return this._groupRequest.post<GroupSearchReq, PagedModel<Group>>('search', searchParams);
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

  getGroupCreationInfo(onlyCustomizationProfile: boolean = false): Observable<GroupCreationInfo> {
    return this._groupRequest.get<GroupCreationInfo>('getGroupCreationInfo', { onlyCustomizationProfile: onlyCustomizationProfile }).pipe(
      tap((creationInfo) => {
        creationInfo.customizationProfileModels ??= [];
        creationInfo.fleets ??= [];
      }),
    );
  }

  createGroup(createBody: GroupCreateReq): Observable<GroupCreateResp> {
    return this._groupRequest.post<GroupCreateReq, GroupCreateResp>('create', createBody);
  }

  deleteGroups(groupIds: number[], callbacks: ResponseCallback<any, any>): void {
    this._groupRequest.delete('delete', { groupIds: groupIds }).subscribe({
      next: () => {
        callbacks.ifSuccessThen(null);
      },
      error: (error) => {
        callbacks.ifErrorThen && callbacks.ifErrorThen(error);
      },
    });
  }

  getDetail(groupId: number): Observable<GroupDetail> {
    return this._groupRequest.get<GroupDetail>('details', { groupId: groupId });
  }

  updateGruop(updateReq: GroupUpdateReq, callbacks: ResponseCallback<any, any>): void {
    this._groupRequest.delete('update', updateReq).subscribe({
      next: () => {
        callbacks.ifSuccessThen(null);
      },
      error: (error) => {
        callbacks.ifErrorThen && callbacks.ifErrorThen(error);
      },
    });
  }

  getFirmwareSelectOptions(params: FirmwareSearchReq): Observable<SelectOption[]> {
    AuthService.authorizationType = 'basic';
    return this._firmwareRequest.get<{ rowCount: number; firmwareReleases: FirmwareRelease[] }>('', params).pipe(
      map((res) =>
        res.firmwareReleases.map((firmware) => ({
          label: firmware.summary,
          value: firmware.id.toString(),
        })),
      ),
    );
  }

  getProgramingAppSelectOptions(firmwareId: number, programmingFileSufi: number): Observable<SelectOption[]> {
    AuthService.authorizationType = 'basic';
    return this._supportAppRequest
      .get<{ supportingApplications: SupportingApplications[] }>('ProgrammingApplications', {
        firmwareId: firmwareId,
        programmingFileSufi: programmingFileSufi,
      })
      .pipe(
        map((res) =>
          res.supportingApplications.map((firmware) => ({
            label: firmware.installerFileName,
            value: firmware.id.toString(),
          })),
        ),
      );
  }

  getCalibrationAppSelectOptions(firmwareId: number): Observable<SelectOption[]> {
    AuthService.authorizationType = 'basic';
    return this._supportAppRequest
      .get<{ supportingApplications: SupportingApplications[] }>('CalibrationApplications', { firmwareId: firmwareId })
      .pipe(
        map((res) =>
          res.supportingApplications.map((app) => ({
            label: app.installerFileName,
            value: app.id.toString(),
          })),
        ),
      );
  }

  getRequiredFeatureLicenseSelectOptions(firmwareId: number): Observable<SelectOption[]> {
    AuthService.authorizationType = 'basic';
    return this._firmwareRequest.get<Feature[]>(`${firmwareId}/supportedFeatures`).pipe(
      map((res) =>
        res.map((feature) => ({
          label: `${feature.featureId} - ${feature.description}`,
          value: feature.featureId,
        })),
      ),
    );
  }
}
