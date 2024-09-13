import { Component } from '@angular/core';
import {ButtonModule} from "primeng/button";
import {CardModule} from "primeng/card";

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [
    ButtonModule,
    CardModule
  ],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent {


}
