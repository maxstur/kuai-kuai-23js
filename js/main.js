
// Clase "molde" para los items del juego
class Item {
  constructor(nombre, precio, imagen) {
    this.nombre = nombre;
    this.precio = precio;
    this.imagen = imagen;
  }
}

// Items del juego
const escudo = new Item("Escudo de Poder", 100, "../img/escudo-kuai_kuai.png");
const espada = new Item("Espada Letal", 180, "../img/espada-kuai_kuai.png");
const estrella = new Item("Estrella Ninja", 90, "../img/estrella-kuai_kuai.png");

// Array para el inventario donde vamos a ir metiendo los items que compremos
const inventario = [];

// Coin del juego
let coin = 800;

// Elementos del DOM
const elCoin = document.querySelector("#coin span");
elCoin.innerText = coin; // Para que muestre el oro apenas carga la aplicación}
const elInventario = document.getElementById("inventario");

// Función para agregar items a nuestro inventario
function comprar(itemDelJuego) {
  // Verificamos si tenemos el Coin disponible para la compra
  if (coin - itemDelJuego.precio >= 0) {
    inventario.push(itemDelJuego);
    coin -= itemDelJuego.precio; // Actualizamos el Coin
    actualizarHTML();
  } else {
    alert(`No tenés coins suficientes para comprar ${itemDelJuego.nombre}.`);
  }
}

// Función para vender un item
function vender(nombreDelItem) {
  // Buscamos el item con find
  const itemEncontrado = inventario.find((item) => item.nombre == nombreDelItem);

  // Si está en el inventario, lo volamos y actualizamos el HTML
  if (itemEncontrado) {
    // Actualizamos el Coin
    coin += itemEncontrado.precio;
    // Lo volamos del inventario
    const indice = inventario.indexOf(itemEncontrado);
    inventario.splice(indice, 1);
    // Actualizamos el HTML
    actualizarHTML();
  }
}

// Función para actualizar el HTML de la aplicación (Coin e items)
function actualizarHTML() {
  elInventario.innerHTML = "";
  for (const itemDelJuego of inventario) {
    const li = `
    <li onclick="vender('${itemDelJuego.nombre}')">
      <img src="img/${itemDelJuego.imagen}" alt="${itemDelJuego.imagen}" />
    </li>
    `;
    // Va a ir concatenando los li creados en el elemento #inventario (ul)
    elInventario.innerHTML += li;
  }
  elCoin.innerText = coin;
}