import { CustomizationProfileModel } from "app/modules/shared/interfaces/CustomizationProfileModel";
import { DeviceFormationInfo } from "app/modules/shared/interfaces/DeviceFormationInfo";
import { FleetView } from "app/modules/shared/interfaces/FleetView";

export interface GroupCreationInfo {
    deviceFormationInfo : DeviceFormationInfo[];
    customizationProfileModels: CustomizationProfileModel[];
    fleets: FleetView[];
}