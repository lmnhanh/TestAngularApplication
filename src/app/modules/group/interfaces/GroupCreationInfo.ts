import { CustomizationProfileModel } from 'app/shared/interfaces/CustomizationProfileModel';
import { DeviceFormationInfo } from 'app/shared/interfaces/DeviceFormationInfo';
import { Fleet } from 'app/shared/interfaces/Fleet';

export interface GroupCreationInfo {
  deviceFormationInfo: DeviceFormationInfo[];
  customizationProfileModels: CustomizationProfileModel[];
  fleets: Fleet[];
}
