// ========== EJERCICIO 1: Lista de Tareas ==========

function agregarTarea() {
    const input = document.getElementById('tareaInput');
    const fecha = document.getElementById('fechaInput');
    const texto = input.value.trim();
    
    // Validar que no esté vacío
    if (texto === '' || fecha.value === ''){
        alert('Por favor escribe una tarea');
        return;
    }
    console.log(fecha)

    // Crear el elemento <li>
    const li = document.createElement('li');
    li.className = 'tarea';
    li.dataset.id = Date.now(); // ID único basado en timestamp
    
    console.log(Date.now())

    // Estructura de la tarea
    if(fecha.valueAsNumber > Date.now()){
        li.innerHTML = `
        <span onclick="toggleTarea(this)" style="cursor: pointer; flex: 1;">
            ${texto} | ${fecha.value}
        </span>
        <div class="tarea-acciones">
            <button class="btn-pequeno danger" onclick="eliminarTarea(${li.dataset.id})">
                Eliminar
            </button>
        </div>
    `;
    } else{
        li.classList.toggle('pasada');
        li.innerHTML = `
        <span  style="cursor: pointer; flex: 1;">
            ${texto} | ${fecha.value}
        </span>
        <div class="tarea-acciones">
            <button class="btn-pequeno danger" onclick="eliminarTarea(${li.dataset.id})">
                Eliminar
            </button>
        </div>
    `;
    }
    
    
    // Agregar la tarea a la lista
    document.getElementById('listaTareas').appendChild(li);
    
    // Limpiar el input
    input.value = '';
    input.focus();
    
    // Actualizar contador
    actualizarContador();
}

function toggleTarea(elemento) {
    elemento.parentElement.classList.toggle('completada');
}

function eliminarTarea(id) {
    const tarea = document.querySelector(`[data-id="${id}"]`);
    tarea.remove();
    actualizarContador();
}

function actualizarContador() {
    const tareas = document.querySelectorAll('.tarea').length;
    document.getElementById('contadorTareas').textContent = 
        `${tareas} ${tareas === 1 ? 'tarea' : 'tareas'}`;
}

// Permitir Enter en el input
document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('tareaInput').addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            agregarTarea();
        }
    });
});

// ========== EJERCICIO 2: Generador de Tarjetas de Color ==========

function agregarImagen() {
    const galeria = document.getElementById('galeria');
    const url = document.getElementById('urlImagen');
    const desc = document.getElementById('descripcion');
    const tarjeta = document.createElement('div');

    tarjeta.className= 'imagen-card';
    tarjeta.innerHTML = `   
            <img src="${url.value}">
            <p>${desc.value}</p>
        `;

    galeria.appendChild(tarjeta);
}

function limpiarImagenes() {
    document.getElementById('galeria').innerHTML = '';
}

// ========== EJERCICIO 3: Tabla de Contactos ==========

function agregarContacto() {
    const nombre = document.getElementById('nombre').value.trim();
    const email = document.getElementById('email').value.trim();
    
    // Validar
    if (nombre === '' || email === '') {
        alert('Por favor completa todos los campos');
        return;
    }
    
    // Validar email básico
    if (!email.includes('@')) {
        alert('Por favor ingresa un email válido');
        return;
    }
    
    // Crear fila
    const tr = document.createElement('tr');
    tr.style.borderBottom = '1px solid #ccc';
    tr.innerHTML = `
        <td style="padding: 10px; border: 1px solid #ccc;">${nombre}</td>
        <td style="padding: 10px; border: 1px solid #ccc;">${email}</td>
        <td style="padding: 10px; border: 1px solid #ccc; text-align: center;">
            <button class="btn-pequeno danger" onclick="this.parentElement.parentElement.remove()">
                Eliminar
            </button>
        </td>
    `;
    
    // Agregar a la tabla
    document.getElementById('cuerpoTabla').appendChild(tr);
    
    // Limpiar inputs
    document.getElementById('nombre').value = '';
    document.getElementById('email').value = '';
    document.getElementById('nombre').focus();
}

// Permitir Enter en los inputs
document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('email').addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            agregarContacto();
        }
    });
});
