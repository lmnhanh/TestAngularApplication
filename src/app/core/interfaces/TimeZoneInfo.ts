export interface TimeZoneInfo {
  id: string;
  hasIanaId: boolean;
  displayName: string;
  standardName: string;
  daylightName: string;
  baseUtcOffset: string;
  supportsDaylightSavingTime: boolean;
}
