import { DeviceApplicationComponent } from "./DeviceApplicationComponent";

export interface DeviceApplicationVersionDetailed{
    version: string;
    metaVersion: string;
    components: DeviceApplicationComponent[]
}