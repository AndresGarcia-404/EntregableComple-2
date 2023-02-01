import express from "express";
import mongoose from "mongoose";
import {Server} from 'socket.io';
import { engine } from 'express-handlebars';
import { messageModel } from "./data/models/message.model.js";

import productRouter from "./routes/products.routes.js";
import cartRouter from "./routes/carts.routes.js";
import chatRouter from "./routes/chat.routes.js";

const PORT = 8080;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const httpServer = app.listen(PORT,()=>{
    console.log(`iniciando en http://localhost:${PORT}`);
})
const io = new Server(httpServer);

app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views","./src/views");
app.use(express.static("public"));

app.use("/api/products",productRouter);
app.use("/api/carts",cartRouter);
app.use("/chat",chatRouter)

mongoose.connect("mongodb+srv://felipe:12321@codercluster.u9omn6q.mongodb.net/ecommerce?retryWrites=true&w=majority", (error)=>{
    if(error){
        console.log("Error connecting");
        process.exit();
    }else{
        console.log("Conectado a la DB :)");
    }
})

app.get("/messages", async (req,res) => {
    try {
        const messages = await messageModel.find();
        res.send(messages);
    } catch (error) {
        res.status(500).send(error);
    }
})

io.on("connection",async (socket)=>{
    socket.on('chat',async (data)=>{
        try {
            await messageModel.create(data);
            let msg = await messageModel.find();
            io.emit('chat',msg);
        } catch (error) {
            throw error;
        }
    })
});