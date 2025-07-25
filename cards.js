/* postcillos*/

const listaPostres = [
  {
    imagen: {
      movil: "./assets/images/image-waffle-mobile.jpg",
      tablet: "./assets/images/image-waffle-tablet.jpg",
      escritorio: "./assets/images/image-waffle-desktop.jpg",
    },
    nombre: "Waffle with Berries",
    categoria: "Waffle",
    precio: 6.5,
  },
  {
    imagen: {
      movil: "./assets/images/image-creme-brulee-mobile.jpg",
      tablet: "./assets/images/image-creme-brulee-tablet.jpg",
      escritorio: "./assets/images/image-creme-brulee-desktop.jpg",
    },
    nombre: "Vanilla Bean Crème Brûlée",
    categoria: "Crème Brûlée",
    precio: 7.0,
  },
  {
    imagen: {
      movil: "./assets/images/image-macaron-mobile.jpg",
      tablet: "./assets/images/image-macaron-tablet.jpg",
      escritorio: "./assets/images/image-macaron-desktop.jpg",
    },
    nombre: "Macaron Mix of Five",
    categoria: "Macaron",
    precio: 8.0,
  },
  {
    imagen: {
      movil: "./assets/images/image-tiramisu-mobile.jpg",
      tablet: "./assets/images/image-tiramisu-tablet.jpg",
      escritorio: "./assets/images/image-tiramisu-desktop.jpg",
    },
    nombre: "Classic Tiramisu",
    categoria: "Tiramisu",
    precio: 5.5,
  },
  {
    imagen: {
      movil: "./assets/images/image-baklava-mobile.jpg",
      tablet: "./assets/images/image-baklava-tablet.jpg",
      escritorio: "./assets/images/image-baklava-desktop.jpg",
    },
    nombre: "Pistachio Baklava",
    categoria: "Baklava",
    precio: 4.0,
  },
  {
    imagen: {
      movil: "./assets/images/image-meringue-mobile.jpg",
      tablet: "./assets/images/image-meringue-tablet.jpg",
      escritorio: "./assets/images/image-meringue-desktop.jpg",
    },
    nombre: "Lemon Meringue Pie",
    categoria: "Pie",
    precio: 5.0,
  },
  {
    imagen: {
      movil: "./assets/images/image-cake-mobile.jpg",
      tablet: "./assets/images/image-cake-tablet.jpg",
      escritorio: "./assets/images/image-cake-desktop.jpg",
    },
    nombre: "Red Velvet Cake",
    categoria: "Cake",
    precio: 4.5,
  },
  {
    imagen: {
      movil: "./assets/images/image-brownie-mobile.jpg",
      tablet: "./assets/images/image-brownie-tablet.jpg",
      escritorio: "./assets/images/image-brownie-desktop.jpg",
    },
    nombre: "Salted Caramel Brownie",
    categoria: "Brownie",
    precio: 4.5,
  },
  {
    imagen: {
      movil: "./assets/images/image-panna-cotta-mobile.jpg",
      tablet: "./assets/images/image-panna-cotta-tablet.jpg",
      escritorio: "./assets/images/image-panna-cotta-desktop.jpg",
    },
    nombre: "Vanilla Panna Cotta",
    categoria: "Panna Cotta",
    precio: 6.5,
  },
];

const contenedorTarjetas = document.getElementById("tarjetas");
const contenedorElementosCarrito = document.querySelector(".elementos-carrito");
const cantidadCarrito = document.querySelector(".cantidad-carrito");
const totalCarrito = document.querySelector(".total-carrito");
const carrito = {};

/* dolor de cabeza */
function crearContador(nombre, cantidad) {
  return `
    <div class="flex items-center justify-center bg-[#ea6950] text-white rounded-full px-4 py-1.5 gap-4">
      <button class="btn-restar text-white text-xl font-bold" data-nombre="${nombre}">−</button>
      <span class="text-sm">${cantidad}</span>
      <button class="btn-sumar text-white text-xl font-bold" data-nombre="${nombre}">+</button>
    </div>
  `;
}

