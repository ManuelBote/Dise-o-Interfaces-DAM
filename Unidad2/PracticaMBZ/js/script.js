let catalogoLibros = [
  { titulo: "España en un buen rumbo", autor: "Algun Iluminao", anio: 4021 },
  { titulo: "Don Quijote de la Mancha", autor: "Miguel de Cervantes", anio: 1605 }
];

// Función para renderizar el catálogo
function renderizarCatalogo() {
  const listaLibros = document.getElementById('listaLibros');
  listaLibros.innerHTML = '';
  
  catalogoLibros.forEach(libro => {
    const li = document.createElement('li');
    li.textContent = `${libro.titulo} - ${libro.autor} (${libro.anio})`;
    listaLibros.appendChild(li);
  });
}

// Añadir libro - Event listener del formulario
document.getElementById('formAddBook').addEventListener('submit', function(e) {
  e.preventDefault();
  
  const titulo = document.getElementById('titulo').value.trim();
  const autor = document.getElementById('autor').value.trim();
  const anio = parseInt(document.getElementById('anio').value);
  
  // Validaciones
  if (!titulo || !autor) {
    mostrarMensaje('msgForm', 'Título y autor son obligatorios', 'error');
    return;
  }
  
  if (isNaN(anio) || anio < 0 || anio > 2100) {
    mostrarMensaje('msgForm', 'Año inválido (0-2100)', 'error');
    return;
  }
  
  // Añadir libro al catálogo
  catalogoLibros.unshift({ titulo, autor, anio });
  
  // Limpiar formulario
  this.reset();
  
  // Renderizar catálogo actualizado
  renderizarCatalogo();
  
  mostrarMensaje('msgForm', 'Libro añadido correctamente', 'exito');
});

// Función para mostrar mensajes
function mostrarMensaje(idElemento, mensaje, tipo = '') {
  const elemento = document.getElementById(idElemento);
  elemento.textContent = mensaje;
  elemento.className = `mensaje ${tipo}`;
  
  // Limpiar mensaje después de 3 segundos
  setTimeout(() => {
    elemento.textContent = '';
    elemento.className = 'mensaje';
  }, 3000);
}

// Búsqueda local en el catálogo
document.getElementById('formBuscar').addEventListener('submit', function(e) {
  e.preventDefault();
  
  const termino = document.getElementById('buscarTitulo').value.trim().toLowerCase();
  
  if (!termino) {
    mostrarMensajeLocal('Debe ingresar un término de búsqueda');
    return;
  }
  
  // Filtrar libros
  const resultados = catalogoLibros.filter(libro => 
    libro.titulo.toLowerCase().includes(termino) ||
    libro.autor.toLowerCase().includes(termino)
  );
  
  mostrarResultadosBusqueda(resultados);
});

// Función para mostrar resultados de búsqueda local
function mostrarResultadosBusqueda(libros) {
  const resultados = document.getElementById('resultadosBusqueda');
  const loading = document.getElementById('loading');
  
  loading.classList.add('oculto');
  resultados.innerHTML = '';
  
  if (libros.length === 0) {
    resultados.innerHTML = '<li>No se encontraron libros</li>';
    return;
  }
  
  libros.forEach(libro => {
    const li = document.createElement('li');
    li.innerHTML = `<strong>${libro.titulo}</strong> - ${libro.autor} (${libro.anio})`;
    resultados.appendChild(li);
  });
}

// Función auxiliar para mostrar mensaje en búsqueda
function mostrarMensajeLocal(mensaje) {
  const resultados = document.getElementById('resultadosBusqueda');
  const loading = document.getElementById('loading');
  
  loading.classList.add('oculto');
  resultados.innerHTML = `<li class="mensaje error">${mensaje}</li>`;
}

// Inicialización al cargar la página
document.addEventListener('DOMContentLoaded', function() {
  // Renderizar catálogo inicial
  renderizarCatalogo();
  
  // Mostrar/ocultar loading en búsqueda
  document.getElementById('formBuscar').addEventListener('submit', function() {
    document.getElementById('loading').classList.remove('oculto');
  });
});