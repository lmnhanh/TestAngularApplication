import { Observable } from 'rxjs';
import { ApiRequest } from '../interfaces/ApiRequest';
import { HttpClient, HttpParams } from '@angular/common/http';
import { RequestParam } from '../interfaces/RequestParam';

export abstract class BaseApiRequest implements ApiRequest {
  protected httpClient: HttpClient;
  protected baseUrl: string;

  constructor(httpClient: HttpClient, baseUrl: string) {
    this.baseUrl = baseUrl;
    this.httpClient = httpClient;
  }

  get<T>(path: string, params?: RequestParam): Observable<T> {
    return this.httpClient.get<T>(`${this.baseUrl}/${path}`, {
      params: new HttpParams({ fromObject: params }),
    });
  }

  post<TReq, TRes>(path: string, body: TReq, params?: RequestParam): Observable<TRes> {
    return this.httpClient.post<TRes>(`${this.baseUrl}/${path}`, body, {
      params: new HttpParams({ fromObject: params }),
    });
  }

  delete<TReq, TRes>(path: string, body: TReq, params?: RequestParam): Observable<TRes> {
    return this.httpClient.delete<TRes>(`${this.baseUrl}/${path}`, {
      params: new HttpParams({ fromObject: params }),
      body: body,
    });
  }
}
