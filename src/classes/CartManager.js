import utils from "../utils.js";

export class CartManager {
    static carts;
    constructor(path) {
        this.path = path;
        this.carts = [];
    }


    async createCart() {
        try {
            let data = await utils.readFile(this.path);
            this.carts = data?.length > 0 ? data : [];
            const id = crypto.randomUUID();

            const newCart = {
                id: id,
                timestamp: Date.now(),
                product: [],
            };

            this.carts.push(newCart);
            await utils.writeFile(this.path, this.carts);
            return newCart;

        } catch (error) {
            console.log(error);
        }
        return newCart;
    };

    async getCarts() {
        try {
            let datos = await utils.readFile(this.path);
            return datos?.length > 0 ? datos : "No hay Carritos cargados";
        } catch (error) {
            console.log(error);
        }

    };

    async getCartById(id) {
        try {
            const carts = await this.getCarts();
            const cart = await carts.find(c => c.id === id);

            if (cart != undefined) {
                return cart;
            }
            console.log("No se encontró el Carrito");
        } catch (error) {
            console.log(error);
        }
    };

    async addProductToCart(carroId, productId) {
        try {
            const cart = this.getCartById(carroId);
            const { products } = cart;
            const productIndex = products.findIndex(product => product.id === productId);

            if (productIndex !== -1) {
                products[productIndex].quantity++;
            } else {
                products.push({
                    product: productId,
                    quantity: 1,
                });
            }
            this.updateCart(cart);
            return cart;
        } catch (error) {
            console.log(error);
        }

    }

    async updateCart(cart) {
        const { id } = cart;
        const carts = await this.getCarts();
        const cartUpdateIndex = carts.findIndex(cart => cart.id === id);
        carts.splice(cartUpdateIndex, 1, cart);
        const response = await utils.writeFile(this.path, carts);
        return response;
    }

    async deleteCart(id) {
        try {
            const carts = await this.getCarts();
            const cartIndex = await carts.findIndex(c => c.id === id);

            if (cartIndex === -1) {
                console.log("No se encontró el producto");
                return;
            }

            carts.splice(cartIndex, 1);
            const cartsData = carts.map(cart => JSON.stringify(cart)).join('\n');
            await utils.writeFile(this.path, cartsData);

        } catch (error) {
            console.log(error);
        }
    }

}

export default {
    CartManager
};



