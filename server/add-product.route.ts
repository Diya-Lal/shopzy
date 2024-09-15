import {Request, Response} from 'express';
import {PRODUCTS} from "./mock-db-data";

export var productsKeyCounter = 100;

export function addProduct(req: Request, res: Response) {

  console.log("Adding product ...");

  const changes = req.body;

  const newProduct = {
    id: productsKeyCounter,
    ...changes
  };

  PRODUCTS[newProduct.id] = newProduct;
  productsKeyCounter += 1;
  res.status(200).json(newProduct);

}
