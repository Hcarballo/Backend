class ProductManager {
    products;
    static lastId = 0;

   

    constructor() {
        this.products = [];
    }

    
    getProducts() {
        return this.products;
    }

    addProduct(title, description, price, code, stock) {
        ProductManager.lastId++;
        const product = {
            id: ProductManager.lastId,
            description,
            price,            
            thumbnail, 
            code,           
            stock
        };
        
        if (!product.code || !product.description || !product.price || !product.thumbnail || product.stock) {
            console.log("Todos los campos son obligatorios");
            return;
        }

        for (let i = 0; i < this.products.length; i++) {
            if (this.products[i].codigo === product.codigo) {
                console.log("El código del producto ya existe");
                return;
            }
        }
                
        this.products.push(product);
    }

    getProductById(id) {
        for (let i = 0; i < this.products.length; i++) {
            if (this.products[i].id === id) {
                return this.products[i];
            }
        }

        console.log("No se encontró el producto");
    }

}