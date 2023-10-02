import { TimeZoneInfo } from "app/core/interfaces/TimeZoneInfo";
import { GroupConfiguration } from "./GroupConfiguration";
import { GroupConfigurationError } from "./GroupGeneratingErrorType";

export interface GroupDetail {
  otapId: number;
  name: string;
  description: string;
  fleetId: string;
  fleetName: string;
  boardTypeId: number;
  boardTypeDescription: string;
  rowVersion: string;
  changedDeviceCount: number;
  approvedDeviceCount: number;
  pendingDeviceCount: number;
  devicesWithDuplicateValues: number;
  devicesWithEmptyValues: number;
  devicesInProgressCount: number;
  readyForOtapDevicesCount: number;
  otapInProgressDeviceCount: number;
  totalDeviceCount: number;
  latestVersionDeviceCount: number;
  mandatoryVersionDeviceCount: number;
  outOfDateDeviceCount: number;
  latestVersionPercent: number;
  mandatoryVersionPercent: number;
  progressBarPercent1: number;
  progressBarPercent2: number;
  configFileChanged: boolean;
  programmingApplicationChanged: boolean;
  calibrationApplicationChanged: boolean;
  firmwareReleaseChanged: boolean;
  approvedFirmwareReleaseId?: number;
  featureLicenseKeySetChanged: boolean;
  deviceProgrammingFileChanged: boolean;
  requiredDeviceApplicationChanged: boolean;
  optionalDeviceApplicationsChanged: boolean;
  customizationProfileChanged: boolean;
  hasPendingGroupConfigChanges: boolean;
  requiredDeviceApplicationName: any;
  availableOptionalDeviceApplications: any[];
  groupHasPendingChanges: boolean;
  reportingTimeZone: TimeZoneInfo;
  selectedTab: number;
  deviceFormationId: number;
  deviceFormationDescription: string;
  deviceFormationTypeDescription: string;
  draftConfiguration: GroupConfiguration;
  desiredConfiguration: GroupConfiguration;
  configurationHistory: GroupConfiguration[];
  individualManfestIds: number[];
  configurationGroupGeneratingErrorType: GroupConfigurationError | null;
  activationUrl: string;
  hasActivationUrl: boolean;
}