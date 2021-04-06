//GRABADA DE GIFOS
function deleteBot(url) {
  console.log(url);
  let word = "";
  for (let i = 5; i < url.length; i++) {
    word += url[i];
  }
  return word;
}
let contenedorVideo = document.getElementById("contenedor-video");
let video = document.getElementById("video");
let backgroundVideo = document.getElementById("background-video");
let containerVideo = document.getElementById("container-video");
let elemtsDelete = containerVideo.childNodes;
console.log(elemtsDelete);

let start = document.getElementById("boton");
start.addEventListener("click", () => {
  start.style.display = "none";
  let title = document.getElementById("title-crearGifo");
  title.innerHTML = "¿Nos das acceso <br> a tu cámara?";
  let text1 = document.getElementById("text1-crearGifo");
  text1.innerHTML = "El acceso a tu camara será válido sólo";
  let text2 = document.getElementById("text2-crearGifo");
  text2.innerHTML = "por el tiempo en el que estés creando el GIFO.";

  let uno = document.getElementById("uno");
  uno.style.color = "rgba(255,255,255,1)";
  uno.style.backgroundColor = "rgba(87,46,229,1)";

  getStreamAndRecord();
});
function deleteBoton() {
  let body = document.getElementsByTagName("body");
  let elements = body[0].childNodes;
  body[0].removeChild(elements[9]);
}

function deleteRepite() {
  let container = document.getElementById("sec_numeros");
  let element = document.getElementById("contador");
  container.removeChild(element);
}

function quantityGifos() {
  if (localStorage.getItem("misgifos") != null) {
    let gifos = localStorage.getItem("misgifos");
    gifos = tokenDataToContent(gifos);
    console.log(gifos);
    return gifos;
  } else {
    let gifos = [];
    console.log(gifos);
    return gifos;
  }
}

let gifo = quantityGifos();

