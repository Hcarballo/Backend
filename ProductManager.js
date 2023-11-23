class ProductManager {
    products;
    static lastId = 0;

    constructor() {
        this.products = [];
    }


    getProducts() {
        return this.products;
    }

    addProduct(title, description, price, thumbnail, code, stock) {
        ProductManager.lastId++;
        const product = {
            id: ProductManager.lastId,
            title,
            description,
            price,
            thumbnail,
            code,
            stock
        };

        if (!product.code || !product.description || !product.price || !product.thumbnail || !product.stock) {
            console.log("Todos los campos son obligatorios");
            ProductManager.lastId--;
            return;
        }

        if (this.products.find(id)) {
            console.log("El código del producto ya existe");
            ProductManager.lastId--;
            return;
        }


        this.products.push(product);
    }

    getProductById(id) {
        if (this.products.length > 0) {
            return this.products.find(id)
        }

        console.log("No se encontró el producto");
    }


}