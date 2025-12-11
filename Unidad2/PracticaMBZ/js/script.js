// Lista de libros

let catalogoLibros = [
  {
    titulo: "Don Quijote de la mancha",
    autor: "Miguel de Cervantes",
    categoria: "Fantasia",
    anio: 1600,
    img: "img/img_libros/libro1.jpeg",
  },
  {
    titulo: "Lazarillo de tormes",
    autor: "Desconocido",
    categoria: "Drama",
    anio: 1700,
    img: "img/img_libros/libro2.jpeg",
  },
  {
    titulo: "Geronimo Stilton",
    autor: "Elisabetta Dami",
    categoria: "Dia contra el cancer",
    anio: 2010,
    img: "img/img_libros/libro3.jpeg",
  },
  {
    titulo: "Mortadelo y Filemon",
    autor: "Francisco Ibañez",
    categoria: "Humor",
    anio: 2022,
    img: "img/img_libros/libro4.jpeg",
  }
];

// Función para renderizar el catálogo como tarjetas
function renderizarCatalogo() {
  const listaLibros = document.getElementById("listaLibros");
  listaLibros.innerHTML = "";

  catalogoLibros.forEach((libro) => {
    const caja = document.createElement("div");
    caja.className = "col-e-4 col-t-6"; // hijo directo de .row
    if (libro.categoria === "Dia contra el cancer") {
      caja.innerHTML = `
      <div class="tarjeta-libro cancer_book">
        <div class="info-libro">
          <h3>${libro.titulo}</h3>
          <p><strong>Genero:</strong> ${libro.categoria}</p>
          <p><strong>Autor:</strong> ${libro.autor}</p>
          <p><strong>Año:</strong> ${libro.anio}</p>
        </div>
        <img src="${libro.img}" alt="Portada de ${libro.titulo}" onerror="this.style.display='none'" />
      </div>
    `;
    } else{
      caja.innerHTML = `
        <div class="tarjeta-libro">
          <div class="info-libro">
            <h3>${libro.titulo}</h3>
            <p><strong>Genero:</strong> ${libro.categoria}</p>
            <p><strong>Autor:</strong> ${libro.autor}</p>
            <p><strong>Año:</strong> ${libro.anio}</p>
          </div>
          <img src="${libro.img}" alt="Portada de ${libro.titulo}" onerror="this.style.display='none'" />
        </div>
      `;
    }
    
    listaLibros.appendChild(caja);
  });
}

// Añadir libro - Event listener del formulario (CON input imagen)
document.getElementById("formAddBook").addEventListener("submit", function (e) {
  e.preventDefault();

  const titulo = document.getElementById("titulo").value.trim();
  const autor = document.getElementById("autor").value.trim();
  const categoria = document.getElementById("categoria").value.trim();
  const anio = parseInt(document.getElementById("anio").value);
  const inputImagen = document.getElementById("imagen");
  const rutaImagen = inputImagen.value.trim();

  // Validaciones
  if (!titulo || !autor) {
    mostrarMensaje("msgForm", "Título y autor son obligatorios", "error");
    return;
  }

  if (isNaN(anio) || anio < 0 || anio > 2100) {
    mostrarMensaje("msgForm", "Año inválido (0-2100)", "error");
    return;
  }

  // Preparar objeto libro con imagen opcional
  const nuevoLibro = {
    titulo,
    autor,
    categoria,
    anio,
    img: rutaImagen || "",
  };

  // Añadir libro al catálogo
  catalogoLibros.unshift(nuevoLibro);

  // Limpiar formulario
  this.reset();

  // Renderizar catálogo actualizado
  renderizarCatalogo();

  mostrarMensaje("msgForm", "Libro añadido correctamente", "exito");
});

// Función para mostrar mensajes
function mostrarMensaje(idElemento, mensaje, tipo = "") {
  const elemento = document.getElementById(idElemento);
  elemento.textContent = mensaje;
  elemento.className = `mensaje ${tipo}`;

  setTimeout(() => {
    elemento.textContent = "";
    elemento.className = "mensaje";
  }, 3000);
}