listaPostres.forEach((postre) => {
  const tarjeta = document.createElement("div");
  tarjeta.className =
    "rounded-xl bg-[#fef8f5] shadow-md p-3 font-sans hover:shadow-lg transition";

  tarjeta.innerHTML = `
    <div class="rounded-xl overflow-hidden">
      <img
        src="${postre.imagen.movil}"
        srcset="
          ${postre.imagen.movil} 480w,
          ${postre.imagen.tablet} 768w,
          ${postre.imagen.escritorio} 1024w
        "
        sizes="(max-width: 640px) 100vw,
               (max-width: 1024px) 50vw,
               33vw"
        alt="${postre.nombre}"
        class="w-full h-auto"
      />
    </div>
    
    <div class="-mt-5 flex justify-center z-10">
      <div class="envoltorio-boton" data-nombre="${postre.nombre}">
        <button class="btn-agregar bg-white text-[#ec6d47] border border-[#ec6d47] px-4 py-1.5 rounded-full text-sm font-semibold hover:bg-[#fff2ee] transition flex items-center gap-2 shadow-md" data-nombre="${
          postre.nombre
        }">
          <img src="./assets/images/icon-add-to-cart.svg" alt="Icono carrito" class="h-4 w-4" />
          Añadir al Carrito
        </button>
      </div>
    </div>
    <p class="mt-4 text-xs text-gray-500">${postre.categoria}</p>
    <p class="text-sm font-semibold text-gray-800">${postre.nombre}</p>
    <p class="text-[15px] font-bold text-[#ea6950]">$${postre.precio.toFixed(
      2
    )}</p>
  `;

  contenedorTarjetas.appendChild(tarjeta);
});

function actualizarCarrito() {
  contenedorElementosCarrito.innerHTML = "";
  let total = 0;
  let cantidad = 0;

  for (const nombre in carrito) {
    const item = carrito[nombre];
    total += item.precio * item.cantidad;
    cantidad += item.cantidad;

    contenedorElementosCarrito.innerHTML += `
      <div class="flex justify-between items-center py-2 border-b text-sm">
        <div>
          <p class="font-medium">${nombre}</p>
          <p class="text-gray-500">$${item.precio.toFixed(2)} x ${
      item.cantidad
    } = $${(item.precio * item.cantidad).toFixed(2)}</p>
        </div>
        <div class="flex items-center gap-2">
          <button class="btn-restar text-red-600 font-bold" data-nombre="${nombre}">-</button>
          <span>${item.cantidad}</span>
          <button class="btn-sumar text-green-600 font-bold" data-nombre="${nombre}">+</button>
        </div>
      </div>
    `;
  }

  if (cantidad === 0) {
    contenedorElementosCarrito.innerHTML =
      '<p class="text-gray-500 text-sm text-center">Agregar productos</p>';
  }

  cantidadCarrito.textContent = cantidad;
  totalCarrito.textContent = total.toFixed(2);
}

function actualizarContador(nombre) {
  const envoltorio = document.querySelector(
    `.envoltorio-boton[data-nombre="${nombre}"]`
  );
  if (envoltorio && carrito[nombre]) {
    envoltorio.innerHTML = crearContador(nombre, carrito[nombre].cantidad);
  }
}

document.body.addEventListener("click", (e) => {
  const botonAgregar = e.target.closest(".btn-agregar");
  const botonSumar = e.target.closest(".btn-sumar");
  const botonRestar = e.target.closest(".btn-restar");

  if (botonAgregar) {
    const nombre = botonAgregar.dataset.nombre;
    const producto = listaPostres.find((p) => p.nombre === nombre);
    const envoltorio = document.querySelector(
      `.envoltorio-boton[data-nombre="${nombre}"]`
    );

    carrito[nombre] = { ...producto, cantidad: 1 };
    actualizarCarrito();

    envoltorio.innerHTML = crearContador(nombre, 1);
  }

  if (botonSumar) {
    const nombre = botonSumar.dataset.nombre;
    if (carrito[nombre]) {
      carrito[nombre].cantidad += 1;
      actualizarCarrito();
      actualizarContador(nombre);
    }
  }

  if (botonRestar) {
    const nombre = botonRestar.dataset.nombre;
    if (carrito[nombre]) {
      carrito[nombre].cantidad -= 1;
      if (carrito[nombre].cantidad <= 0) {
        delete carrito[nombre];
        const envoltorio = document.querySelector(
          `.envoltorio-boton[data-nombre="${nombre}"]`
        );
        envoltorio.innerHTML = `
          <button class="btn-agregar bg-white text-[#ec6d47] border border-[#ec6d47] px-4 py-1.5 rounded-full text-sm font-semibold hover:bg-[#fff2ee] transition flex items-center gap-2 shadow-md" data-nombre="${nombre}">
            <img src="./assets/images/icon-add-to-cart.svg" alt="Icono carrito" class="h-4 w-4" />
            Añadir al Carrito
          </button>
        `;
      } else {
        actualizarContador(nombre);
      }
      actualizarCarrito();
    }
  }
});

