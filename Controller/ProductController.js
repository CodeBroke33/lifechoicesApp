import express from 'express';
import bodyParser from 'body-parser';
import { products } from '../Model/index.js';

const productRouter = express.Router();

// Fetch all products
productRouter.get('/', (req, res)=>{
    try {
        products.fetchProducts(req, res);
    } catch(e){
        res.json({
            status: res.statusCode,
            msg: "Failed to retrieve users"
        })
    }
})

productRouter.get('/:id', (req, res)=>{
    try {
        products.fetchProducts(req, res);
    } catch(e){
        res.json({
            status: res.statusCode,
            msg: "Failed to retrieve a product"
        })
    }
})

productRouter.post('/addProduct', bodyParser.json(),(req, res)=>{
    try {
        products.addProduct(req, res);
    } catch(e) {
        res.json({
            status: res.statusCode,
            msg: "Failed to add a new product."
        })
    }
})

export {
    productRouter
}