// Método 1: getElementById() - Busca por ID
function usarGetElementById() {
    const elemento = document.getElementById('producto-1');
    const resultado = document.getElementById('resultado1');
    
    resultado.innerHTML = `
        <strong>✓ Encontrado:</strong><br>
        Texto: ${elemento.textContent}<br>
        <code>document.getElementById('producto-1')</code>
    `;
    
    // Resaltar visualmente
    elemento.style.background = '#fff3cd';
    elemento.style.border = '2px solid #f39c12';
}

// Método 2: getElementsByClassName() - Busca por clase
function usarGetElementsByClassName() {
    const elementos = document.getElementsByClassName('especial');
    const resultado = document.getElementById('resultado2');
    
    let html = `<strong>✓ Encontrados ${elementos.length} elemento(s):</strong><br>`;
    
    for (let i = 0; i < elementos.length; i++) {
        html += `${i + 1}. ${elementos[i].textContent}<br>`;
        elementos[i].style.background = '#d4edda';
        elementos[i].style.border = '2px solid #27ae60';
    }
    
    resultado.innerHTML = html;
}

// Método 3: querySelector() - Usa selectores CSS (primer elemento)
function usarQuerySelector() {
    const elemento = document.querySelector('.product');
    const resultado = document.getElementById('resultado3');
    
    resultado.innerHTML = `
        <strong>✓ Primer .product encontrado:</strong><br>
        Texto: ${elemento.textContent}<br>
        <code>document.querySelector('.product')</code>
    `;
    
    elemento.style.background = '#e8f8f5';
    elemento.style.border = '2px solid #16a085';
}

// Método 4: querySelectorAll() - Usa selectores CSS (todos)
function usarQuerySelectorAll() {
    const elementos = document.querySelectorAll('.product');
    const resultado = document.getElementById('resultado4');
    
    let html = `<strong>✓ ${elementos.length} elementos encontrados:</strong><br>`;
    
    elementos.forEach((el, index) => {
        html += `${index + 1}. ${el.textContent.substring(0, 30)}...<br>`;
        el.style.background = '#eaf2f8';
        el.style.border = '2px solid #3498db';
    });
    
    resultado.innerHTML = html;
}

// Navegación: parentElement
function usarParentElement() {
    const elemento = document.getElementById('producto-2');
    const padre = elemento.parentElement;
    const resultado = document.getElementById('resultado5');
    
    resultado.innerHTML = `
        <strong>✓ Padre encontrado:</strong><br>
        Etiqueta: &lt;${padre.tagName.toLowerCase()}&gt;<br>
        Hijos totales: ${padre.children.length}<br>
        <code>elemento.parentElement</code>
    `;
    
    padre.style.border = '2px dashed #e74c3c';
}

// Navegación: nextElementSibling
function usarSiblings() {
    const elemento = document.getElementById('producto-1');
    const hermano = elemento.nextElementSibling;
    const resultado = document.getElementById('resultado6');
    
    resultado.innerHTML = `
        <strong>✓ Elemento siguiente:</strong><br>
        Texto: ${hermano.textContent}<br>
        <code>elemento.nextElementSibling</code>
    `;
    
    hermano.style.background = '#f9e79f';
    hermano.style.border = '2px solid #f1c40f';
}