function abrirModal() {
  const confirmarPedido = document.querySelector("#confirmar-pedido");

  if (!confirmarPedido) {
    console.error("No se encontró el botón #confirmar-pedido");
    return;
  }

  confirmarPedido.addEventListener("click", () => {
    
    if (document.querySelector(".modal-overlay")) {
      return;
    }

    const modalHTML = `
      <div class="modal-overlay fixed inset-0 bg-gray bg-opacity-40 flex items-center justify-center z-50">
        <div class="contenedor-carrito w-full max-w-md mx-4">
       
        <div class="bg-white rounded-xl shadow-md p-6 w-full">
              <button class="cerrar-modal  text-white w-full mt-2 py-2 rounded-md ">
                <img src="./assets/images/icon-order-confirmed.svg" class="size-8">
              </button>
              <h2 class="text-4xl font-bold text-black mb-4">
                Order Confirmed
              </h2>
              <p class="text-orange-900 text mt-4">
              ¡Esperamos que hayas disfrutado la comida!
              </p>
              
              <div class="elementos-carrito-modal bg-[#fcf8f5] rounded-xl p-4 mt-4">
                <p class=" text-gray-500 text-sm text-center ">Agregar productos</p>
              </div>
              
              <p class="text-gray-700 font-bold text-right  flex justify-between bg-[#fcf8f5] mt-0 h-10">
                Total <span class="total-carrito-modal">$0.00</span>
              </p>
              <button class="confirmar-pedido-final bg-[#ea6950] text-white w-full mt-4 py-2 rounded-full hover:bg-[#d85a3f] transition">
                Empezar nueva orden
              </button>
        
         </div>
        </div>
      </div>`;

    document.body.insertAdjacentHTML("beforeend", modalHTML);

    // Actualizar el contenido del modal con los datos actuales del carrito
    actualizarCarritoModal();

    // Agregar funcionalidad para cerrar el modal
    document.querySelector(".cerrar-modal").addEventListener("click", () => {
      document.querySelector(".modal-overlay").remove();
    });

    // Cerrar modal al hacer clic en el overlay
    document.querySelector(".modal-overlay").addEventListener("click", (e) => {
      if (e.target.classList.contains("modal-overlay")) {
        document.querySelector(".modal-overlay").remove();
      }
    });
  });
}

// Función para actualizar el carrito en el modal
function actualizarCarritoModal() {
  const elementosCarritoModal = document.querySelector(
    ".elementos-carrito-modal"
  );
  const cantidadCarritoModal = document.querySelector(
    ".cantidad-carrito-modal"
  );
  const totalCarritoModal = document.querySelector(".total-carrito-modal");

  if (!elementosCarritoModal) return;

  elementosCarritoModal.innerHTML = "";
  let total = 0;
  let cantidad = 0;

  for (const nombre in carrito) {
    const item = carrito[nombre];
    total += item.precio * item.cantidad;
    cantidad += item.cantidad;

    elementosCarritoModal.innerHTML += `
      <div class="flex justify-between items-center py-2 border-b text-sm">
        <div>
          <p class="font-medium">${nombre}</p>
          <p class="text-gray-500">${item.cantidad}x <span class="mr-8">@${item.precio.toFixed(2)}</span></p>

        </div>
        <span class="font-bold">$${(item.precio * item.cantidad).toFixed(2)}</span>
      </div>
    `;
  }

  if (cantidad === 0) {
    elementosCarritoModal.innerHTML =
      '<p class="text-gray-500 text-sm text-center">No hay productos en el carrito</p>';
  }

  if (cantidadCarritoModal) cantidadCarritoModal.textContent = cantidad;
  if (totalCarritoModal) totalCarritoModal.textContent = `$${total.toFixed(2)}`;
}

// Llamar a la función cuando el DOM esté cargado
document.addEventListener("DOMContentLoaded", () => {
  abrirModal();
});

// Si el DOM ya está cargado, ejecutar inmediatamente
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", abrirModal);
} else {
  abrirModal();
}

