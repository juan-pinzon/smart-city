import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    NzGridModule,
    NzSelectModule,
    NzFormModule,
    NzDatePickerModule
  ],
  exports: [
    NzGridModule,
    NzSelectModule,
    NzFormModule,
    NzDatePickerModule
  ]
})
export class ZorroModule { }
