import mongoose from "mongoose";

const useCollection = "carts";

const cartSchema = new mongoose.Schema({
    products: Array
});

export const cartModel = mongoose.model(useCollection,cartSchema);