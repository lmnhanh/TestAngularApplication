import { Injectable } from '@angular/core';
import { BreadCrumItem } from 'app/shared/components/breadcrum/breadcrum.component';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BreadCrumService {
  private defaultItems: BreadCrumItem[] = [new BreadCrumItem(0, 'Home', '/')];

  private _itemsSubject = new BehaviorSubject(this.defaultItems);
  public item$ = this._itemsSubject.asObservable();

  constructor() {}

  next(item: BreadCrumItem) {
    if (item.level != -1) {
      var existItem = this.defaultItems.find((bc) => bc.level == item.level);
      if (existItem) {
        var index = this.defaultItems.indexOf(existItem);
        if(item.text != existItem.text || item.link != existItem.link){
          this.defaultItems[index] = item;
          this._itemsSubject.next([...this.defaultItems]);
        }else{
          this._itemsSubject.next(this.defaultItems.slice(0, index + 1));
        }
      } else {
        let unmanage = this.defaultItems.filter(bc => bc.level == -1);
        this.defaultItems.push(item);
        let managed = this.defaultItems.filter(bc => bc.level != -1);
        this._itemsSubject.next([...managed.sort(), ...unmanage]);
      }
      return;
    }

    this._itemsSubject.next([...this.defaultItems, item]);
  }

  back() {
    let newItems = [...this._itemsSubject.getValue()];
    newItems.pop();
    this._itemsSubject.next(newItems);
  }

  to(items: BreadCrumItem[]) {
    this._itemsSubject.next(items);
  }

  current(): BreadCrumItem[] {
    return this._itemsSubject.value;
  }
}
