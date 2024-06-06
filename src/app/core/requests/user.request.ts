import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { BaseApiRequest } from "./base.request";

@Injectable({
    providedIn: "root",
})
export class UserApiRequest extends BaseApiRequest{
    constructor(httpClient: HttpClient){
        super(httpClient, 'https://localhost:7216/api/v1/users');
    }
}
