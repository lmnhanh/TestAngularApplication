export interface GroupView {
    otapId : number;
    name :string;
    desiredConfigurationDesc: number | null;
    desiredConfigurationId : number | null
    desiredConfigurationVersion : string | null;
    deviceCount : number;
    deviceFormationDescription : string
    deviceFormationId : number;
    devicesWithDuplicateValues : number;
    devicesWithEmptyValues : number;
    hasChanges : boolean;
    hasGroupConfigurationError : boolean;
    latestVersionDevices : number;
    latestVersionPercent : number;
    mandatoryVersionDevices : number;
    mandatoryVersionPercent : number;
    pendingNewDevices : number;
    progressBarPercent1 : number;
    progressBarPercent2 : number;
}