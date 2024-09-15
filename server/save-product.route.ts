import {setTimeout} from "timers";
import {PRODUCTS} from "./mock-db-data";
import {Request, Response} from 'express';

export function saveProduct(req: Request, res: Response) {
  const id = parseInt(req.params["id"]), changes = req.body;

  console.log("Saving product changes", id, JSON.stringify(changes));

  const newProduct = {
    ...PRODUCTS[id],
    ...changes
  };

  PRODUCTS[id] = newProduct;

  console.log("new product update", newProduct);
  res.status(200).json(PRODUCTS[id]);
}
