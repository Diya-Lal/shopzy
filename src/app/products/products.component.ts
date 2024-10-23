import {Component, computed, effect, inject, signal} from '@angular/core';
import {ButtonModule} from "primeng/button";
import {CardModule} from "primeng/card";
import {ProductsService} from "../services/products.service";
import {Product} from "../models/product.model";
import {DialogModule} from "primeng/dialog";
import {FormsModule} from "@angular/forms";
import {InputTextModule} from "primeng/inputtext";
import {InputTextareaModule} from "primeng/inputtextarea";
import {saveProduct} from "../../../server/save-product.route";
import {EditProductModalComponent} from "../edit-product-modal/edit-product-modal.component";

@Component({
  selector: 'app-products',
  standalone: true,
  //signals: true,
  imports: [
    CardModule,
    DialogModule,
    FormsModule,
    InputTextModule,
    InputTextareaModule,
    ButtonModule,
    EditProductModalComponent
  ],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent {
  testnumber: number = 2;

  // make a computed signal with many signals to showcase how they update

  products = signal<Product[]>([]); // writeable signal to hold all the products

  // how does the computed work under the hood, maybe code analysis? how it does this implicitly?
  // combined signals with other mutable variables not good (explain)
  numberOfProducts = computed(() => this.products().length + this.testnumber); // computed signal to hold the number of products

  editDialogueVisible = signal<boolean>(false);

  viewVisible: boolean = false; // For the view dialog
  viewNew: boolean = false; // For the view dialog

  currentProduct2 = signal<Product | undefined>;
  // Initialize with a default empty product?
  currentProduct = signal<Product>({
    onSale: false,
    price: 0,
    quantity: 0,
    salePrice: 0,
    id: 0, name: '',
    description: '' }); // writeable signal to hold the current product


  productsService = inject(ProductsService); // inject the ProductsService

  constructor() {
    this.loadProducts().then(() =>
      console.log('constructor: ', this.products())); // load products in the constructor. alternatively can be done onInit too
  }

  public async loadProducts() {
    try {
      const loadAllProducts = await this.productsService.loadAllProducts(); //rename
      this.products.set(loadAllProducts);
    } catch (error) {
      console.error('Error loading: ', error);
    }
  }

  // Delete product via ID
  // get the id
  // call the service to delete the product
  // on success update the products signal
  // on error log the error
  public async deleteProduct(id: number) {
    this.productsService.deleteProduct(id).then(() => { // we wait until the fulfillment of the promise THEN, we update the products signal
      this.products.set(this.products().filter(product => product.id !== id)); // we filter out by product id
      // this.products().filter(product => product.id !== id) this already returns a COPY of the array without the deleted product
    }).catch(error => {
      console.error('Error deleting: ', error);
    });
  }

  // Edit product
  public editProduct(product: Product) {
    this.currentProduct.set({ ...product }); // make a copy of the product and set it to the currentProduct signal
    this.editDialogueVisible.set(true);
  }

  // view product
  public viewProduct(product: Product) {
    this.currentProduct.set({ ...product }); // COPY the product
    this.viewVisible = true;
  }

  // Save the product (update)
/*  public async saveProduct() {
    const editedProduct = this.currentProduct();

    if (editedProduct) {
      try {
        // Call the backend service and wait until we get the response to update the product
        const updatedProduct = await this.productsService.editProduct(editedProduct.id, editedProduct);

        // Update the product in the products signal . How?
        // map function to iterate over the current list of products.
        // for each checks if the product's id matches the id of the updatedProduct
        // if a match is found, replaces the old product with the updatedProduct
        // otherwise, it keeps the original unchanged
        const updatedProducts = this.products().map(product =>
          product.id === updatedProduct.id ? updatedProduct : product
        );

        this.products.set(updatedProducts); // Update the products signal with the edited product

        this.editDialogueVisible.set(false); // Close the dialog after saving

      } catch (error) {
        console.error('Error saving product:', error);
      }
    }
  }*/
  async saveProduct(product: Product) {
    try {
      const updatedProduct = await this.productsService.editProduct(product.id, product);
      const updatedProducts = this.products().map(product =>
        product.id === updatedProduct.id ? updatedProduct : product
      );
      this.products.set(updatedProducts);
    } catch (error) {
      console.error('Error saving: ', error);
    }
  }
}
