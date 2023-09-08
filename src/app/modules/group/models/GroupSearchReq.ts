
export class GroupSearchReq {
    page: number;
    pageSize: number;
    searchTerms: string | null;
    fleetId: string | null;
    modifiedOnly: boolean;
    duplicatesOnly: boolean;
    emptyOnly: boolean;

    constructor(){
        this.page = 1;
        this.pageSize = 15;
        this.searchTerms = null;
        this.modifiedOnly = false;
        this.fleetId = null;
        this.duplicatesOnly = false;
        this.emptyOnly = false;
    }
}