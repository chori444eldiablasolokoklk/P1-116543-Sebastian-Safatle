const POR_PAGINA = 6;  // cantidad de series por pag
let pagina = 0; // pag actual num

// agarra las series de la pagina actual y da un array de series
async function traerSeries() {
  const primero = pagina * POR_PAGINA + 1; // id de la primera sere de la pag
  const promesas = [];
  for (let id = primero; id < primero + POR_PAGINA; id++) { // un fetch por cada id de la pag de la api
    promesas.push(
      fetch("https://api.tvmaze.com/shows/" + id)
        .then((r) => (r.ok ? r.json() : null))
        .catch(() => null)
    );
  }
  
  const datos = await Promise.all(promesas);
  return datos
    .filter((d) => d !== null)
    .map(
      (d) =>
        new Serie(
          d.id,
          d.url,
          d.name,
          d.language,
          d.genres,
          d.image ? d.image.medium : ""
        )
    );
}

// pide las series para poner las nuevas 
async function mostrarSeries() {
  const contenedor = document.getElementById("series");
  const series = await traerSeries();
  contenedor.innerHTML = "";
  series.forEach((s) => contenedor.appendChild(s.createHtmlElement()));
  document.getElementById("anterior").disabled = pagina === 0; // pongo para que no se pueda usar el boton de anterior si estoy en la primera pag
}


function paginaSiguiente() { // avanza de pag
  pagina++;
  mostrarSeries();
}


function paginaAnterior() { // vuelvo a la pag anterior, solo si hay anteriores
  if (pagina > 0) {
    pagina--;
    mostrarSeries();
  }
}

// asigno cada funcion para cuando toquen el boton
document.getElementById("siguiente").addEventListener("click", paginaSiguiente);
document.getElementById("anterior").addEventListener("click", paginaAnterior);

mostrarSeries();
