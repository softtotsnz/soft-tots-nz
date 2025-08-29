// Productos de ejemplo (puedes cambiarlos por los reales)
const productos = [
  {
    id: 1,
    nombre: "Scrunchie de Lana",
    precio: 5.99,
    img: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?fit=crop&w=400&q=80",
    descripcion: "Scrunchie tejido a mano en lana suave, varios colores."
  },
  {
    id: 2,
    nombre: "Bufanda Arcoiris",
    precio: 24.99,
    img: "https://images.unsplash.com/photo-1464983953574-0892a716854b?fit=crop&w=400&q=80",
    descripcion: "Bufanda larga y cálida, tejida a mano con hilo multicolor."
  },
  {
    id: 3,
    nombre: "Muñeco Dormilón Bebé",
    precio: 18.50,
    img: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?fit=crop&w=400&q=80",
    descripcion: "Muñeco de apego para bebés, hecho a mano con hilo hipoalergénico."
  },
  {
    id: 4,
    nombre: "Set de Scrunchies",
    precio: 13.99,
    img: "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?fit=crop&w=400&q=80",
    descripcion: "Set de 3 scrunchies tejidos en hilo y lana, colores surtidos."
  }
];

// Mostrar productos destacados en index.html
if (document.getElementById('destacados')) {
  let destacadosHTML = '';
  productos.slice(0, 3).forEach(prod => {
    destacadosHTML += `
      <div class="producto-card">
        <img src="${prod.img}" alt="${prod.nombre}">
        <h4>${prod.nombre}</h4>
        <p>${prod.descripcion}</p>
        <p><strong>$${prod.precio.toFixed(2)}</strong></p>
        <button class="btn" onclick="agregarAlCarrito(${prod.id})">Agregar al carrito</button>
      </div>
    `;
  });
  document.getElementById('destacados').innerHTML = destacadosHTML;
}

// Mostrar todos los productos en productos.html
if (document.getElementById('productos-lista')) {
  let productosHTML = '';
  productos.forEach(prod => {
    productosHTML += `
      <div class="producto-card">
        <img src="${prod.img}" alt="${prod.nombre}">
        <h4>${prod.nombre}</h4>
        <p>${prod.descripcion}</p>
        <p><strong>$${prod.precio.toFixed(2)}</strong></p>
        <button class="btn" onclick="agregarAlCarrito(${prod.id})">Agregar al carrito</button>
      </div>
    `;
  });
  document.getElementById('productos-lista').innerHTML = productosHTML;
}

// Carrito en LocalStorage
function obtenerCarrito() {
  return JSON.parse(localStorage.getItem('carrito') || '[]');
}
function guardarCarrito(carrito) {
  localStorage.setItem('carrito', JSON.stringify(carrito));
}
function agregarAlCarrito(id) {
  const carrito = obtenerCarrito();
  const prod = productos.find(p => p.id === id);
  const existe = carrito.find(item => item.id === id);
  if (existe) {
    existe.cantidad += 1;
  } else {
    carrito.push({ ...prod, cantidad: 1 });
  }
  guardarCarrito(carrito);
  alert('Producto agregado al carrito');
}

// Mostrar carrito en carrito.html
if (document.getElementById('carrito-contenido')) {
  function mostrarCarrito() {
    const carrito = obtenerCarrito();
    if (carrito.length === 0) {
      document.getElementById('carrito-contenido').innerHTML = "<p>El carrito está vacío.</p>";
      return;
    }
    let total = 0;
    let html = '<table><tr><th>Producto</th><th>Cantidad</th><th>Precio</th><th>Subtotal</th><th></th></tr>';
    carrito.forEach(item => {
      const subtotal = item.precio * item.cantidad;
      total += subtotal;
      html += `<tr>
        <td>${item.nombre}</td>
        <td>${item.cantidad}</td>
        <td>$${item.precio.toFixed(2)}</td>
        <td>$${subtotal.toFixed(2)}</td>
        <td><button onclick="eliminarDelCarrito(${item.id})">Eliminar</button></td>
      </tr>`;
    });
    html += `</table><h3>Total: $${total.toFixed(2)}</h3>`;
    document.getElementById('carrito-contenido').innerHTML = html;
  }
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

// Sugerencias (solo demo, muestra mensaje)
if (document.getElementById('form-sugerencias')) {
  document.getElementById('form-sugerencias').onsubmit = function(e) {
    e.preventDefault();
    document.getElementById('mensaje-confirmacion').innerText = "¡Gracias por tu sugerencia!";
    document.getElementById('form-sugerencias').reset();
  }
}