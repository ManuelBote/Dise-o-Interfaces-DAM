function imperativo() {
    const caja = document.getElementById("cajaResultado")
    caja.innerHTML=''

    const lista = document.createElement("ul")

    const elemento1 = document.createElement("li")
    elemento1.textContent = "Home"

    const elemento2 = document.createElement("li")
    elemento2.textContent = "About"

    const elemento3 = document.createElement("li")
    elemento3.textContent = "Servicios"

    const elemento4 = document.createElement("li")
    elemento4.textContent = "Contacto"

    lista.appendChild(elemento1)
    lista.appendChild(elemento2)
    lista.appendChild(elemento3)
    lista.appendChild(elemento4)

    caja.appendChild(lista)

    caja.innerHTML += '<p style="margin-top: 15px; color: #856404;"><strong>✓ Construido de forma IMPERATIVA</strong> (paso a paso)</p>';

  }

  function declarativo(){
    const caja = document.getElementById("cajaResultado")

    caja.innerHTML= `
    
    <ul class="nav">
        <li class="nav-item">Home</li>
        <li class="nav-item">About</li>
        <li class="nav-item">Servicios</li>
        <li class="nav-item">Contacto</li>
    </ul>

    '<p style="margin-top: 15px; color: #856404;"><strong>✓ Construido de forma IMPERATIVA</strong> (paso a paso)</p>'
    `

  }