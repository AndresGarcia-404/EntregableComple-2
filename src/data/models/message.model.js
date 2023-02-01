import mongoose from "mongoose";

const useCollection = "messages";

const messageSchema = new mongoose.Schema({
    name: String,
    message: String
});

export const messageModel = mongoose.model(useCollection,messageSchema);