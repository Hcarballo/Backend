import utils from "../utils.js";
import crypto from "crypto";

export class ProductManager {

    constructor(path) {
        this.path = path;
        this.products = [];
    }

    async addProduct(title, description, price, status, thumbnail, code, stock, category) {

        if (title == undefined ||
            description == undefined ||
            price == undefined ||
            status == undefined ||
            thumbnail == undefined ||
            code == undefined ||
            stock == undefined ||
            category == undefined) {

            throw new Error("Todos los campos son obligatorios");
        }
        try {
            let data = await utils.readFile(this.path);
            this.products = data?.length > 0 ? data : [];
        } catch (error) {
            console.log(error);
        }

        if (this.products.some((p) => p.code == code)) {
            throw new Error("El código del producto ya existe");
        } else {
            const product = {
                id: crypto.randomUUID(),
                title,
                description,
                price,
                status,
                thumbnail,
                code,
                stock,
                category
            };
            this.products.push(product);
            try {
                await utils.writeFile(this.path, this.products);
            } catch {
                console.log(error);
            }
        }
    }

    async getProducts() {
        try {
            let datos = await utils.readFile(this.path);
            return datos?.length > 0 ? datos : "No hay registros cargados";
        } catch (error) {
            console.log(error);
        }
    };

    async getProductById(id) {
        try {
            const products = await this.getProducts();
            const product = products.find(p => p.id === id);

            if (product != undefined) {
                return product;
            }
            console.log("No se encontró el producto");
        } catch (error) {
            console.log(error);
        }
    }

    async upDateProduct(id, updateAtrib) {
        try {
            const products = await this.getProducts();
            const productIndex = await products.findIndex(p => p.id === id);

            if (productIndex === -1) {
                console.log("No se encontró el producto");
                return;
            }

            products[productIndex] = { ...products[productIndex], ...updateAtrib };
            const productsData = await products.map(product => JSON.stringify(product)).join('\n');
            await utils.writeFile(this.path, productsData);
        } catch (error) {
            console.log(error);
        }
    }

    async deleteProduct(id) {
        try {
            const products = await this.getProducts();
            const productIndex = await products.findIndex(p => p.id === id);

            if (productIndex === -1) {
                console.log("No se encontró el producto");
                return;
            }

            products.splice(productIndex, 1);
            const productsData = products.map(product => JSON.stringify(product)).join('\n');
            await utils.writeFile(this.path, productsData);

        } catch (error) {
            console.log(error);
        }
    }
}

export default {
    ProductManager,
}


