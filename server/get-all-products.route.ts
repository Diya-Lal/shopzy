import {PRODUCTS} from "./mock-db-data";
import {Request, Response} from 'express';
import {timeout} from "rxjs";

export function getAllProducts(req: Request, res: Response) {

  setTimeout(() => {
    console.log(`Called GET /api/products`);
    res.status(200).json(Object.values(PRODUCTS));
  }, 1000);
}

export function getProductById(req: Request, res: Response) {

  const productId = parseInt(req.params['id']);
  const products = Object.values(PRODUCTS);

  const product = products.find(product => product.id === productId);

  res.status(200).json(product);

}
