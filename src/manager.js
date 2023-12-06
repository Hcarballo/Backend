import { ProductManager } from "../ProductManager.js"

let products = new ProductManager("./product.json");

products.addProduct("producto A","Este es el producto A",100,"sin imagen","abc123",10);
products.addProduct("producto B","Este es el producto B",100,"sin imagen","abc124",10);
products.addProduct("producto C","Este es el producto C",100,"sin imagen","abc125",10);
products.addProduct("producto D","Este es el producto D",100,"sin imagen","abc126",10);
products.addProduct("producto E","Este es el producto E",100,"sin imagen","abc127",10);
products.addProduct("producto F","Este es el producto F",100,"sin imagen","abc128",10);
products.addProduct("producto G","Este es el producto G",100,"sin imagen","abc129",10);

