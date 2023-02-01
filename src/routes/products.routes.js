import { Router } from "express";
import { productModel } from "../data/models/product.model.js";

const router = Router();

router.get('/',async (req, res) => {
    try {
        let products = await productModel.find();
        res.send(products.length > 0 ? products : {error: "No hay productos",products:products})
    } catch (error) {
        res.status(500).send(error.message)
    }
})

router.get('/:id', async (req, res) => {
    const {id} = req.params;
    try {
        const result = await productModel.findById(id);
        res.status(200).send(result);
    } catch (error) {
        res.status(404).send("product not found")
    }
})

router.post('/',async (req, res) => {
    const {title,description,code,price,status,stock,category,thumbnail} = req.body;
    const newProduct = {title,description,code,price,status,stock,category,thumbnail}
    try {
        const result = await productModel.create(newProduct);
        res.status(200).send({status:"succes",payload:result})
    } catch (error) {
        res.status(500).send(error.message)
    }
})

router.delete('/:id', async (req, res) => {
    const {id} = req.params;
    try {
        await productModel.findByIdAndDelete(id)
        res.status(200).send("Product deleted")
    } catch (error) {
        res.status(404).send("Product not found")
    }
})

router.put('/:id', async (req, res) => {
    const {id} = req.params;
    try {
        const result = await productModel.findByIdAndUpdate(id,req.body)
        res.status(200).send({status:"success",payload:result})
    } catch (error) {
        res.status(404).send("Product not found")
    }
})

export default router; 