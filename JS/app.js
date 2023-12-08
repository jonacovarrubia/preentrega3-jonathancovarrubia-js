let catalogo = JSON.parse(localStorage.getItem("catalogo")) || [
    { nombre: "Figura Anakin", precio: 70.000 },
    { nombre: "Figura Obi Wan", precio: 50.000 },
    { nombre: "Figura Yoda", precio: 90.000 },
    { nombre: "Figura Luke", precio: 65.000 }
];


let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

// Función para agregar un producto al carrito
function agregarAlCarrito(index) {
    let producto = catalogo[index];
    carrito.push({ nombre: producto.nombre, precio: producto.precio });
    mostrarModalCarrito(`${producto.nombre} agregado al carrito.`);
    actualizarCarrito();
    mostrarCarrito();
}

// Función para vaciar el carrito
function vaciarCarrito() {
    carrito = [];
    mostrarModalCarrito("Carrito vaciado.");
    actualizarCarrito();
    ocultarCarrito();
}

// Función para eliminar un artículo del carrito
function eliminarItemCarrito(index) {
    carrito.splice(index, 1);
    mostrarModalCarrito("Producto eliminado del carrito.");
    actualizarCarrito();
}

// Función para realizar la compra
function comprar() {
    mostrarModalCarrito("¡Compra realizada con éxito! Gracias por tu compra.");
    vaciarCarrito();
}

// Función para actualizar la visualización del carrito
function actualizarCarrito() {
    let listaCarrito = document.getElementById("lista-carrito");
    let totalElemento = document.getElementById("total");

    listaCarrito.innerHTML = "";
    let total = 0;

    carrito.forEach((item, index) => {
        let li = document.createElement("li");
        li.className = "list-group-item d-flex justify-content-between align-items-center";
        li.innerHTML = `
            ${item.nombre} - $${item.precio.toFixed(2)}
            <button class="eliminar-btn" onclick="eliminarItemCarrito(${index})">Eliminar</button>
        `;

        listaCarrito.appendChild(li);

        total += item.precio;
    });

    totalElemento.textContent = `Total: $${total.toFixed(2)}`;

    // Guardar en el Storage
    localStorage.setItem("carrito", JSON.stringify(carrito));
}

// Función para mostrar el carrito
function mostrarCarrito() {
    document.getElementById("carrito-section").style.display = "block";
}

// Función para ocultar el carrito
function ocultarCarrito() {
    document.getElementById("carrito-section").style.display = "none";
}

// Función para mostrar el modal del carrito
function mostrarModalCarrito(mensaje) {
    let modal = document.getElementById("modal-carrito");
    let mensajeCarrito = document.getElementById("mensaje-carrito");
    mensajeCarrito.textContent = mensaje;
    modal.style.display = "block";

    setTimeout(() => {
        modal.style.display = "none";
    }, 2000);
}

// Función para cerrar el modal del carrito
function cerrarModalCarrito() {
    document.getElementById("modal-carrito").style.display = "none";
}

// Evento para cerrar el modal si se hace clic fuera de él
window.onclick = function (event) {
    let modal = document.getElementById("modal-carrito");
    if (event.target == modal) {
        modal.style.display = "none";
    }
};

// Almacena el catálogo en el Storage si no está almacenado
if (!localStorage.getItem("catalogo")) {
    localStorage.setItem("catalogo", JSON.stringify(catalogo));
}
