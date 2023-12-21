import express from "express";
import { Server, Socket } from "socket.io";
import productRouter from "./routes/products.router.js";
import cartRouter from "./routes/carts.router.js";
import handlebars from "express-handlebars";
import viewsrouter from "./routes/views.router.js";
import { __dirname } from "./utils.js";
import { ProductManager } from "./classes/ProductManager.js";

const app = express();
const PORT = 8080;
const productManager = new ProductManager("product.json");

let product = [];

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));
app.get("/", (req, res) => {
    res.send("Desafio #4 v1.0 ");
});

app.use("/api/products", productRouter);
app.use("/api/carts", cartRouter);
app.use("/", viewsrouter);

app.engine("handlebars", handlebars.engine());
app.set("views", __dirname + "/views");
app.set("view engine", "handlebars");


const server = app.listen(PORT, () => {
    console.log(`servidor escuchando en http://localhost:${PORT}`);
});

const socketServer = new Server(server);

socketServer.on("connection", (socket) => {
    console.log("nuevo cliente conectado");
    socket.on("addProduct", async (product) => {
        debugger
        const title = product.title;
        const description = product.description;
        const price = product.price;
        const status = true;
        const thumbnail = product.thumbnail;
        const code = product.code;
        const stock = product.stock;
        const category = product.category;

        try {
            const result = await productManager.addProduct(
                title,
                description,
                price,
                status,
                thumbnail,
                code,
                stock,
                category,
            );
            const allproducts = await productManager.getProducts();
            result && socketServer.emit("upDateProduct", allproducts);

        } catch (error) {
            console.log(error);
        }
    });


    socket.on("deleteProduct", async (id) => {
        try {
            const result = await productManager.deleteProduct(id);
            const allproducts = await productManager.getProducts();
            result && socketServer.emit("upDateProduct", allproducts);
        } catch (error) {
            console.log(error);
        }
    });
});
