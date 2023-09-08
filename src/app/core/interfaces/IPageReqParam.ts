import { IRequestParam } from "./IRequestParam";

export interface IPageReqParam extends IRequestParam{
    page: number | 1;
    pageSize: number | 0;
    searchTerms: string | "";
}