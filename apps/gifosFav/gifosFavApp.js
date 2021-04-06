function domNullGifo(container) {
  switch (container.getAttribute("id")) {
    case "favoritos":
      container.setAttribute("class", "sin-contenido");

      let image = document.createElement("img");
      image.setAttribute("src", "/images/icon-fav-sin-contenido.svg");
      image.setAttribute("class", "sin-contenido__image");
      container.appendChild(image);

      let text = document.createElement("h3");
      text.setAttribute("class", "sin-contenido__text");
      text.innerHTML =
        "¡Guarda tu primer GIFO en Favoritos para que se muestre aquí!";
      container.appendChild(text);

      console.log(
        `localStorageElements: ERROR Los gifos favoritos NO estan almacenados o no tienes ningun favorito`
      );
      break;
    case "misGifos":
      container.setAttribute("class", "sin-contenido");

      let imagen = document.createElement("img");
      imagen.setAttribute("src", "/images/icon-mis-gifos-sin-contenido.svg");
      imagen.setAttribute("class", "sin-contenido__image");
      container.appendChild(imagen);

      let texto = document.createElement("h3");
      texto.setAttribute("class", "sin-contenido__text");
      texto.innerHTML = "¡Anímate a crear tu primer GIFO!";
      texto.style.color = "rgba(80,227,194,1)";
      container.appendChild(texto);

      console.log(
        `domNullGifo: ERROR Los gifos creados NO estan almacenados o no haz creado ninguno`
      );
      break;
  }
}

function localStorageElements(storage, container) {
  if (storage.length != 0) {
    console.log(`localStorageElements: Los gifos estan almacenados`);
    return true;
  } else {
    domNullGifo(container);
    return false;
  }
}

function insertGifos(tokenData, container) {
  let tokenContent = dataTokenToArray(tokenData);
  console.log(tokenContent);
  if (localStorageElements(tokenContent, container)) {
    quantityControl(tokenContent, container);
  }
}

function quantityControl(tokenContent, container) {
  if (localStorage.length > 13) {
    let i = 0;
    let j = 12;
    while (i < j) {
      console.log(localStorage.getItem(tokenContent[i]), "DATApROCESS");
      insElemInDom(
        localStorage.getItem(tokenContent[i]),
        container,
        i,
        tokenContent
      );
      i++;
    }
    let button = document.createElement("input");
    button.setAttribute("type", "submit");
    button.setAttribute("id", "verMas");
    button.setAttribute("value", "VER MÁS");
    insertAfter(container, button);

    button.addEventListener("click", () => {
      j += 12;
      if (localStorage.length > j + 1) {
        console.log("localStorage.length > j");
        while (i < j) {
          insElemInDom(
            localStorage.getItem(tokenContent[i]),
            container,
            i,
            tokenContent
          );
          i++;
        }
      } else {
        console.log(`i: ${i}`);
        console.log(`Local Storage: ${localStorage.length}`);
        for (i; i < localStorage.length - 1; i++) {
          console.log(i);
          insElemInDom(
            localStorage.getItem(tokenContent[i]),
            container,
            i,
            tokenContent
          );
        }
        let html = document.getElementsByTagName("body");
        html[0].removeChild(html[0].childNodes[8]);
      }
    });
  } else {
    let i = 0;
    let j = tokenContent.length;
    while (i < j) {
      insElemInDom(
        localStorage.getItem(tokenContent[i]),
        container,
        i,
        tokenContent
      );
      i++;
    }
  }
}

