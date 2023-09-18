import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { BaseApiRequest } from "./base.request";

@Injectable({
    providedIn: "root",
})
export class AuthApiRequest extends BaseApiRequest{
    constructor(httpClient: HttpClient){
        super(httpClient, 'https://localhost:44329/api/dt/user');
    }
}