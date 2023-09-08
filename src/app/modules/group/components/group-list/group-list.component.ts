import { Component } from '@angular/core';
import { GroupSearchReq } from '../../models/GroupSearchReq';
import { IPagedModel } from 'app/core/interfaces/IPagedModel';
import { IGroupView } from '../../interfaces/IGroupView';
import { GroupService } from '../../services/group.service';

@Component({
  selector: 'app-group-list',
  templateUrl: './group-list.component.html',
  styleUrls: ['./group-list.component.scss']
})
export class GroupListComponent {
  listGroups: IPagedModel<IGroupView>;

  constructor(private groupService: GroupService) {
    this.listGroups = {
      pageCount: 1,
      pageItemList: []
    };
  }

  fetchGroup() {
    let params = new GroupSearchReq(); 

    this.groupService.searchGroup(params).subscribe({
      next: (group) => {
        this.listGroups = group;
        console.log(group);
      }
    })
  }
}
