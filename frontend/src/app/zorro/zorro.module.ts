import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NzGridModule } from 'ng-zorro-antd/grid'


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    NzGridModule
  ],
  exports: [
    NzGridModule
  ]
})
export class ZorroModule { }
