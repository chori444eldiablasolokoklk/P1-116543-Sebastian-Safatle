const POR_PAGINA = 6;
 
async function traerSeries() {
  const promesas = [];
 
  for (let id = 1; id <= POR_PAGINA; id++) {
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
  series.forEach((s) => contenedor.appendChild(s.createHtmlElement()));
}
 
mostrarSeries();
 
