import { Component } from '@angular/core';
import {DataViewModule} from "primeng/dataview";
import {ProductsService} from "../products.service";
import {CommonModule} from "@angular/common";
import {ButtonModule} from "primeng/button";
import {Product} from "./Product";
import {TagModule} from "primeng/tag";
import {OfferPreviewComponent} from "../offer-preview/offer-preview.component";

@Component({
  selector: 'app-products-list',
  standalone: true,
  imports: [DataViewModule, CommonModule, ButtonModule, TagModule, OfferPreviewComponent],
  templateUrl: './products-list.component.html',
  styleUrl: './products-list.component.scss'
})
export class ProductsListComponent {

  public products: any[] = [];
  constructor(private productsService: ProductsService) {

  }

  public ngOnInit() {
    this.productsService.getProducts().subscribe(products => {
      console.log(products);
      this.products = products;
    });
  }
  public getSeverity (product: Product) {
    switch (product.inventoryStatus) {
      case 'INSTOCK':
        return 'success';

      case 'LOWSTOCK':
        return 'warning';

      case 'OUTOFSTOCK':
        return 'danger';

      default:
        return undefined;
    }
  };
}
