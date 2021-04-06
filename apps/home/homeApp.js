//Scroll buscador
let header = document.getElementById("header_home");
let textImage = document.getElementById("logo_searcher");
let finder = document.getElementById("searcher");
let searcher = document.getElementById("sec_home");

let space1 = header.offsetHeight;
let space2 = textImage.offsetHeight;
let space3 = finder.offsetHeight;
let space4 = searcher.offsetHeight;
let total = space2 + space3 + space4 + 90;

if (window.outerWidth > 700) {
  window.addEventListener("scroll", () => {
    var y = window.scrollY;
    comprobator(y);
  });
}

let position = document.getElementById("logo&searcher");
let cuerpo = document.getElementById("body");

let stickyContainer = document.getElementById("sticky_container");

function searcherNav() {
  stickyContainer.style.display = "flex";
  searcher.style.display = "none";
}

function normarlSearcher() {
  stickyContainer.style.display = "none";
  searcher.style.display = "flex";
}

let contador = true;
function comprobator(y) {
  if (y > total && contador) {
    contador = false;
    searcherNav();
  }
  if (y < total && contador == false) {
    contador = true;
    normarlSearcher();
  }
}
//Buscadorcfse

function capitalize(word) {
  return word[0].toUpperCase() + word.slice(1);
}
let containerMax = document.getElementById("total_content_search");
let finderLupa = document.getElementById("find");

function redireccionar() {
  if (window.outerWidth > 700) {
    window.location = `#line_span`;
  } else {
    window.location = `#title_element`;
  }
}

async function elegirElemento(numero_de_elemento) {
  let comprobator = document.getElementById("container_search");
  let buscador = document.getElementById("searcher");
  let finderContainer = document.getElementById("sec_home");
  let elementoDiv = finderContainer.childNodes[numero_de_elemento];
  let elementoP = elementoDiv.childNodes[1];
  if (primeraBusqueda(comprobator)) {
    buscador.value = elementoP.innerHTML;
    let endPointSearch = `http://api.giphy.com/v1/gifs/search?api_key=${apiKey}&q=${finder.value}&lang=eslimit=50offset=0`;
    let server = await callApi(endPointSearch);
    return sortGifos(server, buscador);
  } else {
    removerBusqueda(comprobator);
    buscador.value = elementoP.innerHTML;
    let endPointSearch = `http://api.giphy.com/v1/gifs/search?api_key=${apiKey}&q=${finder.value}&lang=eslimit=50offset=0`;
    let server = await callApi(endPointSearch);
    return sortGifos(server, buscador);
  }
}

function sortGifos(json, finder) {
  let k = 0;
  let l = 12;
  let finderContainer = document.getElementById("container_search");
  let elementBefore = document.getElementById("text_content_search");
  let h3Element = document.getElementById("h3_text");
  let pELement = document.getElementById("text_content_search");

  h3Element.setAttribute("class", "tex_dark1 display_none");
  pELement.setAttribute("class", "text_trending tex_dark1 display_none");

  let line = document.createElement("div");
  line.setAttribute("class", "linea_busqueda");
  line.setAttribute("id", "line_span");
  insertAfter(elementBefore, line);

  let title = document.createElement("h1");
  title.setAttribute("class", "title_search");
  title.setAttribute("id", "title_element");
  title.innerHTML = capitalize(finder.value);
  insertAfter(line, title);

  let acomodateSearch = acomodateGifos(json);
  insertInDOM(acomodateSearch, k, l, finderContainer);

  if (json.data.length == 50) {
    let button = document.createElement("input");
    button.setAttribute("type", "submit");
    button.setAttribute("id", "verMas");
    button.setAttribute("value", "VER MÁS");
    insertAfter(finderContainer, button);

    redireccionar("line_span");

    button.addEventListener("click", () => {
      k += 12;
      l += 12;
      insertInDOM(acomodateSearch, k, l, finderContainer);
    });
  }
}

function searchUndefined(json) {
  let finderContainer = document.getElementById("container_search");
  if (json.data.length != 50) {
    finderContainer.nextElementSibling.remove();
    finderContainer.setAttribute("class", "box_search_error");
  }
}

