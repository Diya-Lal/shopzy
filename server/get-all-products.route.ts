import {PRODUCTS} from "./mock-db-data";
import {Request, Response} from 'express';

export function getAllProducts(req: Request, res: Response) {

  console.log(`Called GET /api/products`);
  res.status(200).json(Object.values(PRODUCTS));

}

export function getProductById(req: Request, res: Response) {

  const productId = parseInt(req.params['id']);
  const products = Object.values(PRODUCTS);

  const product = products.find(product => product.id === productId);

  res.status(200).json(product);

}
