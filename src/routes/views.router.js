import { Router } from "express";
import { ProductManager } from "../classes/ProductManager.js";

const router = Router();
const productManager = new ProductManager('product.json')

router.get("/products", async (req, res) => {
    const products = await productManager.getProducts();
    res.render("products", {title:"Listado de productos", products: products, style:"css/products.css" });
});

router.get("/realtimeproducts", async (req, res) => {
    const products = await productManager.getProducts();
    res.render("realTimeProducts", {title:"Listado de productos en tiempo real", products: products, style:"css/products.css" });
});

export default router;