function insElemInDom(gifoDataString, container, gifoNumber, gifoList) {
  let gifoData = dataTokenToArray(gifoDataString);
  let gifoContainer = document.createElement("div");
  let gifoImage = document.createElement("img");
  let gifoElments = document.createElement("div");
  let iconsContainer = document.createElement("div");
  let gifoFav = document.createElement("img");
  let gifoDownload = document.createElement("img");
  let gifoMax = document.createElement("img");
  let gifoRemove = document.createElement("img");
  let textContainer = document.createElement("div");
  let gifoTitle = document.createElement("h3");
  let gifoUser = document.createElement("p");

  switch (container.getAttribute("id")) {
    case "favoritos":
      gifoContainer.setAttribute("class", "gifo-InActive");

      gifoImage.setAttribute("src", gifoData[0]);
      gifoImage.setAttribute("class", "gifo-InActive__image");
      gifoContainer.appendChild(gifoImage);

      gifoElments.setAttribute("class", "gifo-InActive__elments");
      gifoContainer.appendChild(gifoElments);

      iconsContainer.setAttribute("class", "elments-gifo-InActive__icons");
      gifoElments.appendChild(iconsContainer);

      if (gifoData[3]) {
        gifoFav.setAttribute("src", "/images/icon-fav-active.svg");
      } else {
        gifoFav.setAttribute("src", "/images/icon-fav.svg");
      }
      gifoFav.setAttribute("class", "icons__gifo-fav");
      iconsContainer.appendChild(gifoFav);

      gifoDownload.setAttribute("src", "/images/icon-download.svg");
      gifoDownload.setAttribute("class", "icons__gifo-download");
      iconsContainer.appendChild(gifoDownload);

      gifoMax.setAttribute("src", "/images/icon-max-normal.svg");
      gifoMax.setAttribute("class", "icons__gifo-max");
      iconsContainer.appendChild(gifoMax);

      textContainer.setAttribute(
        "class",
        "elments-gifo-InActive__text-container"
      );
      gifoElments.appendChild(textContainer);

      gifoTitle.innerHTML = gifoData[2];
      gifoTitle.setAttribute("class", "text-container__title");
      textContainer.appendChild(gifoTitle);

      gifoUser.innerHTML = gifoData[1];
      gifoUser.setAttribute("class", "text-container__user");
      textContainer.appendChild(gifoUser);

      container.appendChild(gifoContainer);
      break;
    case "misGifos":
      gifoContainer.setAttribute("class", "gifo-InActive");

      gifoImage.setAttribute("src", gifoData[0]);
      gifoImage.setAttribute("class", "gifo-InActive__image");
      gifoContainer.appendChild(gifoImage);

      gifoElments.setAttribute("class", "gifo-InActive__elments");
      gifoContainer.appendChild(gifoElments);

      iconsContainer.setAttribute("class", "elments-gifo-InActive__icons");
      gifoElments.appendChild(iconsContainer);

      if (gifoData[1]) {
        gifoFav.setAttribute("src", "/images/icon-fav-active.svg");
      } else {
        gifoFav.setAttribute("src", "/images/icon-fav.svg");
      }
      gifoRemove.setAttribute("src", "/images/icon-trash-normal.svg");
      gifoRemove.setAttribute("class", "icons__gifo-trash");
      iconsContainer.appendChild(gifoRemove);

      gifoDownload.setAttribute("src", "/images/icon-download.svg");
      gifoDownload.setAttribute("class", "icons__gifo-download");
      iconsContainer.appendChild(gifoDownload);

      gifoMax.setAttribute("src", "/images/icon-max-normal.svg");
      gifoMax.setAttribute("class", "icons__gifo-max");
      iconsContainer.appendChild(gifoMax);

      textContainer.setAttribute(
        "class",
        "elments-gifo-InActive__text-container"
      );
      gifoElments.appendChild(textContainer);

      container.appendChild(gifoContainer);
      break;
  }

  gifoImage.addEventListener("click", () => {
    let chekboxHeader = document.getElementById("check");
    chekboxHeader.style.display = "none";
    gifoContainer.setAttribute("class", "gifo-Expand");

    gifoImage.setAttribute("class", "gifo-Expand__image");
    gifoElments.setAttribute("class", "gifo-Expand__elments");
    iconsContainer.setAttribute("class", "elments-gifo-Expand__icons");
    textContainer.setAttribute("class", "elments-gifo-Expand__text-container");

    let checkboxContainer = document.createElement("div");
    checkboxContainer.setAttribute("class", "close-it");

    let checkbox = document.createElement("input");
    checkbox.setAttribute("type", "checkbox");
    checkbox.setAttribute("class", "checking");
    checkboxContainer.appendChild(checkbox);

    let close1 = document.createElement("div");
    close1.setAttribute("class", "close1");
    checkboxContainer.appendChild(close1);

    let close2 = document.createElement("div");
    close2.setAttribute("class", "close2");
    checkboxContainer.appendChild(close2);

    gifoContainer.appendChild(checkboxContainer);

    window.scrollTo(0, 0);

    checkbox.addEventListener("click", () => {
      let chekboxHeader = document.getElementById("check");
      chekboxHeader.style.display = "block";

      let gifosToDelete = gifoContainer.childNodes;
      gifoContainer.removeChild(gifosToDelete[2]);

      gifoContainer.setAttribute("class", "gifo-InActive");
      gifoImage.setAttribute("class", "gifo-InActive__image");
      gifoElments.setAttribute("class", "gifo-InActive__elments");
      iconsContainer.setAttribute("class", "elments-gifo-InActive__icons");
      textContainer.setAttribute(
        "class",
        "elments-gifo-InActive__text-container"
      );
    });
  });

  gifoContainer.addEventListener("mouseover", () => {
    if (gifoContainer.getAttribute("class") != "gifo-Expand") {
      gifoContainer.setAttribute("class", "gifo-Active");
      gifoImage.setAttribute("class", "gifo-Active__image");
      gifoElments.setAttribute("class", "gifo-Active__elments");
      iconsContainer.setAttribute("class", "elments-gifo-Active__icons");
      textContainer.setAttribute(
        "class",
        "elments-gifo-Active__text-container"
      );
    }
  });

  gifoContainer.addEventListener("mouseout", () => {
    if (gifoContainer.getAttribute("class") != "gifo-Expand") {
      gifoContainer.setAttribute("class", "gifo-InActive");
      gifoImage.setAttribute("class", "gifo-InActive__image");
      gifoElments.setAttribute("class", "gifo-InActive__elments");
      iconsContainer.setAttribute("class", "elments-gifo-InActive__icons");
      textContainer.setAttribute(
        "class",
        "elments-gifo-InActive__text-container"
      );
    }
  });
  gifoRemove.addEventListener("mouseover", () => {
    gifoRemove.setAttribute("src", "/images/icon-trash-hover.svg");
  });

  gifoRemove.addEventListener("mouseout", () => {
    gifoRemove.setAttribute("src", "/images/icon-trash-normal.svg");
  });

  gifoRemove.addEventListener("click", () => {
    gifoList.splice(gifoNumber, 1);
    localStorage.setItem("misgifos", gifoList);
  });

  gifoMax.addEventListener("mouseover", () => {
    gifoMax.setAttribute("src", "/images/icon-max-hover.svg");
  });

  gifoMax.addEventListener("mouseout", () => {
    gifoMax.setAttribute("src", "/images/icon-max-normal.svg");
  });

  gifoMax.addEventListener("click", () => {
    gifoContainer.setAttribute("class", "gifo-Expand");
    gifoImage.setAttribute("class", "gifo-Expand__image");
    gifoElments.setAttribute("class", "gifo-Expand__elments");
    iconsContainer.setAttribute("class", "elments-gifo-Expand__icons");
    textContainer.setAttribute("class", "elments-gifo-Expand__text-container");
    window.scrollTo(0, 0);

    let checkboxContainer = document.createElement("div");
    checkboxContainer.setAttribute("class", "close-it");

    let checkbox = document.createElement("input");
    checkbox.setAttribute("type", "checkbox");
    checkbox.setAttribute("class", "checking");
    checkboxContainer.appendChild(checkbox);

    let close1 = document.createElement("div");
    close1.setAttribute("class", "close1");
    checkboxContainer.appendChild(close1);

    let close2 = document.createElement("div");
    close2.setAttribute("class", "close2");
    checkboxContainer.appendChild(close2);

    gifoContainer.appendChild(checkboxContainer);

    checkbox.addEventListener("click", () => {
      gifoContainer.setAttribute("class", "gifo-InActive");
      gifoImage.setAttribute("class", "gifo-InActive__image");
      gifoElments.setAttribute("class", "gifo-InActive__elments");
      iconsContainer.setAttribute("class", "elments-gifo-InActive__icons");
      textContainer.setAttribute(
        "class",
        "elments-gifo-InActive__text-container"
      );

      let gifosToDelete = gifoContainer.childNodes;
      gifoContainer.removeChild(gifosToDelete[2]);
    });
  });

  gifoFav.addEventListener("mouseover", () => {
    if (gifoFav.getAttribute("src") != "/images/icon-fav-active.svg") {
      gifoFav.setAttribute("src", "/images/icon-fav-hover.svg");
    }
  });

  gifoFav.addEventListener("mouseout", () => {
    if (gifoFav.getAttribute("src") != "/images/icon-fav-active.svg") {
      gifoFav.setAttribute("src", "/images/icon-fav.svg");
    }
  });

  gifoFav.addEventListener("click", () => {
    if (gifoFav.getAttribute("src") != "/images/icon-fav-active.svg") {
      gifoFav.setAttribute("src", "/images/icon-fav-active.svg");
      localStorage.setItem(`${gifoData[2]}`, gifo);
      gifoToken.push(gifoData[2]);
      localStorage.setItem("tokens", gifoToken);
    } else {
      gifoFav.setAttribute("src", "/images/icon-fav.svg");
      localStorage.removeItem(`${gifoData[2]}`);
      gifoToken = removeToken(gifoToken, gifoData[2]);
      localStorage.setItem("tokens", gifoToken);
    }
  });
}

function domDetector() {
  let cuerpo = document.getElementsByTagName("body");

  let mygifosStorage = localStorage.getItem("misgifos");
  console.log(mygifosStorage);
  let mygifosContainer = document.getElementById("misGifos");

  let favStorage = localStorage.getItem("tokens");
  let favContainer = document.getElementById("favoritos");

  if (
    cuerpo[0].childNodes[3].getAttribute("src") == "/images/icon-mis-gifos.svg"
  ) {
    domUbication = "mygifos";
    insertGifos(mygifosStorage, mygifosContainer);
  }
  insertGifos(favStorage, favContainer);
}
domDetector();

//HACER FUNCION INSERELEMENT
