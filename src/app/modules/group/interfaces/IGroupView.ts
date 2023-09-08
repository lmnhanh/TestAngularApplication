export interface IGroupView {
    groupId: string,
    name: string,
    deviceFormationId: number,
    deviceFormation: string,
    approvedConfigurationId: number,
    deviceCount: number,
    pendingNewDevices: number,
    devicesWithDuplicateValues: number,
    devicesWithEmptyValues: number,
    latestVersionPercent: number,
    mandatoryVersionPercent: number,
    hasChanges: boolean
}