// Traducciones
const translations = {
  en: {
    menu_home: "Home",
    menu_products: "Products",
    menu_cart: "Cart",
    menu_suggestions: "Suggestions",
    menu_contact: "Contact",
    welcome_title: "Welcome to SOFT TOTS NZ",
    welcome_desc: "Handmade knitted products: scrunchies, scarves, cuddly toys for babies and more.",
    see_catalog: "See catalog",
    featured_products: "Featured Products",
    catalog_title: "Product Catalog",
    your_cart: "Your Cart",
    empty_cart: "Empty Cart",
    leave_suggestion: "Leave us your suggestion",
    suggestion_placeholder: "Write your suggestion here...",
    send: "Send",
    thanks_suggestion: "Thank you for your suggestion!",
    contact_title: "Contact",
    contact_desc: "Do you have questions or want to make a custom order? Write to us on our social networks:",
    cart_empty: "Your cart is empty.",
    product: "Product",
    quantity: "Quantity",
    price: "Price",
    subtotal: "Subtotal",
    remove: "Remove",
    total: "Total"
  },
  es: {
    menu_home: "Inicio",
    menu_products: "Productos",
    menu_cart: "Carrito",
    menu_suggestions: "Sugerencias",
    menu_contact: "Contacto",
    welcome_title: "Bienvenido a SOFT TOTS NZ",
    welcome_desc: "Venta de productos tejidos a mano: scrunchies, bufandas, muñecos dormilones para bebés y más.",
    see_catalog: "Ver catálogo",
    featured_products: "Productos Destacados",
    catalog_title: "Catálogo de Productos",
    your_cart: "Tu Carrito",
    empty_cart: "Vaciar Carrito",
    leave_suggestion: "Dejanos tu sugerencia",
    suggestion_placeholder: "Escribe aquí tu sugerencia...",
    send: "Enviar",
    thanks_suggestion: "¡Gracias por tu sugerencia!",
    contact_title: "Contacto",
    contact_desc: "¿Tienes dudas o quieres hacer un pedido personalizado? Escríbenos por nuestras redes sociales:",
    cart_empty: "El carrito está vacío.",
    product: "Producto",
    quantity: "Cantidad",
    price: "Precio",
    subtotal: "Subtotal",
    remove: "Eliminar",
    total: "Total"
  }
};

let lang = localStorage.getItem('lang') || 'en';

// Traduce todos los elementos con data-i18n
function translatePage() {
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (translations[lang][key]) el.textContent = translations[lang][key];
  });
  // Placeholder de sugerencia
  document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
    const key = el.getAttribute('data-i18n-placeholder');
    if (translations[lang][key]) el.placeholder = translations[lang][key];
  });
}

// Cambia idioma al seleccionar
const langSwitcher = document.getElementById('language-switcher');
if (langSwitcher) {
  langSwitcher.value = lang;
  langSwitcher.addEventListener('change', e => {
    lang = e.target.value;
    localStorage.setItem('lang', lang);
    translatePage();
    renderProducts();
    if (typeof mostrarCarrito === "function") mostrarCarrito();
  });
}
// Traduce al cargar
document.addEventListener('DOMContentLoaded', () => {
  translatePage();
  if (langSwitcher) langSwitcher.value = lang;
});

// ---------- Productos y Carrito ----------
const productos = [
  {
    id: 1,
    nombre: {en: "Wool Scrunchie", es: "Scrunchie de Lana"},
    precio: 5.99,
    img: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?fit=crop&w=400&q=80",
    descripcion: {
      en: "Hand-knitted wool scrunchie, soft touch, various colors. Like grandma made it just for you!",
      es: "Scrunchie tejido a mano en lana suave, varios colores. ¡Como si fuera tejido por la abuela solo para ti!"
    }
  },
  {
    id: 2,
    nombre: {en: "Rainbow Scarf", es: "Bufanda Arcoiris"},
    precio: 24.99,
    img: "https://images.unsplash.com/photo-1464983953574-0892a716854b?fit=crop&w=400&q=80",
    descripcion: {
      en: "Long, cozy scarf, hand-knitted with multicolor yarn. Wrap yourself in warmth and affection.",
      es: "Bufanda larga y cálida, tejida a mano con hilo multicolor. Abrígate con cariño y suavidad."
    }
  },
  {
    id: 3,
    nombre: {en: "Cuddly Baby Toy", es: "Muñeco Dormilón Bebé"},
    precio: 18.50,
    img: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?fit=crop&w=400&q=80",
    descripcion: {
      en: "Cuddly handmade toy for babies, hypoallergenic yarn, with grandma's love in every stitch.",
      es: "Muñeco de apego para bebés, hecho a mano con hilo hipoalergénico. ¡Con amor de abuela en cada puntada!"
    }
  },
  {
    id: 4,
    nombre: {en: "Scrunchies Set", es: "Set de Scrunchies"},
    precio: 13.99,
    img: "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?fit=crop&w=400&q=80",
    descripcion: {
      en: "Set of 3 hand-knitted scrunchies, mixed colors. A gift that feels like a grandma's hug.",
      es: "Set de 3 scrunchies tejidos en hilo y lana, colores surtidos. Un regalo que abraza como la abuela."
    }
  }
];

