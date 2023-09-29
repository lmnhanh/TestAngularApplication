import { RequestParam } from "app/core/interfaces/RequestParam";

export interface FirmwareSearchReq extends RequestParam{
    top: number;
    skip: number;
    searchTerms: string;
    hideObsolete: boolean;
    boardTypeId: number;
    approvedFirmwareReleaseId: number;
}