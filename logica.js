const shop = document.getElementById("shop");
const verCarrito = document.getElementById("verCarrito");
const modalContainer = document.getElementById("modal-container");
const cantidadCarrito = document.getElementById("cantidadCarrito");

let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

productos.forEach((product) => {
let contenido = document.createElement("div");
contenido.className = "card";
  contenido.innerHTML = `
    <img src="${product.img}">
    <h3>${product.nombre}</h3>
    <p class="price">${product.precio} $</p>
  `;

  shop.append(contenido);

  let comprar = document.createElement("button");
  comprar.innerText = "comprar";
  comprar.className = "comprar";

  contenido.append(comprar);

  comprar.addEventListener("click", () => {
    const repeat = carrito.some((repeatProduct) => repeatProduct.id === product.id);

    if (repeat) {
      carrito.map((prod) => {
        if (prod.id === product.id) {
          prod.cantidad++;
        }
      });
      } else {
      carrito.push({
        id: product.id,
        img: product.img,
        nombre: product.nombre,
        precio: product.precio,
        cantidad: product.cantidad,
      });
      console.log(carrito);
      console.log(carrito.length);
      contadorCarrito();
      saveLocal();
    }
  });
  });


  const saveLocal = () => {
  localStorage.setItem("carrito", JSON.stringify(carrito));
  };


  const headCarrito = () => {
modalContainer.innerHTML = "";
modalContainer.style.display = "flex";
const modalHeader = document.createElement("div");
modalHeader.className = "modal-header";
modalHeader.innerHTML = `
<h3 class="modal-header-title">Tu carrito de compras</h3>
`;
modalContainer.append(modalHeader);
  
const modalbutton = document.createElement("h1");
modalbutton.innerText = "x";
modalbutton.className = "modal-header-button";
  
modalbutton.addEventListener("click", () => {
modalContainer.style.display = "none";
});
  
modalHeader.append(modalbutton);
  
carrito.forEach((product) => {
let carritoContent = document.createElement("div");
carritoContent.className = "modal-content";
carritoContent.innerHTML = `
<img src="${product.img}">
<h3>${product.nombre}</h3>
<p>${product.precio} $</p>
<span class="restar"> - </span>
<p>${product.cantidad}</p>
<span class="sumar"> + </span>
<p>Total: ${product.cantidad * product.precio} $</p>
<span class="delete-product"> ❌ </span>
        `;
  
modalContainer.append(carritoContent);
  
let restar = carritoContent.querySelector(".restar");
  
        restar.addEventListener("click", () => {
        if (product.cantidad !== 1) {
        product.cantidad--;
        }
        saveLocal();
        headCarrito();
      });
  
      let sumar = carritoContent.querySelector(".sumar");
      sumar.addEventListener("click", () => {
        product.cantidad++;
        saveLocal();
        headCarrito();
      });
  
      let eliminar = carritoContent.querySelector(".delete-product");
  
      eliminar.addEventListener("click", () => {
        eliminarProducto(product.id);
      });
  
      
    });
  
    const total = carrito.reduce((acc, el) => acc + el.precio * el.cantidad, 0);
  
    const totalCompra = document.createElement("div");
    totalCompra.className = "total-content";
    totalCompra.innerHTML = `Total a pagar: ${total} $`;
    modalContainer.append(totalCompra);
  };
  
  verCarrito.addEventListener("click", headCarrito);
  
  const eliminarProducto = (id) => {
    const buscaId = carrito.find((element) => element.id === id);
  
    console.log(buscaId);
  
    carrito = carrito.filter((carritoId) => {
      return carritoId !== buscaId;
    });
  
    contadorCarrito();
    saveLocal();
    headCarrito();
  };
  
  const contadorCarrito = () => {
    cantidadCarrito.style.display = "block";
  
    const carritoLength = carrito.length;
  
    localStorage.setItem("carritoLength", JSON.stringify(carritoLength));
  
    cantidadCarrito.innerText = JSON.parse(localStorage.getItem("carritoLength"));
  };
  
  contadorCarrito();
  

