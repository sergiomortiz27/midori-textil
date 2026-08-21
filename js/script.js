/* =====================================================
   MIDORI TEXTIL - CONFIGURACIÓN
===================================================== */

const WHATSAPP_NUMBER = "51940258118";

/* =====================================================
   DISEÑOS
===================================================== */

const diseños = [
    { id: 1, nombre: "Diseño #001", imagen: "assets/diseños/diseño-001.png", categoria: "Anime", disponible: true },
    { id: 2, nombre: "Diseño #002", imagen: "assets/diseños/diseño-002.png", categoria: "Anime", disponible: true },
    { id: 3, nombre: "Diseño #003", imagen: "assets/diseños/diseño-003.png", categoria: "Gaming", disponible: true },
    { id: 4, nombre: "Diseño #004", imagen: "assets/diseños/diseño-004.png", categoria: "Frase", disponible: false }
];

/* =====================================================
   COLORES Y TALLAS
===================================================== */

const colores = [
    { nombre: "Negro", codigo: "#171717" },
    { nombre: "Blanco", codigo: "#ffffff" },
    { nombre: "Beige", codigo: "#c4a98b" },
    { nombre: "Lilac", codigo: "#d2c9fe" },
    { nombre: "Aqua", codigo: "#99fbda" },
    { nombre: "Rosa", codigo: "#ffb6d9" },
    { nombre: "Aquamarine", codigo: "#9fc4d6" },
    { nombre: "Azul", codigo: "#202c44" },
    { nombre: "Verde Oliva", codigo: "#3f412c" },
    { nombre: "Verde Pino", codigo: "#16352e" }
];

const tallasAdulto = ["S", "M", "L", "XL"];
const tallasNiño = ["4", "6", "8", "10", "12", "14", "16"];

/* =====================================================
   ESTADO DEL PERSONALIZADOR Y CARRITO
===================================================== */

let configuracionActual = {
    diseño: diseños.find(diseño => diseño.disponible),
    color: colores[0],
    talla: "M",
    cantidad: 1
};

let carrito = [];

/* =====================================================
   ELEMENTOS DOM
===================================================== */

const designsContainer = document.getElementById("designsContainer");
const categoriesContainer = document.getElementById("categoriesContainer");
let categoriaActual = "Todos";

const colorsContainer = document.getElementById("colorsContainer");
const adultSizes = document.getElementById("adultSizes");
const childSizes = document.getElementById("childSizes");

const shirtPreview = document.getElementById("shirtPreview");
const shirtDesign = document.getElementById("shirtDesign");
const quantityElement = document.getElementById("quantity");
const selectedColorName = document.getElementById("selectedColorName");

const cartList = document.getElementById("cartList");
const cartCount = document.getElementById("cartCount");
const addToCartButton = document.getElementById("addToCartButton");

/* =====================================================
   RENDER CATEGORIAS Y DISEÑOS
===================================================== */

function renderCategorias() {
    categoriesContainer.innerHTML = "";
    const categorias = ["Todos", ...new Set(diseños.filter(d => d.disponible).map(d => d.categoria))];

    categorias.forEach(categoria => {
        const button = document.createElement("button");
        button.type = "button";
        button.className = "category-button";
        button.textContent = categoria;

        if (categoriaActual === categoria) button.classList.add("active");

        button.addEventListener("click", () => {
            categoriaActual = categoria;
            renderCategorias();
            renderDiseños();
        });

        categoriesContainer.appendChild(button);
    });
}

function renderDiseños() {
    designsContainer.innerHTML = "";

    diseños
        .filter(d => d.disponible && (categoriaActual === "Todos" || d.categoria === categoriaActual))
        .forEach(diseño => {
            const card = document.createElement("div");
            card.className = "design-card";
            if (configuracionActual.diseño && configuracionActual.diseño.id === diseño.id) {
                card.classList.add("selected");
            }

            const button = document.createElement("button");
            button.type = "button";

            const image = document.createElement("img");
            image.src = diseño.imagen;
            image.alt = diseño.nombre;

            const name = document.createElement("span");
            name.className = "design-name";
            name.textContent = diseño.nombre;

            button.appendChild(image);
            button.appendChild(name);
            card.appendChild(button);

            button.addEventListener("click", () => {
                configuracionActual.diseño = diseño;
                renderDiseños();
                actualizarVista();
            });

            designsContainer.appendChild(card);
        });
}

/* =====================================================
   RENDER COLORES Y TALLAS
===================================================== */

