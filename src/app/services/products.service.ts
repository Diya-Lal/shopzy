import {inject, Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {firstValueFrom} from "rxjs";
import {Product} from "../models/product.model";

@Injectable({
  providedIn: "root"
})

export class ProductsService {

  private readonly ROOT_URL ="http://localhost:9002/api";
  private readonly http = inject(HttpClient);

  // make one of the methods toSignal and vice versa

  // loads ALL prducts (R)
  public async loadAllProducts():Promise<Product[]> {
    const $products = this.http.get<Product[]>(`${this.ROOT_URL}/products`); // load it as an observable
    return firstValueFrom($products); // convert it to a promise of type Product[]
  }

  // loads a SINGLE product by ID (R)
  public async loadProductById(id: string):Promise<Product> {
    const $product = this.http.get<Product>(`${this.ROOT_URL}/products/${id}`);
    return firstValueFrom($product);
  }

  // create a new product (C)
  // partial because we cannot have the id field yet
  public async createProduct(product: Partial<Product>):Promise<Product> {
    const $newProduct = this.http.post<Product>(`${this.ROOT_URL}/addProduct`, product);
    return firstValueFrom($newProduct);
  }

  // update a product (U)
  public async editProduct(id: number, product: Partial<Product>):Promise<Product> {
    const $updatedProduct = this.http.put<Product>(`${this.ROOT_URL}/products/${id}`, product);
    return firstValueFrom($updatedProduct);
  }

  // delete a product by ID (D)
  public async deleteProduct(id: number):Promise<void> {
    const $deleteResponse = this.http.delete<void>(`${this.ROOT_URL}/products/${id}`);
    return firstValueFrom($deleteResponse);
  }
}
