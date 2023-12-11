import express from "express";
import { ProductManager } from "../ProductManager.js";

const app = express();
const PORT = 8080;

const productManager = new ProductManager("./product.json")

app.get("/", (req, res) => {
    res.send("Desafio #3 v1.1 ");
});

app.get("/products", async (req, res) => {
    try {
        let temporalProducts = await productManager.getProducts();
        const { limit } = req.query;
        if (limit) {
            temporalProducts = temporalProducts.slice(0, +limit);
        }
        res.json({
            msg: "Lista de productos",
            data: temporalProducts,
            limit: limit ? limit : "false",
            total: temporalProducts.length,
        });
    } catch (error) {
        console.log(error);
    }
});

app.get("/products/:id", async (req, res) => {
    try {
        const { id } = req.params;


        let product = await productManager.getProductById(id);


        if (product) {
            res.status(200).json({ message: "success", data: product });
        } else {
            res.status(404).json({
                message: "el producto solicitado no existe",
            });
        }
    } catch (error) {
        console.log(error);
    }
});

app.listen(PORT, () => {
    console.log(`servidor escuchando en http://localhost:${PORT}`);
});