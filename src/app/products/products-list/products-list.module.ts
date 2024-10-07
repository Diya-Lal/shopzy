import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {DataViewModule} from "primeng/dataview";
import {ButtonModule} from "primeng/button";
import {TagModule} from "primeng/tag";
import {BrowserAnimationsModule, NoopAnimationsModule} from "@angular/platform-browser/animations";
import {MessagesModule} from "primeng/messages";



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    DataViewModule,
    ButtonModule,
    TagModule,
    MessagesModule,
    BrowserAnimationsModule,
    NoopAnimationsModule
  ]
})
export class ProductsListModule { }
