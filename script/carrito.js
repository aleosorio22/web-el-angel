let productosEnCarrito = localStorage.getItem("productos-en-carrito");
productosEnCarrito = JSON.parse(productosEnCarrito);


const contenedorCarritoVacio = document.querySelector("#carrito-vacio");
const contenedorCarritoProductos = document.querySelector("#carrito-productos");
const contenedorCarritoAcciones = document.querySelector("#carrito-acciones");
const contenedorCarritoComprado = document.querySelector("#carrito-comprado");
let botonesEliminar = document.querySelectorAll(".carrito-producto-eliminar")
const botonVaciar = document.querySelector("#carrito-acciones-vaciar");
const contenedorTotal = document.querySelector("#total");
const botonComprar = document.querySelector("#carrito-acciones-comprar");
const btnEnviarOrden = document.getElementById("carrito-enviar-orden")

function cargarProductosCarrito(){
    if (productosEnCarrito && productosEnCarrito.length >0) {

        contenedorCarritoVacio.classList.add("disabled")
        contenedorCarritoProductos.classList.remove("disabled")
        contenedorCarritoAcciones.classList.remove("disabled")
    
        contenedorCarritoProductos.innerHTML = ""
    
        productosEnCarrito.forEach(producto => {
        
            const div = document.createElement("div");
            div.classList.add("carrito-producto");
            div.innerHTML = `
                <img class="carrito-producto-imagen" src="./img/${producto.imagen}" alt="${producto.nombre}">
                <div class="carrito-producto-titulo">
                    <small>Nombre</small>
                    <h3>${producto.nombre}</h3>
                </div>
                <div class="carrito-producto-cantidad">
                    <small>Cantidad</small>
                    <p>${producto.cantidad}</p>
                </div>
                <div class="carrito-producto-precio">
                    <small>Precio</small>
                    <p>Q${producto.precioTotal.toFixed(2)}</p>
                </div>
                <div class="carrito-producto-subtotal">
                    <small>Subtotal</small>
                    <p>Q${producto.precioTotal * producto.cantidad}</p>
                </div>
                <button class="carrito-producto-eliminar" id="${producto.id}"><i class="bi bi-trash-fill"></i></button>
            `;
    
            contenedorCarritoProductos.append(div);
        })
    } else {
        contenedorCarritoVacio.classList.remove("disabled")
        contenedorCarritoProductos.classList.add("disabled")
        contenedorCarritoAcciones.classList.add("disabled")
        contenedorCarritoComprado.classList.add("disabled")
    }

    actualizarBotonesEliminar();
    actualizarTotal();
}

cargarProductosCarrito();

function actualizarBotonesEliminar() {
    botonesEliminar = document.querySelectorAll(".carrito-producto-eliminar");

    botonesEliminar.forEach(boton => {
        boton.addEventListener("click", eliminarDelCarrito);
    });
}

function eliminarDelCarrito(e){
    const idBoton = e.currentTarget.id;
    const index = productosEnCarrito.findIndex(producto => producto.id === idBoton);
    
    console.log(productosEnCarrito)
    productosEnCarrito.splice(index, 1);
    cargarProductosCarrito();
    localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));
}

botonVaciar.addEventListener("click", vaciarCarrito);
function vaciarCarrito() {

    productosEnCarrito.length = 0;
    localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));
    cargarProductosCarrito();
}

function actualizarTotal() {
    const totalCalculado = productosEnCarrito.reduce((acc, producto) => acc + (producto.precioTotal * producto.cantidad), 0);
    total.innerText = `Q${totalCalculado}`;
}

btnEnviarOrden.addEventListener("click", function(event) {
    console.log("Botón enviar presionado");
    comprarCarrito(event); // Llama a la función comprarCarrito pasando el evento como parámetro
});

function comprarCarrito(event) {

    event.preventDefault();

    const nombreOrden = document.getElementById("nombre-modal").value;
    const emailOrden = document.getElementById("email-modal").value;

    if (nombreOrden.trim() === '' || emailOrden.trim === ''){
        alert("Por favor completa todos los campos del formulario.");
        return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(emailOrden)) {
        // Mostrar un mensaje de error si el formato del correo electrónico es inválido
        alert("Por favor ingresa un correo electrónico válido.");
        return;
    }

    
    productosEnCarrito.length = 0;
    localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));
    
    modal.style.display = "none";
    contenedorCarritoVacio.classList.add("disabled");
    contenedorCarritoProductos.classList.add("disabled");
    contenedorCarritoAcciones.classList.add("disabled");
    contenedorCarritoComprado.classList.remove("disabled");
    
}

