// ========== EJERCICIO 1: Lista de Tareas ==========

function agregarTarea() {
    const input = document.getElementById('tareaInput');
    const texto = input.value.trim();
    
    // Validar que no esté vacío
    if (texto === '') {
        alert('Por favor escribe una tarea');
        return;
    }
    
    // Crear el elemento <li>
    const li = document.createElement('li');
    li.className = 'tarea';
    li.dataset.id = Date.now(); // ID único basado en timestamp
    
    // Estructura de la tarea
    li.innerHTML = `
        <span onclick="toggleTarea(this)" style="cursor: pointer; flex: 1;">
            ${texto}
        </span>
        <div class="tarea-acciones">
            <button class="btn-pequeno danger" onclick="eliminarTarea(${li.dataset.id})">
                Eliminar
            </button>
        </div>
    `;
    
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

function generarTarjetas() {
    const galeria = document.getElementById('galeria');
    galeria.innerHTML = ''; // Limpiar
    
    const cantidad = parseInt(document.getElementById('cantidadTarjetas').value);
    
    for (let i = 0; i < cantidad; i++) {
        // Generar color aleatorio
        const color = generarColorAleatorio();
        
        // Crear la tarjeta
        const tarjeta = document.createElement('div');
        tarjeta.className = 'tarjeta-color';
        tarjeta.style.backgroundColor = color;
        
        // Contenido
        tarjeta.innerHTML = `
            <div>
                <h3 style="margin: 0; font-size: 14px;">Tarjeta ${i + 1}</h3>
            </div>
            <div>
                <p style="margin: 0 0 10px; font-size: 12px;">${color}</p>
                <button class="eliminar" onclick="this.parentElement.parentElement.remove()">
                    ✕
                </button>
            </div>
        `;
        
        galeria.appendChild(tarjeta);
    }
}

function generarColorAleatorio() {
    const letras = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letras[Math.floor(Math.random() * 16)];
    }
    return color;
}

function limpiarTarjetas() {
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
