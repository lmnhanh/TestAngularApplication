import { Component } from '@angular/core';
import { GroupSearchReq } from '../../models/GroupSearchReq';
import { IPagedModel } from 'app/core/interfaces/IPagedModel';
import { IGroupView } from '../../interfaces/IGroupView';
import { GroupService } from '../../services/group.service';
import { BehaviorSubject } from 'rxjs';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-group-list',
  templateUrl: './group-list.component.html',
  styleUrls: ['./group-list.component.scss']
})
export class GroupListComponent {
  private _searchParamsSubject = new BehaviorSubject<GroupSearchReq>(new GroupSearchReq());
  private _searchParams$ = this._searchParamsSubject.asObservable();

  listGroups: IPagedModel<IGroupView>;
  isLoading: boolean = false;
  setOfCheckedId = new Set<number>();
  listPagesizeOption: number[] = [15, 30, 50, 100];
  listOfSelection = [
    {
      text: 'Select groups having no device in this page',
      onSelect: () => {
        this.listGroups.pageItemList.forEach(group => {
          if (group.deviceCount == 0) this.setOfCheckedId.add(group.otapId)
        });
        this.refreshCheckedStatus();
      }
    }
  ];
  checked = false;
  indeterminate = false;
  filterForm: FormGroup;

  constructor(private groupService: GroupService) {
    this.listGroups = {
      pageCount: 1,
      pageItemList: []
    };

    this.filterForm = new FormBuilder().group({
      searchTerms: [""],
    });

    this._searchParams$.subscribe(searchParams => {
      this.fetchGroup(searchParams);
    })
  }

  fetchGroup(searchParams: GroupSearchReq) {
    this.isLoading = true;
    this.groupService.searchGroup(searchParams).subscribe({
      next: (group) => {
        this.listGroups = group;
        this.isLoading = false;
      },
      error: () => {
        this.isLoading = false;
      }
    })
  }

  onItemChecked(optapId: number, isChecked: boolean) {
    if (isChecked) {
      this.setOfCheckedId.add(optapId);
    } else {
      this.setOfCheckedId.delete(optapId);
    }
    this.refreshCheckedStatus();
  }

  onAllChecked(isChecked: boolean) {
    if (isChecked) {
      this.listGroups.pageItemList.forEach(group => this.setOfCheckedId.add(group.otapId));
    } else {
      this.setOfCheckedId.clear();
    }
    this.refreshCheckedStatus();
  }

  refreshCheckedStatus(): void {
    this.checked = this.listGroups.pageItemList.every(item => this.setOfCheckedId.has(item.otapId));
    this.indeterminate = this.listGroups.pageItemList.some(item => this.setOfCheckedId.has(item.otapId)) && !this.checked;
  }

  handlePageChange(pageNumber: number) {
    let currentParams = this.searchParams;
    currentParams.page = pageNumber;
    this._searchParamsSubject.next(currentParams);
  }

  handlePageSizeChange(pageSize: number) {
    let currentParams = this.searchParams;
    currentParams.pageSize = pageSize;
    currentParams.page = 1;
    this._searchParamsSubject.next(currentParams);
  }

  handleSearchChange(event: KeyboardEvent) {
    if (event.code == "Enter") {
      let currentParams = this.searchParams;
      currentParams.searchTerms = this.filterForm.controls["searchTerms"].value;
      currentParams.page = 1;
      this._searchParamsSubject.next(currentParams)
    }
  }

  resetSearchString() {
    let currentParams = this.searchParams;
    currentParams.searchTerms = "";
    currentParams.page = 1;
    this._searchParamsSubject.next(currentParams);
  }

  get searchParams(): GroupSearchReq {
    return this._searchParamsSubject.value;
  }

  get filterControl() {
    return this.filterForm.controls;
  }
}
