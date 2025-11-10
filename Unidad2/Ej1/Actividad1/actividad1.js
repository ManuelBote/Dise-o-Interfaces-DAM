function construirImperativo() {
    const resultado = document.getElementById('resultado');
    resultado.innerHTML = ''; // Limpiar
    
    // Paso 1: Crear el elemento ul
    const lista = document.createElement('ul');
    
    // Paso 2: Crear primer item
    const item1 = document.createElement('li');
    item1.textContent = 'Ana';
    
    // Paso 3: Agregar el item a la lista
    lista.appendChild(item1);
    
    // Paso 4: Crear segundo item
    const item2 = document.createElement('li');
    item2.textContent = 'Luis';
    
    // Paso 5: Agregar el segundo item
    lista.appendChild(item2);
    
    // Paso 6: Crear tercer item
    const item3 = document.createElement('li');
    item3.textContent = 'María';
    
    // Paso 7: Agregar el tercer item
    lista.appendChild(item3);
    
    // Paso 8: Agregar la lista completa al DOM
    resultado.appendChild(lista);
    
    resultado.style.background = '#fff3cd';
    resultado.innerHTML += '<p style="margin-top: 15px; color: #856404;"><strong>✓ Construido de forma IMPERATIVA</strong> (paso a paso)</p>';
}

function construirDeclarativo() {
    const resultado = document.getElementById('resultado');
    
    // Declaramos el resultado final que queremos
    resultado.innerHTML = `
        <ul>
            <li>Ana</li>
            <li>Luis</li>
            <li>María</li>
        </ul>
        <p style="margin-top: 15px; color: #155724;"><strong>✓ Construido de forma DECLARATIVA</strong> (directamente en HTML)</p>
    `;
    
    resultado.style.background = '#d4edda';
}

function limpiar() {
    const resultado = document.getElementById('resultado');
    resultado.innerHTML = '<p style="color: #7f8c8d; text-align: center; padding-top: 30px;">Los resultados aparecerán aquí...</p>';
    resultado.style.background = '#ecf0f1';
}

