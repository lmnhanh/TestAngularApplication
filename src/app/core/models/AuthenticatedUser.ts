import { StorageService } from "../storage/StorageService";

export class AuthenticatedUser {
  public storage: StorageService | null = null;

  constructor(stogare : StorageService | null) {
    this._name = "";
    this._email= "";
    this._roles = [];
    this._token = null;

    this.storage = stogare
  }

  private _name!: string;
  private _email: string | null;
  private _roles: string[] = [];
  private _token: string | null;

  clear(): void{
    this._name = "";
    this._email = "";
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
    if (this._name == "") {
      this._name = this.storage?.get("name") ?? "";
    }
    return this._name;
  }

  get fullname(): string | null {
    if (this._email == null) {
      this._email = this.storage?.get("email") ?? null;
    }
    return this._email;
  }

  get roles(): string[] {
    if (this._roles.length == 0) {
      this._roles = this.storage?.get("roles")?.split(',') ?? [];
    }
    return this._roles;
  }
}
