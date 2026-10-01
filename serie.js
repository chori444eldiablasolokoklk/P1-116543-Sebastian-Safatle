class Serie {
  constructor(id, url, name, language, generes, image) { // constructor, asigna todos los datos como atributos de cada serie (id, url, nombre de la serie, el lenguaje, el genero y su imagen)
    this.id = id; 
    this.url = url; 
    this.name = name; 
    this.language = language;
    this.generes = generes;
    this.image = image;
  }


  toJsonString() { // comvierte el obj en un json, es para poder guardarlo en el local
    return JSON.stringify({
      id: this.id,
      url: this.url,
      name: this.name,
      language: this.language,
      generes: this.generes,
      image: this.image,
    });
  }

  // devuelve el string json como una nueva instancia de serie
  static createFromJsonString(json) {
    const o = JSON.parse(json);
    return new Serie(o.id, o.url, o.name, o.language, o.generes, o.image);
  }

  // crea  la tarjeta que muestra los datos de la serie
  createHtmlElement(mostrarGuardar = true) {
    const card = document.createElement("div");
    card.className = "serie-card";

    const img = document.createElement("img"); // la foto de la serie
    img.src = this.image;
    img.alt = this.name;
   
    img.addEventListener("click", () => window.open(this.url, "_blank")); // cuando tocas la foto se abre el link de la serie

    const titulo = document.createElement("h4");
    titulo.textContent = this.name;

    const idioma = document.createElement("p");
    idioma.textContent = "Idioma: " + this.language;

    const generos = document.createElement("p");
    generos.textContent = "Géneros: " + this.generes.join(", ");

    card.append(img, titulo, idioma, generos);

    // boton para guardar la serie 
    if (mostrarGuardar) {
      const boton = document.createElement("button");
      boton.textContent = "guardar";
      boton.className = "btn btn-success btn-sm";
      boton.addEventListener("click", () => Serie.guardarSerie(this));
      card.appendChild(boton);
    }
    return card;
  }

  // guarda la serie en el local
  static guardarSerie(serie) {
    const guardadas = JSON.parse(localStorage.getItem("series") || "[]");
    if (guardadas.some((s) => s.id === serie.id)) { // valida que la id no este usada 
      alert("La serie ya estaba guardada");
      return;
    }
    guardadas.push(JSON.parse(serie.toJsonString())); // agrego la serie y guardo todo 
    localStorage.setItem("series", JSON.stringify(guardadas));
    alert("Serie guardada");
  }
}
