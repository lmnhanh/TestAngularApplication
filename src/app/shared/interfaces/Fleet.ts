export interface Fleet {
    id: string;
    shortName : string;
    fullName : string;
    sortOrder : number;
    ParentFleet : string;
    IsDeleted: boolean;
}