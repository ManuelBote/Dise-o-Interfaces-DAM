// Estructura de datos para almacenar tareas
const estadoTareas = {
    porhacer: [],
    enprogreso: [],
    completado: []
};

let idTarea = 0;

function agregarTareaKanban() {
    const input = document.getElementById('nuevaTarea');
    const prioridad = document.getElementById('prioridad').value;
    const titulo = input.value.trim();
    
    if (titulo === '') {
        alert('Por favor escribe una tarea');
        return;
    }
    
    // Crear objeto de tarea
    const tarea = {
        id: idTarea++,
        titulo: titulo,
        prioridad: prioridad,
        estado: 'porhacer'
    };
    
    // Agregar a estado
    estadoTareas.porhacer.push(tarea);
    
    // Renderizar
    renderizarTarea(tarea, 'porhacer');
    
    // Limpiar
    input.value = '';
    input.focus();
    
    // Actualizar contadores
    actualizarEstadisticas();
}

function renderizarTarea(tarea, estado) {
    // Crear elemento tarjeta
    const tarjeta = document.createElement('div');
    tarjeta.className = 'tarjeta-tarea';
    tarjeta.dataset.id = tarea.id;
    tarjeta.dataset.estado = estado;
    
    // Determinar clases de prioridad
    const clasePrioridad = `prioridad-${tarea.prioridad}`;
    const textoPrioridad = tarea.prioridad.charAt(0).toUpperCase() + tarea.prioridad.slice(1);
    
    // HTML de la tarjeta
    tarjeta.innerHTML = `
        <div class="tarjeta-titulo">${tarea.titulo}</div>
        <span class="tarjeta-prioridad ${clasePrioridad}">${textoPrioridad}</span>
        <div class="tarjeta-acciones">
            ${estado !== 'completado' ? `<button class="btn-accion btn-siguiente" onclick="moverTarea(${tarea.id}, '${estado}', 'siguiente')">➜</button>` : ''}
            ${estado !== 'porhacer' ? `<button class="btn-accion btn-anterior" onclick="moverTarea(${tarea.id}, '${estado}', 'anterior')">⬅</button>` : ''}
            <button class="btn-accion btn-eliminar" onclick="eliminarTarea(${tarea.id}, '${estado}')">✕</button>
        </div>
    `;
    
    // Agregar a la columna
    const contenedor = document.getElementById(`tareas-${estado}`);
    contenedor.appendChild(tarjeta);
    
    // Actualizar contador
    actualizarContador(estado);
}

function moverTarea(id, estadoActual, direccion) {
    // Obtener la tarea
    const tareaIndex = estadoTareas[estadoActual].findIndex(t => t.id === id);
    const tarea = estadoTareas[estadoActual][tareaIndex];
    
    let nuevoEstado;
    
    if (direccion === 'siguiente') {
        if (estadoActual === 'porhacer') nuevoEstado = 'enprogreso';
        else if (estadoActual === 'enprogreso') nuevoEstado = 'completado';
    } else if (direccion === 'anterior') {
        if (estadoActual === 'enprogreso') nuevoEstado = 'porhacer';
        else if (estadoActual === 'completado') nuevoEstado = 'enprogreso';
    }
    
    // Actualizar datos
    estadoTareas[estadoActual].splice(tareaIndex, 1);
    tarea.estado = nuevoEstado;
    estadoTareas[nuevoEstado].push(tarea);
    
    // Actualizar DOM
    const tarjeta = document.querySelector(`[data-id="${id}"]`);
    tarjeta.remove();
    renderizarTarea(tarea, nuevoEstado);
    
    // Actualizar estadísticas
    actualizarEstadisticas();
}

function eliminarTarea(id, estado) {
    // Eliminar del array
    const index = estadoTareas[estado].findIndex(t => t.id === id);
    estadoTareas[estado].splice(index, 1);
    
    // Eliminar del DOM
    const tarjeta = document.querySelector(`[data-id="${id}"]`);
    tarjeta.remove();
    
    // Actualizar
    actualizarContador(estado);
    actualizarEstadisticas();
}

function actualizarContador(estado) {
    const cantidad = estadoTareas[estado].length;
    document.getElementById(`count-${estado}`).textContent = cantidad;
}

function actualizarEstadisticas() {
    const total = 
        estadoTareas.porhacer.length + 
        estadoTareas.enprogreso.length + 
        estadoTareas.completado.length;
    
    const completadas = estadoTareas.completado.length;
    const pendientes = total - completadas;
    const progreso = total === 0 ? 0 : Math.round((completadas / total) * 100);
    
    document.getElementById('stat-total').textContent = total;
    document.getElementById('stat-completadas').textContent = completadas;
    document.getElementById('stat-pendientes').textContent = pendientes;
    document.getElementById('stat-progreso').textContent = progreso + '%';
}

// Permitir Enter en el input
document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('nuevaTarea').addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            agregarTareaKanban();
        }
    });
});
