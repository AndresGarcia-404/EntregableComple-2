import mongoose from "mongoose";

const useCollection = "products";

const productSchema = new mongoose.Schema({
    title: String,
    description: String,
    code: {type:String,unique:true},
    price: Number,
    status: Boolean,
    stock: Number,
    category: String,
    thumbnail: Array
});

export const productModel = mongoose.model(useCollection,productSchema);