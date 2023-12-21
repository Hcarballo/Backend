const socket = io();

const btn_addproduct = document.getElementById("btn_addproduct");
const btn_deleteproduct = document.getElementById("btn_deleteproduct");

const title = document.getElementById("title").value;
const description = document.getElementById("description").value;
const price = document.getElementById("price").value;
const thumbnail = document.getElementById("thumbnail").value;
const code = document.getElementById("code").value;
const stock = document.getElementById("stock").value;
const category = document.getElementById("category").value;

btn_addproduct.addEventListener("click", () => {
    const product = {
        title,
        description,
        price,
        thumbnail,
        code,
        stock,
        category,
    };

    socket.emit("addProduct", product);
    
    title.value = "";
    description.value = "";
    price.value = "";
    thumbnail.value = "";
    code.value = "";
    stock.value = "";
    category.value = "";
});

btn_deleteproduct.addEventListener("click", () => {
    const id = document.getElementById("id").value;
    socket.emit("deleteProduct", id);
    id.value = "";
    alert("Producto Eliminado");
});

socket.on("upDateProducts", (product) => {
    window.location.reload();
})