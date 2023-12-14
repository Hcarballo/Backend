import { Router } from "express";
import { ProductManager } from "../classes/ProductManager.js";


const router = Router();
const productManager = new ProductManager("./product.json");

router.get("/", async (req, res) => {
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
})

router.get("/:id", async (req, res) => {
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

router.post("/", async (req, res) => {
    const { title, description, price, thumbnail, code, stock, category } = req.body;

    try {
        const result = await productManager.addProduct(
            title,
            description,
            price,
            thumbnail,
            code,
            stock,
            category
        );
        res.json({ message: "success", data: result });
    } catch (error) {
        console.log(error);
        res.status(300).json({ message: "error", data: error })

    }
});

router.put("/:id", async (req, res) => {
    const { id } = req.params;
    const { title, description, price, status, thumbnail, code, stock, category } = req.body;
    try {

        let product = await productManager.getProductById(id);

        if (product) {
            let newProduct = {
                title: title || product.title,
                description: description || product.description,
                price: price || product.price,
                status: status || product.status,
                thumbnail: thumbnail || product.thumbnail,
                code: code || product.code,
                stock: stock || product.stock,
                category: category || product.category,
            }
            const result = await productManager.getProductById(id);
            res.status(200).json({ message: "success", data: result });
        } else {
            res.status(404).json({
                message: "el producto solicitado no existe",
            });
        }
    } catch (error) {
        console.log(error);
    }
})

router.delete("/:id", async (req, res) => {
    const { id } = req.params;
    let product = await productManager.getProductById(id);

    if (product) {
        const result = await productManager.deleteProduct(id);
        res.json({ message: "sucess", data: result });
    } else {
        res.json({
            message: "El producto solicitado no existe",
        });
    }
});

export default router;