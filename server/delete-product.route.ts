import {PRODUCTS} from "./mock-db-data";
import {Request, Response} from 'express';

export function deleteProduct(req: Request, res: Response) {

  console.log("Deleting product ...");

  const id = parseInt(req.params["id"]);
  delete PRODUCTS[id];

  res.status(200).json({id});
}
