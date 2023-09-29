export interface FirmwareRelease {
  id: number;
  version: string;
  packageFileName: string;
  obsolete: boolean;
  otapSupportLevelId: number;
  boardTypeId: number;
  tierName: string;
  programmingDatabaseVersion: number;
  calibrationDatabaseVersion: number;
  otapSupportLevelDescription: string;
  summary: string;
  hasGeneratedBootCodeFix: boolean;
  isBootCodeSafe: boolean;
}
