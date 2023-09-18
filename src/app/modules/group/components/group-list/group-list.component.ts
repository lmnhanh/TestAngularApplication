import { Component } from '@angular/core';
import { GroupSearchReq } from '../../models/GroupSearchReq';
import { PagedModel } from 'app/core/interfaces/PagedModel';
import { GroupView } from '../../../shared/interfaces/GroupView';
import { GroupService } from '../../services/group.service';
import { BehaviorSubject, map, tap } from 'rxjs';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { SelectOption } from 'app/core/interfaces/SelectOption';

@Component({
  selector: 'app-group-list',
  templateUrl: './group-list.component.html',
  styleUrls: ['./group-list.component.scss'],
})
export class GroupListComponent {
  listPagesizeOption: number[] = [15, 30, 50, 100];
  listFleetOption: SelectOption[] = [{ label: 'All', value: '' }];
  filterForm: FormGroup = new FormBuilder().group({
    searchTerms: new FormControl<string>(''),
    fleetId: new FormControl<string | null>(null),
    modifiedOnly: new FormControl<boolean>(false),
    duplicatesOnly: new FormControl<boolean>(false),
    emptyOnly: new FormControl<boolean>(false),
    page: new FormControl<number>(1),
    pageSize: new FormControl<number>(this.listPagesizeOption[0]),
  });

  private _filterFormSubject = new BehaviorSubject<FormGroup>(this.filterForm);
  private _filterForm$ = this._filterFormSubject.asObservable();

  listGroups: PagedModel<GroupView>;
  setOfCheckedId = new Set<number>();
  listCheckSelection = [
    {
      text: 'Select groups having no device in this page',
      onSelect: () => {
        this.listGroups.pageItemList.forEach((group) => {
          if (group.deviceCount == 0) this.setOfCheckedId.add(group.otapId);
        });
        this.refreshCheckedStatus();
      },
    },
  ];
  checked = false;
  isLoading: boolean = false;
  indeterminate = false;
  isShowFilterModal = false;
  isShowConfirmDeleteModal = false;

  constructor(private _groupService: GroupService) {
    this.listGroups = {
      pageCount: 1,
      pageItemList: [],
    };

    this._filterForm$
      .pipe(
        tap((form) => {
          if (form.controls['fleetId'].value == '') {
            form.controls['fleetId'].setValue(null);
          }
          return form;
        }),
      )
      .subscribe((searchParams) => {
        this.fetchGroup(searchParams.value);
      });

    this._groupService.getFleetSelectOptions().subscribe({
      next: (options) => {
        this.listFleetOption = [...this.listFleetOption, ...options];
      }
    })
  }

  fetchGroup(searchParams: GroupSearchReq) {
    this.isLoading = true;

    this._groupService.searchGroup(searchParams).subscribe({
      next: (group) => {
        this.listGroups = group;
        this.isLoading = false;
        this.refreshCheckedStatus();
      },
      error: () => {
        this.isLoading = false;
      },
    });
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
      this.listGroups.pageItemList.forEach((group) => this.setOfCheckedId.add(group.otapId));
    } else {
      this.setOfCheckedId.clear();
    }
    this.refreshCheckedStatus();
  }

  refreshCheckedStatus(): void {
    this.checked = this.listGroups.pageItemList.every((item) => this.setOfCheckedId.has(item.otapId));
    this.indeterminate = (this.setOfCheckedId.size != 0 || this.listGroups.pageItemList.some((item) => this.setOfCheckedId.has(item.otapId))) && !this.checked;
  }

  handlePageChange(pageNumber: number) {
    this.filterForm.controls['page'].setValue(pageNumber);
    this.startFilter();
  }

  handlePageSizeChange(pageSize: number) {
    this.filterForm.controls['pageSize'].setValue(pageSize);
    this.startFilter();
  }

  handleSearchChange(event: KeyboardEvent) {
    if (event.code == 'Enter') {
      this.filterForm.controls['page'].setValue(1);
      this.startFilter();
    }
  }

  get searchParams(): GroupSearchReq {
    return this.filterForm.value;
  }

  showFilterModal(): void {
    this.isShowFilterModal = true;
  }

  showConfirmDeleteModal(): void {
    this.isShowConfirmDeleteModal = true;
  }

  handleCancelDelete(): void {
    this.isShowConfirmDeleteModal = false;
  }

  startFilter(): void {
    this._filterFormSubject.next(this.filterForm);
  }

  deleteGroup(): void {
    this._groupService.deleteGroups(Array.from(this.setOfCheckedId), {
      ifSuccessThen: () => {
        this.fetchGroup(this.searchParams);
        this.handleCancelDelete();
        this.setOfCheckedId.clear();
      },
      ifErrorThen: (error) => {
        console.log(error);        
      }
    })
  };

  handleCancelFilter(): void {
    this.isShowFilterModal = false;
  }

  handleClearFilter(): void {
    this.filterForm.reset({
      duplicatesOnly: false,
      emptyOnly: false,
      fleetId: null,
      modifiedOnly: false,
      page: 1,
      pageSize: this.listPagesizeOption[0],
      searchTerms: '',
    });
    this.startFilter();
  }

  isAbleToDelete() : boolean {
    return this.setOfCheckedId.size != 0;
  }

  isEditable() : boolean {
    return this.setOfCheckedId.size == 1;
  }
}
