import { Observable } from "rxjs";
import { IRequestParam } from "./IRequestParam";

export interface IApiRequest {
    get<T>(path: string, params?: IRequestParam): Observable<T>;
    post<TReq, TRes>(path: string, body: TReq, params?: IRequestParam): Observable<TRes>;
}