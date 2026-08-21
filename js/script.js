/* =====================================================
   MIDORI TEXTIL
   CONFIGURACIÓN
===================================================== */


/*
    IMPORTANTE:

    Cambia este número por el WhatsApp de Midori Textil.

    Formato:
    código de país + número

    Perú:
    51 + número

    Ejemplo:
    51987654321
*/

const WHATSAPP_NUMBER = "51940258118";


/* =====================================================
   DISEÑOS
===================================================== */


/*
    Para agregar un diseño nuevo:

    1. Coloca la imagen dentro de:

       assets/diseños/

    2. Agrega un objeto aquí.

    Para retirar un diseño:

       disponible: false

    Ese diseño desaparecerá automáticamente
    del catálogo.
*/

const diseños = [

    {
        id: 1,
        nombre: "Diseño #001",
        imagen: "assets/diseños/diseño-001.png",
        categoria: "Anime",
        disponible: true
    },

    {
        id: 2,
        nombre: "Diseño #002",
        imagen: "assets/diseños/diseño-002.png",
        categoria: "Anime",
        disponible: true
    },

    {
        id: 3,
        nombre: "Diseño #003",
        imagen: "assets/diseños/diseño-003.png",
        categoria: "Gaming",
        disponible: true
    },

    {
        id: 4,
        nombre: "Diseño #004",
        imagen: "assets/diseños/diseño-004.png",
        categoria: "Frase",
        disponible: false
    }

];


/* =====================================================
   COLORES
===================================================== */

const colores = [

    {
        nombre: "Negro",
        codigo: "#171717"
    },

    {
        nombre: "Blanco",
        codigo: "#ffffff"
    },

    {
        nombre: "Beige",
        codigo: "#c4a98b"
    },

    {
        nombre: "Lilac",
        codigo: "#d2c9fe"
    },

    {
        nombre: "Aqua",
        codigo: "#99fbda"
    },

    {
        nombre: "Rosa",
        codigo: "#ffb6d9"
    },

    {
        nombre: "Aquamarine",
        codigo: "#9fc4d6"
    },

    {
        nombre: "Azul",
        codigo: "#202c44"
    },

    {
        nombre: "Verde Oliva",
        codigo: "#3f412c"
    },

    {
        nombre: "Verde Pino",
        codigo: "#16352e"
    }

    

];


/* =====================================================
   TALLAS
===================================================== */

const tallasAdulto = [
    "S",
    "M",
    "L",
    "XL"
];


const tallasNiño = [
    "4",
    "6",
    "8",
    "10",
    "12",
    "14",
    "16"
];


/* =====================================================
   ESTADO DEL PERSONALIZADOR
===================================================== */

let pedido = {

    diseño: diseños.find(
        diseño => diseño.disponible
    ),

    color: colores[0],

    talla: "M",

    cantidad: 1

};


/* =====================================================
   ELEMENTOS DOM
===================================================== */

const designsContainer =
    document.getElementById(
        "designsContainer"
    );

const categoriesContainer =
    document.getElementById(
        "categoriesContainer"
    );
let categoriaActual = "Todos";


const colorsContainer =
    document.getElementById(
        "colorsContainer"
    );


const adultSizes =
    document.getElementById(
        "adultSizes"
    );


const childSizes =
    document.getElementById(
        "childSizes"
    );


const shirtPreview =
    document.getElementById(
        "shirtPreview"
    );

const shirtBase =
    document.getElementById("shirtBase");

const shirtDesign =
    document.getElementById(
        "shirtDesign"
    );


const quantityElement =
    document.getElementById(
        "quantity"
    );


const selectedColorName =
    document.getElementById(
        "selectedColorName"
    );


const summaryDesign =
    document.getElementById(
        "summaryDesign"
    );


const summaryColor =
    document.getElementById(
        "summaryColor"
    );


const summarySize =
    document.getElementById(
        "summarySize"
    );


const summaryQuantity =
    document.getElementById(
        "summaryQuantity"
    );


/* =====================================================
   RENDER CATEGORIAS
===================================================== */

function renderCategorias() {

    categoriesContainer.innerHTML = "";

    const categorias = [
        "Todos",
        ...new Set(
            diseños
                .filter(diseño => diseño.disponible)
                .map(diseño => diseño.categoria)
        )
    ];


    categorias.forEach(
        categoria => {

            const button =
                document.createElement("button");


            button.type = "button";

            button.className =
                "category-button";


            button.textContent =
                categoria;


            if (
                categoriaActual === categoria
            ) {

                button.classList.add(
                    "active"
                );

            }


            button.addEventListener(
                "click",
                () => {

                    categoriaActual =
                        categoria;

                    renderCategorias();

                    renderDiseños();

                }
            );


            categoriesContainer.appendChild(
                button
            );

        }
    );
}


/* =====================================================
   RENDER DISEÑOS
===================================================== */

function renderDiseños() {

    designsContainer.innerHTML = "";


    diseños
        .filter(
            diseño => {

                if (!diseño.disponible) {
                    return false;
                }

                if (categoriaActual === "Todos") {
                    return true;
                }

                return diseño.categoria === categoriaActual;

            }
        )
        .forEach(
            diseño => {

                const card =
                    document.createElement(
                        "div"
                    );


                card.className =
                    "design-card";


                if (
                    pedido.diseño &&
                    pedido.diseño.id === diseño.id
                ) {

                    card.classList.add(
                        "selected"
                    );

                }


                const button =
                    document.createElement(
                        "button"
                    );


                button.type =
                    "button";


                const image =
                    document.createElement(
                        "img"
                    );


                image.src =
                    diseño.imagen;


                image.alt =
                    diseño.nombre;


                const name =
                    document.createElement(
                        "span"
                    );


                name.className =
                    "design-name";


                name.textContent =
                    diseño.nombre;


                button.appendChild(image);

                button.appendChild(name);

                card.appendChild(button);


                button.addEventListener(
                    "click",
                    () => {

                        pedido.diseño =
                            diseño;

                        renderDiseños();

                        actualizarVista();

                    }
                );


                designsContainer.appendChild(
                    card
                );

            }
        );

}


