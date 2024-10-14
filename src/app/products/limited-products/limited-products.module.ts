import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {LimitedProductsComponent} from "./limited-products.component";



@NgModule({
  declarations: [LimitedProductsComponent],
  exports: [
    LimitedProductsComponent
  ],
  imports: [
    CommonModule
  ]
})
export class LimitedProductsModule { }
