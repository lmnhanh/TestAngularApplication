import { RequestParam } from "app/core/interfaces/RequestParam";

export class UserSearchReq implements RequestParam {
  [param: string]: string | number | boolean;

  public searchString: string;
  public role: string;
  public limit: number;
  public page: number;

  constructor() {
    this.searchString = "";
    this.role = ""
    this.limit = 20;
    this.page = 1;
  }
}
