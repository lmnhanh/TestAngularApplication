import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseApiRequest } from './base.request';

@Injectable({
  providedIn: 'root',
})
export class SupportingApplicationApiRequest extends BaseApiRequest {
  constructor(httpClient: HttpClient) {
    super(httpClient, 'https://localhost:44329/api/v2/SupportingApplications');
  }
}