function renderColores() {
    colorsContainer.innerHTML = "";

    colores.forEach(color => {
        const button = document.createElement("button");
        button.type = "button";
        button.className = "color-option";
        button.title = color.nombre;
        button.style.background = color.codigo;

        if (configuracionActual.color.codigo === color.codigo) {
            button.classList.add("selected");
        }

        button.addEventListener("click", () => {
            configuracionActual.color = color;
            renderColores();
            actualizarVista();
        });

        colorsContainer.appendChild(button);
    });
}

function renderTallas() {
    adultSizes.innerHTML = "";
    childSizes.innerHTML = "";

    tallasAdulto.forEach(talla => crearBotonTalla(talla, adultSizes));
    tallasNiño.forEach(talla => crearBotonTalla(talla, childSizes));
}

function crearBotonTalla(talla, contenedor) {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "size-button";
    button.textContent = talla;

    if (configuracionActual.talla === talla) button.classList.add("selected");

    button.addEventListener("click", () => {
        configuracionActual.talla = talla;
        renderTallas();
        actualizarVista();
    });

    contenedor.appendChild(button);
}

/* =====================================================
   CANTIDAD Y VISTA PREVIA
===================================================== */

document.getElementById("increaseQuantity").addEventListener("click", () => {
    configuracionActual.cantidad++;
    actualizarVista();
});

document.getElementById("decreaseQuantity").addEventListener("click", () => {
    if (configuracionActual.cantidad > 1) {
        configuracionActual.cantidad--;
        actualizarVista();
    }
});

function actualizarVista() {
    if (!configuracionActual.diseño) return;

    shirtPreview.style.setProperty("--shirt-color", configuracionActual.color.codigo);
    shirtDesign.style.backgroundImage = `url("${configuracionActual.diseño.imagen}")`;
    selectedColorName.textContent = configuracionActual.color.nombre;
    quantityElement.textContent = configuracionActual.cantidad;
}

/* =====================================================
   GESTIÓN DEL CARRITO
===================================================== */

addToCartButton.addEventListener("click", () => {
    if (!configuracionActual.diseño) {
        alert("Selecciona un diseño antes de agregar.");
        return;
    }

    const item = {
        id: Date.now(),
        diseño: configuracionActual.diseño.nombre,
        color: configuracionActual.color.nombre,
        talla: configuracionActual.talla,
        cantidad: configuracionActual.cantidad
    };

    carrito.push(item);
    renderCarrito();
});

function renderCarrito() {
    cartList.innerHTML = "";
    
    const totalUnidades = carrito.reduce((acc, item) => acc + item.cantidad, 0);
    cartCount.textContent = totalUnidades;

    if (carrito.length === 0) {
        cartList.innerHTML = `<p class="empty-cart-text">Aún no has agregado ningún polo.</p>`;
        return;
    }

    carrito.forEach(item => {
        const itemElement = document.createElement("div");
        itemElement.className = "cart-item";

        itemElement.innerHTML = `
            <div class="cart-item-info">
                <strong>${item.diseño}</strong>
                <span>Color: ${item.color} | Talla: ${item.talla} | Cant.: ${item.cantidad}</span>
            </div>
            <button type="button" class="remove-item-btn" onclick="eliminarDelCarrito(${item.id})">✕</button>
        `;

        cartList.appendChild(itemElement);
    });
}

function eliminarDelCarrito(id) {
    carrito = carrito.filter(item => item.id !== id);
    renderCarrito();
}

/* =====================================================
   WHATSAPP
===================================================== */

document.getElementById("whatsappButton").addEventListener("click", () => {
    if (carrito.length === 0) {
        alert("Tu pedido está vacío. Agrega al menos un polo antes de comprar.");
        return;
    }

    let detallePedido = "";

    carrito.forEach((item, index) => {
        detallePedido += `\n📌 *Polo #${index + 1}*\n`;
        detallePedido += `• Diseño: ${item.diseño}\n`;
        detallePedido += `• Color: ${item.color}\n`;
        detallePedido += `• Talla: ${item.talla}\n`;
        detallePedido += `• Cantidad: ${item.cantidad}\n`;
    });

    const mensaje = 
`Hola 👋, quiero realizar el siguiente pedido en Midori Textil:

👕 *RESUMEN DEL PEDIDO (${carrito.length} modelos distintos)*
${detallePedido}
Quisiera confirmar disponibilidad y precio total. ¡Gracias!`;

    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(mensaje)}`;
    window.open(url, "_blank");
});

/* =====================================================
   INICIALIZACIÓN
===================================================== */

renderCategorias();
renderDiseños();
renderColores();
renderTallas();
actualizarVista();
