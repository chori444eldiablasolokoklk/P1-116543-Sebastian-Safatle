// lee las series que guardes en el local y las da en un array
function obtenerGuardadas() {
  const arr = JSON.parse(localStorage.getItem("series") || "[]");
  return arr.map((o) => Serie.createFromJsonString(JSON.stringify(o)));
}

// array de las series guardadas
let series = obtenerGuardadas();

//muestra las series
function mostrar() {
  const contenedor = document.getElementById("series");
  //porra las tarjetas 
  contenedor.querySelectorAll(".serie-card").forEach((c) => c.remove());
  // pongo las tarjetas en el orden actual
  series.forEach((s) => contenedor.appendChild(s.createHtmlElement(false)));
}

// boton de ordenar por nombre alfabeticamente
document.getElementById("ordenar-nombre").addEventListener("click", () => {
  series.sort((a, b) => a.name.localeCompare(b.name));
  mostrar();
});

//boton de ordenar por id de menor a mayor
document.getElementById("ordenar-id").addEventListener("click", () => {
  series.sort((a, b) => a.id - b.id);
  mostrar();
});

mostrar();
