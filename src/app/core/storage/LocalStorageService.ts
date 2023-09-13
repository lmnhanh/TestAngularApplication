import { Inject, Injectable } from "@angular/core";
import { LOCAL_STORAGE } from "./InjecttionTokens";
import { StorageService } from "./StorageService";

@Injectable({
	providedIn: "root",
})
export class LocalStorageService extends StorageService {

	constructor(@Inject(LOCAL_STORAGE) storage: Storage) {
		super(storage);
	}
}