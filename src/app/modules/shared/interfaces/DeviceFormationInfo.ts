import { DeviceFormationModel } from "./DeviceFormationModel";

export interface DeviceFormationInfo {
  description: string;
  id: number;
  deviceFormationModels: DeviceFormationModel[];
}