// Render productos destacados o lista
function renderProducts() {
  // Destacados en index.html
  if (document.getElementById('destacados')) {
    let destacadosHTML = '';
    productos.slice(0, 3).forEach(prod => {
      destacadosHTML += `
        <div class="producto-card">
          <img src="${prod.img}" alt="${prod.nombre[lang]}">
          <h4>${prod.nombre[lang]}</h4>
          <p>${prod.descripcion[lang]}</p>
          <p><strong>$${prod.precio.toFixed(2)}</strong></p>
          <button class="btn" onclick="agregarAlCarrito(${prod.id})">${translations[lang].see_catalog}</button>
        </div>
      `;
    });
    document.getElementById('destacados').innerHTML = destacadosHTML;
  }
  // Todos en productos.html
  if (document.getElementById('productos-lista')) {
    let productosHTML = '';
    productos.forEach(prod => {
      productosHTML += `
        <div class="producto-card">
          <img src="${prod.img}" alt="${prod.nombre[lang]}">
          <h4>${prod.nombre[lang]}</h4>
          <p>${prod.descripcion[lang]}</p>
          <p><strong>$${prod.precio.toFixed(2)}</strong></p>
          <button class="btn" onclick="agregarAlCarrito(${prod.id})">${translations[lang].see_catalog}</button>
        </div>
      `;
    });
    document.getElementById('productos-lista').innerHTML = productosHTML;
  }
}
window.agregarAlCarrito = function(id) {
  const carrito = obtenerCarrito();
  const prod = productos.find(p => p.id === id);
  const existe = carrito.find(item => item.id === id);
  if (existe) {
    existe.cantidad += 1;
  } else {
    carrito.push({ ...prod, cantidad: 1 });
  }
  guardarCarrito(carrito);
  alert(lang === 'es' ? 'Producto agregado al carrito' : 'Product added to cart');
};
function obtenerCarrito() {
  return JSON.parse(localStorage.getItem('carrito') || '[]');
}
function guardarCarrito(carrito) {
  localStorage.setItem('carrito', JSON.stringify(carrito));
}

// Carrito en carrito.html
if (document.getElementById('carrito-contenido')) {
  window.mostrarCarrito = function() {
    const carrito = obtenerCarrito();
    if (carrito.length === 0) {
      document.getElementById('carrito-contenido').innerHTML = `<p>${translations[lang].cart_empty}</p>`;
      return;
    }
    let total = 0;
    let html = `<table><tr>
      <th>${translations[lang].product}</th>
      <th>${translations[lang].quantity}</th>
      <th>${translations[lang].price}</th>
      <th>${translations[lang].subtotal}</th>
      <th></th></tr>`;
    carrito.forEach(item => {
      const subtotal = item.precio * item.cantidad;
      total += subtotal;
      html += `<tr>
        <td>${item.nombre[lang]}</td>
        <td>${item.cantidad}</td>
        <td>$${item.precio.toFixed(2)}</td>
        <td>$${subtotal.toFixed(2)}</td>
        <td><button onclick="eliminarDelCarrito(${item.id})">${translations[lang].remove}</button></td>
      </tr>`;
    });
    html += `</table><h3>${translations[lang].total}: $${total.toFixed(2)}</h3>`;
    document.getElementById('carrito-contenido').innerHTML = html;
  };
  window.eliminarDelCarrito = function(id) {
    let carrito = obtenerCarrito();
    carrito = carrito.filter(item => item.id !== id);
    guardarCarrito(carrito);
    mostrarCarrito();
  };
  document.getElementById('vaciar-carrito').onclick = function() {
    guardarCarrito([]);
    mostrarCarrito();
  };
  mostrarCarrito();
}

// Sugerencias form
if (document.getElementById('form-sugerencias')) {
  document.getElementById('form-sugerencias').onsubmit = function(e) {
    e.preventDefault();
    document.getElementById('mensaje-confirmacion').innerText = translations[lang].thanks_suggestion;
    document.getElementById('form-sugerencias').reset();
  }
}

// Render productos y traducción inicial
document.addEventListener('DOMContentLoaded', () => {
  renderProducts();
});
