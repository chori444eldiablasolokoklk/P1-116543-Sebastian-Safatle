
function obtenerGuardadas() {
  const arr = JSON.parse(localStorage.getItem("series") || "[]");
  return arr.map((o) => Serie.createFromJsonString(JSON.stringify(o)));
}

let series = obtenerGuardadas();

function mostrar() {
  const contenedor = document.getElementById("series");
  contenedor.querySelectorAll(".serie-card").forEach((c) => c.remove());
  series.forEach((s) => contenedor.appendChild(s.createHtmlElement(false)));
}

document.getElementById("ordenar-nombre").addEventListener("click", () => {
  series.sort((a, b) => a.name.localeCompare(b.name));
  mostrar();
});

document.getElementById("ordenar-id").addEventListener("click", () => {
  series.sort((a, b) => a.id - b.id);
  mostrar();
});

mostrar();