// Búsqueda local en el catálogo
document.getElementById("formBuscar").addEventListener("submit", function (e) {
  e.preventDefault();

  const termino = document
    .getElementById("buscarTitulo")
    .value.trim()
    .toLowerCase();

  if (!termino) {
    mostrarMensajeLocal("Debe ingresar un término de búsqueda");
    return;
  }

  const resultados = catalogoLibros.filter(
    (libro) =>
      libro.titulo.toLowerCase().includes(termino) ||
      libro.autor.toLowerCase().includes(termino)
  );

  mostrarResultadosBusqueda(resultados);
});

// Función para mostrar resultados de búsqueda local
function mostrarResultadosBusqueda(libros) {
  const resultados = document.getElementById("resultadosBusqueda");
  const loading = document.getElementById("loading");

  loading.classList.add("oculto");
  resultados.innerHTML = "";
  resultados.className = "row";

  if (libros.length === 0) {
    resultados.innerHTML =
      '<li class="col-e-12"><p>No se encontraron libros</p></li>';
    return;
  }

  libros.forEach((libro) => {
    const li = document.createElement("li");
    li.className = "col-e-6 col-t-6";
    li.innerHTML = `
      <div class="tarjeta-libro">
        ${
          libro.img
            ? `<img src="${libro.img}" alt="Portada de ${libro.titulo}" onerror="this.style.display='none'" />`
            : '<div class="sin-imagen">Sin imagen</div>'
        }
        <div class="info-libro">
          <h3>${libro.titulo}</h3>
          <p><strong>Autor:</strong> ${libro.autor}</p>
          <p><strong>Año:</strong> ${libro.anio}</p>
        </div>
      </div>
    `;
    resultados.appendChild(li);
  });
}

// Función auxiliar para mostrar mensaje en búsqueda
function mostrarMensajeLocal(mensaje) {
  const resultados = document.getElementById("resultadosBusqueda");
  const loading = document.getElementById("loading");

  loading.classList.add("oculto");
  resultados.innerHTML = `<li class="col-e-12"><p class="mensaje error">${mensaje}</p></li>`;
}

// Inicialización
document.addEventListener("DOMContentLoaded", function () {
  renderizarCatalogo();

  document.getElementById("formBuscar").addEventListener("submit", function () {
    document.getElementById("loading").classList.remove("oculto");
  });
});

// --- LOGIN funcional simple ---

const btnLogin = document.getElementById("btnLogin");
const modalLogin = document.getElementById("modalLogin");
const btnCerrarModal = document.getElementById("btnCerrarModal");
const formLogin = document.getElementById("formLogin");
const msgLogin = document.getElementById("msgLogin");
const imgProfile = document.getElementById("imgProfile");

// ruta de la imagen cuando el usuario está logueado (cámbiala por la tuya)
const IMG_LOGUEADO = "img/imagen_perfil.jpg";

// Abrir modal al pulsar "Login"
btnLogin.addEventListener("click", () => {
  modalLogin.classList.add("activo");
  msgLogin.textContent = "";
});

// Cerrar modal al pulsar "Cancelar"
btnCerrarModal.addEventListener("click", () => {
  cerrarModalLogin();
});

// Cerrar modal helper
function cerrarModalLogin() {
  modalLogin.classList.remove("activo");
  formLogin.reset();
  msgLogin.textContent = "";
}

// Validar login al enviar formulario
formLogin.addEventListener("submit", (e) => {
  e.preventDefault();

  const user = document.getElementById("user").value.trim();
  const pass = document.getElementById("pass").value.trim();

  // Credenciales correctas
  if (user === "Usuario" && pass === "1234") {
    // Cambiar imagen de perfil
    imgProfile.src = IMG_LOGUEADO;
    imgProfile.alt = "Usuario autenticado";

    // Opcional: cambiar texto del botón
    btnLogin.textContent = "Cerrar sesión";

    // Cerrar modal
    cerrarModalLogin();
    return;
  }

  // Errores específicos
  if (user !== "Usuario" && pass !== "1234") {
    msgLogin.textContent = "Usuario y contraseña incorrectos.";
  } else if (user !== "Usuario") {
    msgLogin.textContent = "Usuario incorrecto.";
  } else if (pass !== "1234") {
    msgLogin.textContent = "Contraseña incorrecta.";
  }

  msgLogin.classList.add("error");
});
