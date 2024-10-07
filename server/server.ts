import * as express from 'express';
import {Application} from "express";
import {getAllProducts, getProductById} from "./get-all-products.route";
import {addProduct} from "./add-product.route";
import {saveProduct} from "./save-product.route";
import {deleteProduct} from "./delete-product.route";

const bodyParser = require('body-parser');

const app: Application = express();
app.use(bodyParser.json());
const cors = require('cors');
app.use(cors({origin: true}));

app.route('/api/products').get(getAllProducts);

app.route('/api/addProduct').post(addProduct);

app.route('/api/products/:id').get(getProductById);

app.route('/api/products/:id').put(saveProduct);

app.route('/api/products/:id').delete(deleteProduct);

const httpServer = app.listen(9002, () => {
  console.log("HTTP REST API Server running at http://localhost:" + httpServer.address()["port"]);
});
