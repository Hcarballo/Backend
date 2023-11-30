const fs = require('fs');
const { get } = require('http');

class ProductManager {
    products;
    path;

    constructor() {
        this.products = [];
        this.path = "./product.txt"
    }

    getProducts() {
        if (fs.existsSync(this.path)) {
            const productsData = fs.readFileSync(this.path, "utf-8");
            this.products = productsData.split('\n').filter(line => line).map(line => JSON.parse(line));
            return this.products;
        }
    }

    getLastIdProducts() {
        const products = this.getProducts();
        let id = 0;
        if (products.length > 0) {
            id = Math.max(...products.map(p => p.id));
            id++;
            console.log(id);
        }

        return id;
    }

    addProduct(title, description, price, thumbnail, code, stock) {

        const product = {
            id: this.getLastIdProducts(),
            title,
            description,
            price,
            thumbnail,
            code,
            stock
        };

        if (!product.code || !product.description || !product.price || !product.thumbnail || !product.stock) {
            console.log("Todos los campos son obligatorios");
            return;
        }

        if (this.products.some(p => p.code === product.code)) {
            console.log("El código del producto ya existe");
            return;
        }

        this.products.push(product);
        fs.appendFileSync(this.path, JSON.stringify(product) + '\n');
    }

    getProductById(id) {
        const products = this.getProducts();
        const product = products.find(p => p.id === id);

        if (product != undefined) {
            return product;
        }

        console.log("No se encontró el producto");
    }

    upDateProduct(id, updateAtrib) {
        const products = this.getProducts();
        const productIndex = products.findIndex(p => p.id === id);

        if (productIndex === -1) {
            console.log("No se encontró el producto");
            return;
        }

        products[productIndex] = { ...products[productIndex], ...updateAtrib };

        const productsData = products.map(product => JSON.stringify(product)).join('\n');
        fs.writeFileSync(this.path, productsData);
    }

    deleteProduct(id) {
        const products = this.getProducts();
        const productIndex = products.findIndex(p => p.id === id);

        if (productIndex === -1) {
            console.log("No se encontró el producto");
            return;
        }

        products.splice(productIndex, 1);

        const productsData = products.map(product => JSON.stringify(product)).join('\n');
        fs.writeFileSync(this.path, productsData);
    }

}

//------------Testing---------------

const productManager = new ProductManager();

productManager.addProduct("producto prueba", "es la descrip de prueba", 100, "sin imagen", "abc129", 10);
productManager.addProduct("producto prueba", "es la descrip de prueba", 100, "sin imagen", "abc130", 10);
productManager.addProduct("producto prueba", "es la descrip de prueba", 100, "sin imagen", "abc130", 10); // Código repetido
productManager.addProduct("producto prueba", "es la descrip de prueba", 100, "sin imagen", "abc131", 10);

console.log(productManager.getProducts());
console.log(productManager.getProductById(2));

productManager.upDateProduct(4, { title: "Cambio/Actualizacion", price: 200 })
productManager.deleteProduct(3)
