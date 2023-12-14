import { Router } from "express";
import { CartManager } from "../classes/CartManager.js";


const router = Router();
const cartManager = new CartManager("./carts.json");

router.get('/', async (req, res) => {
    try {
        let response = await cartManager.getCarts();
        res.json({ data: response });
    } catch (error) {
        console.log(error);
    }
});

router.get("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        let cart = await cartManager.getCartById(id);

        if (cart) {
            res.status(200).json({ message: "success", data: cart });
        } else {
            res.status(404).json({
                message: "El Carrito solicitado no existe",
            });
        }
    } catch (error) {
        console.log(error);
    }
});

router.post("/", async (req, res) => {
    try {
        const response = await cartManager.createCart();
        res.json({ message: "success", data: response });
    } catch (error) {
        console.log(error);
        res.status(300).json({ message: "error", data: error });
    }
});

router.post("/:carroId/products/:productoID", async (res, req) => {
    const { carroId, productoId } = req.params;
    try {
        const response = await cartManager.addProductToCart(carroId, productoId);
        res.json({ message: "success", data });
    } catch (error) {
        console.log(error);
        res.status(300).json({ message: "error", data: error });
    }
});

router.delete("/:id", async (req, res) => {
    const { id } = req.params;
    let cart = await cartManager.getCartById(id);

    if (cart) {
        const result = await cartManager.deleteCart(id);
        res.json({ message: "sucess", data: result });
    } else {
        res.json({
            message: "El producto solicitado no existe",
        });
    }
});

export default router;