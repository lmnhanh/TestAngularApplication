import { Ordinal } from "app/shared/interfaces/Ordinal";

export interface GroupUpdateReq {
  groupId: number;
  name: string;
  description: string;
  fleetId: string;
  draftConfigurationId: number;
  draftConfigurationDescription: string;
  draftConfigurationIsMandatory: boolean;
  draftCustomizationProfileId: number;
  draftFirmwareReleaseId?: number;
  draftProgrammingFileSufi?: number;
  draftProgrammingFileSufis: Ordinal[];
  draftProgrammingApplicationId?: number;
  draftCalibrationApplicationId?: number;
  draftDeviceApplicationVersionId?: number;
  draftRequiredFeatureIds: string[];
  draftSelectedDeviceApplicationVersions: number[];
  draftDeviceProgrammingFileId?: number;
}
