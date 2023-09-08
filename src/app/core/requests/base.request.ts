import { Observable } from "rxjs";
import { IApiRequest } from "../interfaces/IApiRequest";
import { HttpClient, HttpParams } from "@angular/common/http";
import { IRequestParam } from "../interfaces/IRequestParam";

export abstract class BaseApiRequest implements IApiRequest {
    protected httpClient: HttpClient;
    protected baseUrl: string;

    constructor(httpClient: HttpClient, baseUrl: string) {
        this.baseUrl = baseUrl;
        this.httpClient = httpClient;
    }

    get<T>(path: string, params?: IRequestParam): Observable<T> {
        return this.httpClient.get<T>(`${this.baseUrl}/${path}`, {params : new HttpParams({ fromObject: params })});
    }

    post<TReq, TRes>(path: string, body: TReq, params?: IRequestParam): Observable<TRes> {
        return this.httpClient.post<TRes>(`${this.baseUrl}/${path}`, body, {params: new HttpParams({ fromObject: params })});
    }
}