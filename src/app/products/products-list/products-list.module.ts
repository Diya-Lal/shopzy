import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {DataViewModule} from "primeng/dataview";
import {ButtonModule} from "primeng/button";
import {TagModule} from "primeng/tag";



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    DataViewModule,
    ButtonModule,
    TagModule
  ]
})
export class ProductsListModule { }
