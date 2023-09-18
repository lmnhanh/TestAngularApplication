import { RequestParam } from "./RequestParam";

export interface PageReqParam extends RequestParam{
    page: number | 1;
    pageSize: number | 0;
    searchTerms: string | "";
}