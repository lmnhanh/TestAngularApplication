import { inject } from '@angular/core';
import { ResolveFn, Router } from '@angular/router';
import { GroupService } from 'app/modules/group/services/group.service';
import { GroupDetail } from 'app/shared/interfaces/GroupDetail';
import { EMPTY, mergeMap, of } from 'rxjs';

export const groupResolver: ResolveFn<GroupDetail> = (route, state) => {
  const groupService = inject(GroupService);
  const router = inject (Router);
  let id = Number(route.paramMap.get('id'));

  return groupService.getDetail(id).pipe(mergeMap(crisis => {
    if (crisis) {
      return of(crisis);
    } else {  // id not found
      router.navigate(['/crisis-center']);
      return EMPTY;
    }
  }));
};
