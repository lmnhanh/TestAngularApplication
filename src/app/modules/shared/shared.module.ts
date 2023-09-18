import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NzButtonModule } from "ng-zorro-antd/button";
import { NzDividerModule } from "ng-zorro-antd/divider";
import { NzIconModule } from "ng-zorro-antd/icon";
import { NzLayoutModule } from "ng-zorro-antd/layout";
import { NzMenuModule } from "ng-zorro-antd/menu";
import { NzTableModule } from "ng-zorro-antd/table";
import { NzBadgeModule } from 'ng-zorro-antd/badge';
import { NzProgressModule } from 'ng-zorro-antd/progress';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzDropDownModule } from "ng-zorro-antd/dropdown";
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzSelectModule } from 'ng-zorro-antd/select';

@NgModule({
    exports: [
        FormsModule,
        CommonModule,
        HttpClientModule,
        NzIconModule,
        NzLayoutModule,
        NzMenuModule,
        NzButtonModule,
        NzDividerModule,
        NzTableModule,
        NzBadgeModule,
        NzProgressModule,
        NzToolTipModule,
        NzInputModule,
        NzCardModule,
        NzFormModule,
        ReactiveFormsModule,
        NzDropDownModule,
        NzModalModule,
        NzCheckboxModule,
        NzSelectModule
    ],
    declarations: [
    ],
})
export class SharedModule { }