function activateSugerence(container) {
  if (container.id == "sec_home") {
    if (container.childNodes.length < 8) {
      container.setAttribute("class", "box_home_find");
    }
    let lupa = document.getElementById("lupa_use");
    lupa.setAttribute("class", "lupa_finded");

    let finder = document.getElementById("searcher");
    finder.setAttribute("class", "finder_finded");

    let img_close = document.getElementById("img_close");
    img_close.setAttribute("class", "img_close_on");

    let finderContainerElement = document.getElementById("searcher_container");
    if (finderContainerElement.childNodes.length < 6) {
      finderContainerElement.appendChild(img_close);
    }
  } else {
    if (container.childNodes.length < 8) {
      container.setAttribute("class", "sticky_container_active");
    }

    let lupa = document.getElementById("lupa_sticky");
    lupa.setAttribute("class", "lupa_finded");

    let contenedor = document.getElementById("container_searcher_sticky");
    contenedor.setAttribute("class", "box_sticky_active");

    let finder = document.getElementById("busqueda_sticky");
    finder.setAttribute("class", "finder");

    let img_close = document.getElementById("img_close_sticky");
    img_close.setAttribute("class", "img_close_on");

    let finderContainerElement = document.getElementById(
      "container_searcher_sticky"
    );
    if (finderContainerElement.childNodes.length < 6) {
      finderContainerElement.appendChild(img_close);
    }
  }
}

function sugerenceSearch(container, finder, json) {
  if (container.id == "sec_home") {
    if (finder.value.length > 1) {
      if (container.childNodes.length < 8) {
        container.setAttribute("class", "box_home_find_expand");
        let line = document.createElement("span");
        line.setAttribute("class", "line_find_expand");
        container.appendChild(line);

        for (let i = 0; i < 4; i++) {
          let containerDiv = document.createElement("div");
          containerDiv.setAttribute("class", "container_sugerence");

          let imgLupa = document.createElement("img");
          imgLupa.setAttribute("src", "/images/icon-search-propio.svg");
          imgLupa.setAttribute("class", "lupa_expand");
          containerDiv.appendChild(imgLupa);

          var sugerence = document.createElement("p");
          sugerence.innerHTML = capitalize(json.data[i].name);
          containerDiv.appendChild(sugerence);

          container.appendChild(containerDiv);
        }
      } else {
        let j = 5;
        let k = 0;
        for (let i = 4; i < 7; i++) {
          let elemntContainer = containerDiv.childNodes[i];
          let elementP = elemntContainer.childNodes[j - i];
          elementP.innerHTML = capitalize(json.data[k].name);
          j++;
          k++;
        }
      }
      container.childNodes[4].addEventListener("click", () =>
        elegirElemento(4)
      );
      container.childNodes[5].addEventListener("click", () =>
        elegirElemento(5)
      );
      container.childNodes[6].addEventListener("click", () =>
        elegirElemento(6)
      );
      container.childNodes[7].addEventListener("click", () =>
        elegirElemento(7)
      );
    }
  }
}

function deleteSugerence(container) {
  if (container.childNodes.length > 3) {
    for (let i = 0; i < 5; i++) {
      let elemntContainer = container.childNodes;
      container.removeChild(elemntContainer[3]);
    }
  }
  if (container.id == "sec_home") {
    container.setAttribute("class", "box_home");

    let finder = document.getElementById("searcher");
    finder.setAttribute("class", "finder");
    finder.value = "";

    let lupa = document.getElementById("lupa_use");
    lupa.setAttribute("class", "lupa");

    img_close.setAttribute("class", "img_close_off");
  } else {
    container.setAttribute("class", "sticky_container");

    let finder = document.getElementById("busqueda_sticky");
    finder.setAttribute("class", "finder");
    finder.value = "";

    let contenedor = document.getElementById("container_searcher_sticky");
    contenedor.setAttribute("class", "box_sticky");

    let lupa = document.getElementById("lupa_sticky");
    lupa.setAttribute("class", "lupa_sticky");

    let img_close = document.getElementById("img_close_sticky");
    img_close.setAttribute("class", "img_close_off");
  }
}

function primeraBusqueda(contenedor_busqueda) {
  if (contenedor_busqueda.childNodes.length > 2) {
    return false;
  } else {
    return true;
  }
}

function removerBusqueda(contenedor) {
  while (contenedor.childNodes.length > 1) {
    contenedor.removeChild(contenedor.childNodes[1]);
  }
  let lineSpan = document.getElementById("line_span");
  lineSpan.remove();
  let titleSearch = document.getElementById("title_element");
  titleSearch.remove();
  let inputOut = document.getElementById("verMas");
  inputOut.remove();
}

let searchLogo = document.getElementById("find");
searchLogo.addEventListener("click", () => {
  let comprobator = document.getElementById("container_search");
  if (primeraBusqueda(comprobator)) {
    let finder = document.getElementById("searcher");
    let endPointSearch = `http://api.giphy.com/v1/gifs/search?api_key=${apiKey}&q=${finder.value}&lang=eslimit=50offset=0`;
    callApi(endPointSearch).then((json) => {
      searchUndefined(json);
      sortGifos(json, finder);
    });
  } else {
    removerBusqueda(comprobator);
    let finder = document.getElementById("searcher");
    let endPointSearch = `http://api.giphy.com/v1/gifs/search?api_key=${apiKey}&q=${finder.value}&lang=eslimit=50offset=0`;
    callApi(endPointSearch).then((json) => {
      searchUndefined(json);
      sortGifos(json, finder);
    });
  }
});

