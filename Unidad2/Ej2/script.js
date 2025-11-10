
const inputBuscador = document.getElementById('buscador')

inputBuscador.addEventListener('input', function(){

    console.log("entra al evento")
    const texto = inputBuscador.value.toLowerCase();
    const productos = document.querySelectorAll('.producto')

    productos.forEach(function(producto) {
        const nombre = producto.textContent.toLowerCase();

        if(nombre.includes(texto)){
            producto.style.display = 'block';
        } else{
            producto.style.display = 'none';
        }
    });

});