/* =====================================================
   RENDER COLORES
===================================================== */

function renderColores() {

    colorsContainer.innerHTML = "";


    colores.forEach(
        color => {

            const button =
                document.createElement(
                    "button"
                );


            button.type =
                "button";


            button.className =
                "color-option";


            button.title =
                color.nombre;


            button.style.background =
                color.codigo;


            if (
                pedido.color.codigo ===
                color.codigo
            ) {

                button.classList.add(
                    "selected"
                );

            }


            button.addEventListener(
                "click",
                () => {

                    pedido.color =
                        color;

                    renderColores();

                    actualizarVista();

                }
            );


            colorsContainer.appendChild(
                button
            );

        }
    );

}


/* =====================================================
   RENDER TALLAS
===================================================== */

function renderTallas() {

    adultSizes.innerHTML = "";

    childSizes.innerHTML = "";


    tallasAdulto.forEach(
        talla => {

            crearBotonTalla(
                talla,
                adultSizes
            );

        }
    );


    tallasNiño.forEach(
        talla => {

            crearBotonTalla(
                talla,
                childSizes
            );

        }
    );

}


function crearBotonTalla(
    talla,
    contenedor
) {

    const button =
        document.createElement(
            "button"
        );


    button.type =
        "button";


    button.className =
        "size-button";


    button.textContent =
        talla;


    if (
        pedido.talla === talla
    ) {

        button.classList.add(
            "selected"
        );

    }


    button.addEventListener(
        "click",
        () => {

            pedido.talla =
                talla;

            renderTallas();

            actualizarVista();

        }
    );


    contenedor.appendChild(
        button
    );

}


/* =====================================================
   ACTUALIZAR VISTA
===================================================== */

function actualizarVista() {

    //shirtBase.style.filter = obtenerFiltroColor( pedido.color.codigo);  

    if (!pedido.diseño) {
        return;
    }


    /* COLOR DEL POLO */

    shirtPreview.style.setProperty(
        "--shirt-color",
        pedido.color.codigo
    );


    /* DISEÑO */

    shirtDesign.style.backgroundImage =
        `url("${pedido.diseño.imagen}")`;


    /* NOMBRE DEL COLOR */

    selectedColorName.textContent =
        pedido.color.nombre;


    /* RESUMEN */

    summaryDesign.textContent =
        pedido.diseño.nombre;


    summaryColor.textContent =
        pedido.color.nombre;


    summarySize.textContent =
        pedido.talla;


    summaryQuantity.textContent =
        pedido.cantidad;


    quantityElement.textContent =
        pedido.cantidad;

}


/* =====================================================
   FILTROS COLORES  --  obsoleta "borrar despues"
===================================================== */
/*
function obtenerFiltroColor(color) {

    const filtros = {

        // Negro
        "#171717":
            "brightness(0.12)",

        // Blanco
        "#ffffff":
            "brightness(1.05)",

        // Beige
        "#c4a98b":
            "sepia(0.35) saturate(1.7) brightness(0.8)",

        // Lilac
        "#d2c9fe":
            "sepia(0.35) saturate(1.8) hue-rotate(205deg) brightness(0.9)",

        // Aqua
        "#99fbda":
            "sepia(0.25) saturate(1.5) hue-rotate(100deg) brightness(1)",

        // Rosa
        "#ffb6d9":
            "sepia(0.2) saturate(1.8) hue-rotate(300deg) brightness(1)",

        // Aquamarine
        "#9fc4d6":
            "sepia(0.2) saturate(1.4) hue-rotate(165deg) brightness(1)",

        // Azul
        "#202c44":
            "sepia(0.5) saturate(3.5) hue-rotate(180deg) brightness(0.6) contrast(1.2)"

    };

    return filtros[color.toLowerCase()] || "none";
}
*/


/* =====================================================
   CANTIDAD
===================================================== */

document
    .getElementById(
        "increaseQuantity"
    )
    .addEventListener(
        "click",
        () => {

            pedido.cantidad++;

            actualizarVista();

        }
    );


document
    .getElementById(
        "decreaseQuantity"
    )
    .addEventListener(
        "click",
        () => {

            if (
                pedido.cantidad > 1
            ) {

                pedido.cantidad--;

                actualizarVista();

            }

        }
    );


/* =====================================================
   WHATSAPP
===================================================== */

document
    .getElementById(
        "whatsappButton"
    )
    .addEventListener(
        "click",
        () => {

            if (!pedido.diseño) {

                alert(
                    "Selecciona un diseño."
                );

                return;

            }


            const mensaje =

`Hola 👋, quiero realizar un pedido en Midori Textil.

👕 *Polo personalizado*

🎨 Diseño: ${pedido.diseño.nombre}
🌈 Color: ${pedido.color.nombre}
📏 Talla: ${pedido.talla}
🔢 Cantidad: ${pedido.cantidad}

Quisiera confirmar disponibilidad y precio. ¡Gracias!`;


            const url =
                `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
                    mensaje
                )}`;


            window.open(
                url,
                "_blank"
            );

        }
    );


/* =====================================================
   INICIALIZACIÓN
===================================================== */

renderCategorias();

renderDiseños();

renderColores();

renderTallas();

actualizarVista();