let searchLogoSticky = document.getElementById("lupa_sticky");
searchLogoSticky.addEventListener("click", () => {
  let comprobator = document.getElementById("container_search");
  if (primeraBusqueda(comprobator)) {
    let finder = document.getElementById("busqueda_sticky");
    let endPointSearch = `http://api.giphy.com/v1/gifs/search?api_key=${apiKey}&q=${finder.value}&lang=eslimit=50offset=0`;
    callApi(endPointSearch).then((json) => {
      searchUndefined(json);
      sortGifos(json, finder);
    });
  } else {
    removerBusqueda(comprobator);
    let finder = document.getElementById("busqueda_sticky");
    let endPointSearch = `http://api.giphy.com/v1/gifs/search?api_key=${apiKey}&q=${finder.value}&lang=eslimit=50offset=0`;
    callApi(endPointSearch).then((json) => {
      searchUndefined(json);
      sortGifos(json, finder);
    });
  }
});

finder.addEventListener("keydown", (element) => {
  if (element.code == "Enter") {
    let comprobator = document.getElementById("container_search");
    if (primeraBusqueda(comprobator)) {
      let finder = document.getElementById("searcher");
      let endPointSearch = `http://api.giphy.com/v1/gifs/search?api_key=${apiKey}&q=${finder.value}&lang=eslimit=50offset=0`;
      callApi(endPointSearch).then((json) => {
        searchUndefined(json);
        sortGifos(json, finder);
        bodyCuerpo = document.getElementById("page_home");
        console.log(bodyCuerpo.childNodes);
      });
    } else {
      removerBusqueda(comprobator);
      let finder = document.getElementById("searcher");
      let endPointSearch = `http://api.giphy.com/v1/gifs/search?api_key=${apiKey}&q=${finder.value}&lang=eslimit=50offset=0`;
      callApi(endPointSearch).then((json) => {
        searchUndefined(json);
        sortGifos(json, finder);
      });
    }
  } else {
    //Autocompletado Buscador
    let endPointAutoComplete = `http://api.giphy.com/v1/gifs/search/tags?api_key=${apiKey}&q=${finder.value}&lang=eslimit=5offset=0`;

    callApi(endPointAutoComplete).then((json) => {
      let finderContainerDefault = document.getElementById("sec_home");
      let finder = document.getElementById("searcher");
      activateSugerence(finderContainerDefault);
      sugerenceSearch(finderContainerDefault, finder, json);
      let img_close = document.getElementById("img_close");
      img_close.addEventListener("click", () => {
        let finderContainer = document.getElementById("sec_home");
        deleteSugerence(finderContainer);
      });
    });
  }
});

let finderSticky = document.getElementById("busqueda_sticky");
finderSticky.addEventListener("keydown", (element) => {
  if (element.code == "Enter") {
    let comprobator = document.getElementById("container_search");
    if (primeraBusqueda(comprobator)) {
      let finder = document.getElementById("busqueda_sticky");
      let endPointSearch = `http://api.giphy.com/v1/gifs/search?api_key=${apiKey}&q=${finder.value}&lang=eslimit=50offset=0`;
      callApi(endPointSearch).then((json) => {
        searchUndefined(json);
        sortGifos(json, finder);
      });
    } else {
      removerBusqueda(comprobator);
      let finder = document.getElementById("busqueda_sticky");
      let endPointSearch = `http://api.giphy.com/v1/gifs/search?api_key=${apiKey}&q=${finder.value}&lang=eslimit=50offset=0`;
      callApi(endPointSearch).then((json) => {
        searchUndefined(json);
        sortGifos(json, finder);
      });
    }
  } else {
    //Autocompletado Buscador
    let endPointAutoComplete = `http://api.giphy.com/v1/gifs/search/tags?api_key=${apiKey}&q=${finder.value}&lang=eslimit=5offset=0`;

    callApi(endPointAutoComplete).then((json) => {
      let finder = document.getElementById("busqueda_sticky");
      let finderContainerSticky = document.getElementById("sticky_container");

      activateSugerence(finderContainerSticky);
      sugerenceSearch(finderContainerSticky, finder, json);

      let img_close = document.getElementById("img_close_sticky");
      img_close.addEventListener("click", () => {
        let finderContainer = document.getElementById("sticky_container");
        deleteSugerence(finderContainer);
      });
    });
  }
});
//HACER LO DE CADA GIF
