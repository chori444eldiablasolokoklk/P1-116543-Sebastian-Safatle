class Serie {
  constructor(id, url, name, language, generes, image) {
    this.id = id;
    this.url = url;
    this.name = name;
    this.language = language;
    this.generes = generes;
    this.image = image;
  }
 
  toJsonString() {
    return JSON.stringify({
      id: this.id,
      url: this.url,
      name: this.name,
      language: this.language,
      generes: this.generes,
      image: this.image,
    });
  }
 
  static createFromJsonString(json) {
    const o = JSON.parse(json);
    return new Serie(o.id, o.url, o.name, o.language, o.generes, o.image);
  }
 
  createHtmlElement() {
    const card = document.createElement("div");
 
    const img = document.createElement("img");
    img.src = this.image;
    img.alt = this.name;
 
    const titulo = document.createElement("h4");
    titulo.textContent = this.name;
 
    const idioma = document.createElement("p");
    idioma.textContent = "Idioma: " + this.language;
 
    const generos = document.createElement("p");
    generos.textContent = "Géneros: " + this.generes.join(", ");
 
    card.append(img, titulo, idioma, generos);
    return card;
  }
}
  static guardarSerie(serie) {
    const guardadas = JSON.parse(localStorage.getItem("series") || "[]");
 
    if (guardadas.some((s) => s.id === serie.id)) {
      alert("La serie ya estaba guardada");
      return;
    }
 
    guardadas.push(JSON.parse(serie.toJsonString()));
    localStorage.setItem("series", JSON.stringify(guardadas));
    alert("Serie guardada");
  }
}
