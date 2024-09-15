import {Component, effect, inject, signal} from '@angular/core';
import {ButtonModule} from "primeng/button";
import {CardModule} from "primeng/card";
import {ProductsService} from "../services/products.service";
import {Product} from "../../../server/types";

@Component({
  selector: 'app-products',
  standalone: true,
  //signals: true,
  imports: [
    ButtonModule,
    CardModule
  ],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent {
  products = signal<Product[]>([]); // writeable signal to hold all the products

  productsService = inject(ProductsService); // inject the ProductsService

  constructor() {
    this.loadProducts().then(() =>
      console.log('constructor: ', this.products())); // load products in the constructor. alternatively can be done onInit too
  }

  public async loadProducts() {
    try {
      const loadAllProducts = await this.productsService.loadAllProducts();
      this.products.set(loadAllProducts);
    } catch (error) {
      console.error('Error loading: ', error);
    }
  }
}
