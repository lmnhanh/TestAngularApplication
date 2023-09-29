import { Observable } from "rxjs";
import { RequestParam } from "./RequestParam";

export interface ApiRequest {
    get<T>(path: string, params?: RequestParam): Observable<T>;
    post<TReq, TRes>(path: string, body: TReq, params?: RequestParam): Observable<TRes>;
    put<TReq, TRes>(path: string, body: TReq, params?: RequestParam): Observable<TRes>;
    delete<TReq, TRes>(path: string, body: TReq, params?: RequestParam): Observable<TRes>;
}