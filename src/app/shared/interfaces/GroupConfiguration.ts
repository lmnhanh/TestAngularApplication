import { GroupConfigurationError } from "./GroupGeneratingErrorType";
import { DeploymentState } from "./DeploymentState";
import { FirmwareSummary } from "./FirmwareSummary";
import { ProgrammingFile } from "./ProgrammingFile";
import { Feature } from "./Feature";
import { SupportingApplicationSummary } from "./SupportingApplicationSummary";
import { CustomizationProfileModel } from "./CustomizationProfileModel";

export interface GroupConfiguration {
  id: number;
  version: number;
  groupOtapId: number;
  description: string;
  isMandatory: boolean;
  deploymentState: DeploymentState
  activationDate: Date | null;
  groupConfigurationErrorType: GroupConfigurationError;
  rowVersion: number[];
  firmware: FirmwareSummary;
  programmingFiles: ProgrammingFile[];
  deviceProgrammingFile: ProgrammingFile | null;
  selectedFeatures: Feature[];
  programmingApplication: SupportingApplicationSummary;
  calibrationApplication: SupportingApplicationSummary;
  customizationProfile: CustomizationProfileModel;
  deviceApplicationVersion: CustomizationProfileModel;
  selectedDeviceApplicationVersions: number[];
}
