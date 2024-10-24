import {Component, computed, effect, ElementRef, inject, Injector, signal, viewChildren} from '@angular/core';
import {ButtonModule} from "primeng/button";
import {Card, CardModule} from "primeng/card";
import {ProductsService} from "../services/products.service";
import {Product} from "../models/product.model";
import {DialogModule} from "primeng/dialog";
import {FormsModule} from "@angular/forms";
import {InputTextModule} from "primeng/inputtext";
import {InputTextareaModule} from "primeng/inputtextarea";
import {EditProductModalComponent} from "../edit-product-modal/edit-product-modal.component";
import {toObservable, toSignal} from "@angular/core/rxjs-interop";
import { map } from 'rxjs/operators';

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
    EditProductModalComponent,
  ],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent {
  // writeable signal to hold all the products
  products = signal<Product[]>([]);


  testnumber: number = 100; // a mutable variable
  // combined signals with other mutable variables not good practice
  numberOfProducts = computed(() => this.products().length + this.testnumber); // computed signal to hold the number of products

  // signals to control the visibility of the edit dialogue
  editDialogueVisible = signal<boolean>(false);
  editDialogueMode = signal<'create' | 'update'>('create');
  viewVisible: boolean = false; // For the view dialog, not via signal


  // default product to initialize the currentProduct signal
  public defaultProduct: Product = {
    onSale: false,
    price: 0,
    quantity: 0,
    salePrice: 0,
    id: 0,
    name: '',
    description: ''
  }
  // Initialize the signal with a default empty product
  currentProduct = signal<Product>(this.defaultProduct) // writeable signal to hold the current product

  // example of a query signal, can work with viewChild, viewChildren, contentChild, contentChildren
  // can configure the query signal to return ElementRef, Component, Directive, etc.
  // the query signal can be used like any other signal
  allProductsViewChildren = viewChildren(
    'productCard',
    {read: Card}
  );

  //RXJS interop
  // lets say our component needs to work with observables
  productsObservable$ = toObservable(this.products); // convert the products signal to an observable
  // internally uses signal effects to subscribe to the signal and emit the values as an observable
  onSaleObservable$ = this.productsObservable$.pipe(
    map(products => products.filter(product => product.onSale)) // filter out the products that are on sale
  );
  onSaleSignal = toSignal(this.onSaleObservable$, { // convert back to signal, signals need an initial value unlike observables
    initialValue: []
  });

  constructor() {
    this.loadProducts().then(() => {}); // load products in the constructor. alternatively can be done onInit too

    effect(() => {
      console.log('Products:', this.products()); // use an effect to log the products, triggered whenever the products signal changes
    });

    // showcase the use of viewChildren query signal via an effect
    effect(() =>{
      console.log('View children:', this.allProductsViewChildren());
    });
  }


  productsService = inject(ProductsService); // inject the ProductsService

  // ASYNC/AWAIT example to load products
  public async loadProducts() {
    try {
      const loadAllProducts = await this.productsService.loadAllProducts();
      // sort by id descending
      // uncomment if we want to keep the new products on top even after refresh
      // const sortedProducts = loadAllProducts.sort((a, b) => b.id - a.id);
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
    this.currentProduct.set(product); // set it to the currentProduct signal
    this.editDialogueMode.set('update'); // set the mode to update
    this.editDialogueVisible.set(true);
  }

  public addProduct() {
    this.currentProduct.set(this.defaultProduct); // set the currentProduct signal to the default product
    this.editDialogueMode.set('create'); // set the mode to create
    this.editDialogueVisible.set(true);
  }

  // view product
  public viewProduct(product: Product) {
    this.currentProduct.set(product);
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

  // responsible for saving a product, either by UPDATING an existing product or CREATING a new one
  public async saveProduct(product: Partial<Product>) {
    try {
      // declare a variable to hold the updated list of products
      // will be used to store the new list of products after updating or adding new
      let updatedProducts;

      if (product.id) { // edit mode
        const updatedProduct = await this.productsService.editProduct(product.id, product);
        updatedProducts = this.products().map(product =>
          // iterate over the current list of products
          // for each, check that the product's id matches the id of the updatedProduct
          // if a match is found, replace the old product with the updatedProduct
          // otherwise keep the original unchanged
          product.id === updatedProduct.id ? updatedProduct : product
        );
      } else { // create mode
        // await the creation of a new product via the backend service call
        // add the new product to the BEGINNING of the list of products
        const newProduct = await this.productsService.createProduct(product);
        // make a copy of the current list of products and add the new product to the beginning
        updatedProducts = [newProduct, ...this.products()];
      }

      // update the products signal with the updated list of products
      this.products.set(updatedProducts);
    } catch (error) {
      console.error('Error saving: ', error);
    }
  }

  protected readonly console = console;
}
