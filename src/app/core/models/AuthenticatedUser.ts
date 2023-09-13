import { StorageService } from "../storage/StorageService";

export class AuthenticatedUser {
  public storage: StorageService | null = null;

  constructor() {
    this._username = "";
    this._fullname = null;
    this._roles = [];
    this._token = null;
  }

  private _username!: string;
  private _fullname: string | null;
  private _roles: string[] = [];
  private _token: string | null;

  clear(): void{
    this._username = "";
    this._fullname = null;
    this._roles = [];
    this._token = null;
  }

  get token(): string | null {
    if (this._token == null || this._token == "") {
      this._token = this.storage?.get("token") ?? null;
    }
    return this._token;
  }

  get username(): string {
    if (this._username == "") {
      this._username = this.storage?.get("username") ?? "";
    }
    return this._username;
  }
  get fullname(): string | null {
    if (this._fullname == null) {
      this._fullname = this.storage?.get("fullname") ?? null;
    }
    return this._fullname;
  }
  get roles(): string[] {
    if (this._roles.length == 0) {
      this._roles = this.storage?.get("roles")?.split(',') ?? [];
    }
    return this._roles;
  }
}