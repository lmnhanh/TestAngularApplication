import { Component } from '@angular/core';
import { GroupCreationInfo } from '../../interfaces/GroupCreationInfo';
import { GroupService } from '../../services/group.service';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { SelectOption } from 'app/core/interfaces/SelectOption';

@Component({
  selector: 'app-group-create-form',
  templateUrl: './group-create-form.component.html',
  styleUrls: ['./group-create-form.component.scss'],
})
export class GroupCreateFormComponent {
  groupCreationInfo: GroupCreationInfo = {
    deviceFormationInfo: [],
    customizationProfileModels: [],
    fleets: [],
  };
  isLoadingData: boolean = false;
  isSubmiting: boolean = false;

  deviceFormationModelOptions: SelectOption[] = [];
  deviceFormationTypeOptions: SelectOption[] = [];
  fleetOptions: SelectOption[] = [];
  customizationProfileOptions: SelectOption[] = [];

  createForm = new FormBuilder().group({
    deviceFormationId: new FormControl<string>(''),
    deviceFormationTypeId: new FormControl<string>(''),
    name: new FormControl<string>('', [Validators.required]),
    description: new FormControl<string>(''),
    fleetId: new FormControl<string>(''),
    customizationProfileId: new FormControl<string>(''),
  });

  constructor(private _groupServices: GroupService) {
    this.isLoadingData = true;
    this._groupServices.getGroupCreationInfo().subscribe({
      next: (creationInfo) => {
        this.isLoadingData = false;
        this.groupCreationInfo = creationInfo;
        this.initFormDefaultValue();
      },
      error: () => {
        this.isLoadingData = false;
      },
    });
  }

  initFormDefaultValue(){
    console.log(this.groupCreationInfo);
  
    this.deviceFormationTypeOptions = this.groupCreationInfo.deviceFormationInfo?.map((formation) => ({
      label: formation.description,
      value: formation.id.toString(),
    }));
    this.fleetOptions = this.groupCreationInfo.fleets.map(fleet => ({
      label: fleet.shortName,
      value: fleet.id
    }));
    this.customizationProfileOptions = this.groupCreationInfo.customizationProfileModels.map(profile => ({
      label: profile.name,
      value: profile.id.toString()
    }))

    this.createForm.controls['deviceFormationTypeId'].setValue(this.deviceFormationTypeOptions[0]?.value ?? '1');
    this.createForm.controls['customizationProfileId'].setValue(this.customizationProfileOptions[0]?.value ?? '1');
    this.createForm.controls['fleetId'].setValue(this.fleetOptions.find(option => option.label.toLowerCase() == 'all')!.value);
  }

  handleFormationTypeChange(formationId: number) {
    this.getDeviceFormationModel(formationId);
    this.createForm.controls['deviceFormationId'].setValue(this.deviceFormationModelOptions[0].value);
  }

  getDeviceFormationModel(formationId: number) {
    this.deviceFormationModelOptions = this.groupCreationInfo.deviceFormationInfo
      .find((formation) => formation.id == formationId)!
      .deviceFormationModels.map((formation) => ({
        label: formation.description,
        value: formation.id.toString(),
      }));
  }

  createGroup(){
    this.isSubmiting = true;
    this._groupServices.createGroup({
      deviceFormationId: Number(this.createForm.value.deviceFormationId ?? '0'),
      name: this.createForm.value.name ?? '',
      description: this.createForm.value.description ?? '',
      fleetId: this.createForm.value.fleetId ?? '',
      customizationProfileId: Number(this.createForm.value.customizationProfileId ?? '0'),
    }).subscribe({
      next: createdIds => {
        console.log(createdIds);
        this.isSubmiting = false;
      },
      error: ()=> {
        this.isSubmiting = false;
      }
    });
  }
}