async function getStreamAndRecord() {
  await navigator.mediaDevices
    .getUserMedia({
      audio: false,
      video: {
        height: { max: 480 },
      },
    })
    .then(function (mediaStream) {
      let startBot = permisionAceptedLayout();
      contenedorVideo.style.display = "block";
      video.srcObject = mediaStream;
      video.pause();
      startBot.addEventListener("click", () => {
        var recorder = new GifRecorder(mediaStream, {
          disableLogs: true,
          width: 320,
          height: 240,
          frameRate: 200,
          quality: 10,
        });
        backgroundVideo.style.backgroundColor = "initial";
        video.play();
        recorder.record();
        let contador = document.getElementById("contador");

        let finalizar = document.createElement("input");
        finalizar.setAttribute("type", "submit");
        finalizar.setAttribute("class", "comenzar");
        finalizar.setAttribute("value", "FINALIZAR");
        finalizar.setAttribute("id", "finalizar");

        insertBoton(finalizar);
        deleteBoton();
        let sec = 0;
        let min = 0;
        let hour = 0;
        var intervalo = setInterval(() => {
          sec++;
          if (sec == 60) {
            min++;
            sec = 0;
          }
          if (min == 60) {
            hour++;
            min = 0;
          }
          if (sec < 10 && min < 10 && hour < 10) {
            contador.innerHTML = `0${hour}:0${min}:0${sec}`;
          } else if (sec > 9 && min < 10 && hour < 10) {
            contador.innerHTML = `0${hour}:0${min}:${sec}`;
          } else if (sec > 9 && min > 9 && hour < 10) {
            contador.innerHTML = `0${hour}:${min}:${sec}`;
          } else if (sec > 9 && min > 9 && hour > 9) {
            contador.innerHTML = `${hour}:${min}:${sec}`;
          } else if (sec > 9 && min < 10 && hour > 9) {
            contador.innerHTML = `${hour}:0${min}:${sec}`;
          } else if (sec < 10 && min > 9 && hour > 9) {
            contador.innerHTML = `0${hour}:${min}:${sec}`;
          } else if (sec < 10 && min < 10 && hour > 9) {
            contador.innerHTML = `${hour}:00:00`;
          }
        }, 1000);
        finalizar.addEventListener("click", () => {
          let subirGifo = document.createElement("input");
          subirGifo.setAttribute("type", "submit");
          subirGifo.setAttribute("class", "comenzar");
          subirGifo.setAttribute("value", "SUBIR GIFO");
          insertBoton(subirGifo);
          deleteBoton();

          window.clearInterval(intervalo);
          let contador = document.getElementById("contador");
          contador.innerHTML = "REPETIR CAPTURA";
          contador.style.textDecorationLine = "underline";
          contador.style.textDecorationColor = "rgba(80,227,194,1)";
          let img = document.createElement("img");
          video.pause();
          let blobMy;
          let blobUrl;
          recorder.stop((blob) => {
            (blobMy = blob), { type: "text/xml" };
            blobUrl = URL.createObjectURL(blob);
          });
          console.log(blobMy);

          let form = new FormData();

          /*           let gifoPropio = img.getAttribute("src");
          gifoPropio = deleteBot(gifoPropio); */

          subirGifo.addEventListener("click", () => {
            backgroundVideo.style.backgroundColor = "rgba(87,46,229,0.5)";
            let body = document.getElementsByTagName("body");
            let elements = body[0].childNodes;
            body[0].removeChild(elements[8]);
            deleteRepite();
            /* gifo.push(gifoPropio);
            localStorage.setItem("misgifos", gifo); */
            finishCreation();

            let spaceIcons = document.createElement("div");
            spaceIcons.setAttribute("class", "iconos-final");

            let link = document.createElement("img");
            link.setAttribute("src", "/images/icon-link-normal.svg");
            link.setAttribute("class", "link");
            link.style.display = "none";

            let download = document.createElement("img");
            download.setAttribute("src", "/images/icon-download.svg");
            download.setAttribute("class", "downlad");
            download.style.display = "none";

            spaceIcons.appendChild(link);
            spaceIcons.appendChild(download);

            spaceTwo = document.createElement("div");
            spaceTwo.setAttribute("class", "space-two");

            let img = document.createElement("img");
            img.setAttribute("src", "/images/loader.svg");
            img.setAttribute("class", "img-final");
            spaceTwo.appendChild(img);

            let text = document.createElement("p");
            text.setAttribute("class", "text-final");
            text.innerHTML = "Estamos subiendo tu GIFO";
            spaceTwo.appendChild(text);

            backgroundVideo.appendChild(spaceIcons);
            backgroundVideo.appendChild(spaceTwo);
            console.log(form.get("file"));

            form.append("file", blobMy, "myGif.gif");

            console.log(form.get("file"));

            let endPointUpload = `http://upload.giphy.com/v1/gifs?api_key=${apiKey}`;

            callApi(endPointUpload).then((json) => {
              console.log(json);
            });
            setTimeout(() => {
              text.innerHTML = "GIFO subido con éxito";
              img.setAttribute("src", "/images/check.svg");
              download.style.display = "block";
              link.style.display = "block";

              download.addEventListener("mouseover", () => {
                download.setAttribute("src", "/images/icon-download-hover.svg");
              });

              download.addEventListener("mouseout", () => {
                download.setAttribute("src", "/images/icon-download.svg");
              });

              link.addEventListener("mouseover", () => {
                link.setAttribute("src", "/images/icon-link-hover.svg");
              });

              link.addEventListener("mouseout", () => {
                link.setAttribute("src", "/images/icon-link-normal.svg");
              });
            }, 3000);
          });

          contador.addEventListener("click", () => {
            let finalizar2 = document.createElement("input");
            finalizar2.setAttribute("type", "submit");
            finalizar2.setAttribute("class", "comenzar");
            finalizar2.setAttribute("value", "FINALIZAR");
            finalizar2.setAttribute("id", "finalizar");
            insertBoton(finalizar2);
            deleteBoton();

            var recorder = new GifRecorder(stream, {
              disableLogs: true,
              width: 320,
              height: 240,
              frameRate: 200,
              quality: 10,
            });
            video.play();
            recorder.record();
            let sec = 0;
            let min = 0;
            let hour = 0;
            var intervalo = setInterval(() => {
              sec++;
              if (sec == 60) {
                min++;
                sec = 0;
              }
              if (min == 60) {
                hour++;
                min = 0;
              }
              if (sec < 10 && min < 10 && hour < 10) {
                contador.innerHTML = `0${hour}:0${min}:0${sec}`;
              } else if (sec > 9 && min < 10 && hour < 10) {
                contador.innerHTML = `0${hour}:0${min}:${sec}`;
              } else if (sec > 9 && min > 9 && hour < 10) {
                contador.innerHTML = `0${hour}:${min}:${sec}`;
              } else if (sec > 9 && min > 9 && hour > 9) {
                contador.innerHTML = `${hour}:${min}:${sec}`;
              } else if (sec > 9 && min < 10 && hour > 9) {
                contador.innerHTML = `${hour}:0${min}:${sec}`;
              } else if (sec < 10 && min > 9 && hour > 9) {
                contador.innerHTML = `0${hour}:${min}:${sec}`;
              } else if (sec < 10 && min < 10 && hour > 9) {
                contador.innerHTML = `${hour}:00:00`;
              }
            }, 1000);

            contador.style.textDecorationLine = "none";

            finalizar2.addEventListener("click", () => {
              window.clearInterval(intervalo);
              contador.innerHTML = "";

              let subirGifo2 = document.createElement("input");
              subirGifo2.setAttribute("type", "submit");
              subirGifo2.setAttribute("class", "comenzar");
              subirGifo2.setAttribute("value", "SUBIR GIFO");
              insertBoton(subirGifo2);
              deleteBoton();
              video.pause();
              let img = document.createElement("img");
              recorder.stop(() => {
                console.log("i will stop");
              });
              let gifoPropio = img.getAttribute("src");
              gifoPropio = deleteBot(gifoPropio);
              subirGifo2.addEventListener("click", () => {
                let form = new FormData();
                form.append("file", recorder.getBlob(), "myGif.gif");
                let funciona = form.get("file");
                console.log(funciona);

                backgroundVideo.style.backgroundColor = "blue";
                deleteBoton();

                gifo.push(gifoPropio);
                localStorage.setItem("misgifos", gifo);
              });
            });
          });
        });
      });
    });
}
function insertBoton(boton) {
  let e = document.getElementById("insertAfter");
  insertAfter(e, boton);
}

function permisionAceptedLayout() {
  let i = 1;
  while (i < 6) {
    containerVideo.removeChild(elemtsDelete[1]);
    i++;
  }
  let dos = document.getElementById("dos");
  dos.style.color = "rgba(255,255,255,1)";
  dos.style.backgroundColor = "rgba(87,46,229,1)";

  uno.style.color = "rgba(87,46,229,1)";
  uno.style.backgroundColor = "initial";

  deleteBoton();
  const startBot = document.createElement("input");
  startBot.setAttribute("type", "submit");
  startBot.setAttribute("class", "comenzar");
  startBot.setAttribute("value", "GRABAR");
  insertBoton(startBot);

  return startBot;
}

function finishCreation() {
  let dos = document.getElementById("dos");
  let tres = document.getElementById("tre");

  dos.style.color = "rgba(87,46,229,1)";
  dos.style.backgroundColor = "initial";

  tres.style.color = "rgba(255,255,255,1)";
  tres.style.backgroundColor = "rgba(87,46,229,1)";
}
