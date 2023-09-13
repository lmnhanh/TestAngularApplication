import { Inject, Injectable } from "@angular/core";
import { LOCAL_STORAGE } from "./InjecttionTokens";

@Injectable({
	providedIn: "root",
})
export abstract class StorageService{
    protected storage: Storage;

	constructor(storage : Storage) {
		this.storage = localStorage;
	}

	get(key: string): string | null {
		return this.storage.getItem(key);
	}

	set(key: string, value: string): void {
		this.storage.setItem(key, value ?? "");
	}

	remove(key: string) {
		this.storage.removeItem(key);
	}

	clear() {
		this.storage.clear();
	}
}