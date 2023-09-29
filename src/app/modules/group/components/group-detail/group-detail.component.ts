import { Component } from '@angular/core';
import { GroupDetail } from 'app/shared/interfaces/GroupDetail';
import { GroupService } from '../../services/group.service';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { SelectOption } from 'app/core/interfaces/SelectOption';

@Component({
  selector: 'app-group-detail',
  templateUrl: './group-detail.component.html',
  styleUrls: ['./group-detail.component.scss'],
})
export class GroupDetailComponent {
  groupDetailed: GroupDetail | null = null;
  listFleetOption: SelectOption[] = [{ label: 'All', value: '' }];
  customizationProfileOption: SelectOption[] = [];
  firmwareOption: SelectOption[] = [{ label: '--Select Firmware Package--', value: '0' }];
  programmingApplicationOption: SelectOption[] = [];
  calibrationApplicationOption: SelectOption[] = [];
  requiredFeatureLicenseOption: SelectOption[] = [];

  isUpdating = false;

  updateForm = new FormBuilder().group({
    name: new FormControl<string>('', [Validators.required]),
    groupId: new FormControl<number>(0),
    description: new FormControl<string>(''),
    fleetId: new FormControl<string>(''),
    draftConfigurationDescription: new FormControl<string>(''),
    draftCustomizationProfileId: new FormControl<string>('0'),
    draftFirmwareReleaseId: new FormControl<string>('0'),
    draftConfigurationIsMandatory: new FormControl<boolean>(false),
    draftProgrammingApplicationId: new FormControl<string>('0'),
    draftCalibrationApplicationId: new FormControl<string>('0'),
    draftRequiredFeatureIds: new FormControl<string[]>([]),
  });

  constructor(private _groupService: GroupService, private _activatedRoute: ActivatedRoute) {
    let groupId = this._activatedRoute.snapshot.params['id'];

    this._groupService.getDetail(groupId).subscribe({
      next: (groupDetail) => {
        this.groupDetailed = groupDetail;
        this.assignExistValueToForm();
        this.fetchFirmwareRelease();
        if (groupDetail.approvedFirmwareReleaseId != null) {
          this.fetchCalibrationApplications(groupDetail.approvedFirmwareReleaseId);
          this.fetchProgramingApplications(
            groupDetail.approvedFirmwareReleaseId,
            groupDetail.draftConfiguration.programmingFiles[0]?.programmingFileSUFI ?? 0,
          );
          this.fetchSupportedFeatureLicenseKeys();
        }
        console.log(this.groupDetailed);
      },
      error: (error) => {
        console.log(error);
      },
    });

    this._groupService.getFleetSelectOptions().subscribe({
      next: (fleetOptions) => {
        this.listFleetOption = [...this.listFleetOption, ...fleetOptions];
      },
      error: (error) => {
        console.log(error);
      },
    });

    this._groupService.getGroupCreationInfo(true).subscribe({
      next: (creationInfo) => {
        this.customizationProfileOption = creationInfo.customizationProfileModels.map((profile) => ({
          label: profile.name,
          value: profile.id.toString(),
        }));
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  fetchFirmwareRelease() {
    this._groupService
      .getFirmwareSelectOptions({
        top: 1000,
        skip: 0,
        searchTerms: '',
        boardTypeId: this.groupDetailed?.boardTypeId ?? 0,
        hideObsolete: true,
        approvedFirmwareReleaseId: this.groupDetailed?.approvedFirmwareReleaseId ?? 0,
      })
      .subscribe({
        next: (options) => {
          this.firmwareOption = [...this.firmwareOption, ...options];
        },
        error: (error) => {
          console.log(error);
        },
      });
  }

  fetchCalibrationApplications(firmwareId: number) {
    this._groupService.getCalibrationAppSelectOptions(firmwareId).subscribe({
      next: (options) => {
        this.calibrationApplicationOption = [{ label: '--Select Supporting Package--', value: '0' }, ...options];
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  fetchSupportedFeatureLicenseKeys() {
    this._groupService.getRequiredFeatureLicenseSelectOptions(this.groupDetailed?.approvedFirmwareReleaseId ?? 0).subscribe({
      next: (options) => {
        this.requiredFeatureLicenseOption = options;
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  fetchProgramingApplications(firmwareId: number, programmingFileSufi: number) {
    this._groupService.getProgramingAppSelectOptions(firmwareId, programmingFileSufi).subscribe({
      next: (options) => {
        this.programmingApplicationOption = [{ label: '--Select Supporting Package--', value: '0' }, ...options];
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  handleFirmwareChange(firmwareId: number) {
    this.calibrationApplicationOption = [{ label: '--Select Supporting Package--', value: '0' }];
    this.programmingApplicationOption = [{ label: '--Select Supporting Package--', value: '0' }];

    if (firmwareId == 0) {
      this.updateForm.controls['draftCalibrationApplicationId'].setValue('0');
      this.updateForm.controls['draftProgrammingApplicationId'].setValue('0');
      return;
    }
    this.fetchCalibrationApplications(firmwareId);
    this.fetchProgramingApplications(firmwareId, this.groupDetailed?.draftConfiguration.programmingFiles[0]?.programmingFileSUFI ?? 0);
  }

  assignExistValueToForm() {
    this.updateForm.controls['groupId'].setValue(this.groupDetailed?.otapId ?? 0);
    this.updateForm.controls['name'].setValue(this.groupDetailed?.name ?? '');
    this.updateForm.controls['description'].setValue(this.groupDetailed?.description ?? '');
    this.updateForm.controls['draftConfigurationDescription'].setValue(this.groupDetailed?.draftConfiguration.description ?? '');
    this.updateForm.controls['draftFirmwareReleaseId'].setValue(this.groupDetailed?.draftConfiguration?.firmware?.id.toString() ?? '0');
    this.updateForm.controls['draftRequiredFeatureIds'].setValue(
      this.groupDetailed?.draftConfiguration?.selectedFeatures?.map((feature) => feature.featureId) ?? [],
    );
    this.updateForm.controls['draftProgrammingApplicationId'].setValue(
      this.groupDetailed?.draftConfiguration?.programmingApplication?.id.toString() ?? '0',
    );
    this.updateForm.controls['draftCalibrationApplicationId'].setValue(
      this.groupDetailed?.draftConfiguration?.calibrationApplication?.id.toString() ?? '0',
    );
    this.updateForm.controls['draftCustomizationProfileId'].setValue(
      this.groupDetailed?.draftConfiguration.customizationProfile.id.toString() ?? '0',
    );
  }

  updateGroup(): void {
    console.log(this.updateForm.dirty);
  }

  get form() {
    return this.updateForm.getRawValue();
  }
}
