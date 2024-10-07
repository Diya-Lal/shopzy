import {inject, Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {firstValueFrom} from "rxjs";
import {Product} from "../models/product.model";

@Injectable({
  providedIn: "root"
})

export class ProductsService {

  ROOT_URL ="http://localhost:9002/api";
  http = inject(HttpClient);

  public async loadAllProducts():Promise<Product[]> {
    const $products = this.http.get<Product[]>(`${this.ROOT_URL}/products`); // load it as an observable
    return firstValueFrom($products); // convert it to a promise of type Product[]
  }

}
