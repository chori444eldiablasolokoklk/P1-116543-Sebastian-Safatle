const POR_PAGINA = 6; 
let pagina = 0; 

async function traerSeries() {
  const primero = pagina * POR_PAGINA + 1; 
  const promesas = [];
  for (let id = primero; id < primero + POR_PAGINA; id++) { 
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

 
async function mostrarSeries() {
  const contenedor = document.getElementById("series");
  const series = await traerSeries();
  contenedor.innerHTML = "";
  series.forEach((s) => contenedor.appendChild(s.createHtmlElement()));
  document.getElementById("anterior").disabled = pagina === 0; 
}


function paginaSiguiente() { 
  pagina++;
  mostrarSeries();
}


function paginaAnterior() { 
  if (pagina > 0) {
    pagina--;
    mostrarSeries();
  }
}

document.getElementById("siguiente").addEventListener("click", paginaSiguiente);
document.getElementById("anterior").addEventListener("click", paginaAnterior);

mostrarSeries();
 
mostrarSeries();
 
