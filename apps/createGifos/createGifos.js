//GRABADA DE GIFOS
let video = document.getElementById("video");
let containerVideo = document.getElementById("container-video");
let gifo;
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

async function getStreamAndRecord() {
  let mediaStream = await navigator.mediaDevices
    .getUserMedia({
      audio: false,
      video: {
        height: { max: 480 },
      },
    })
    .then(function (stream) {
      let startBot = permisionAceptedLayout();
      video.srcObject = stream;
      video.pause();
      video.style.backgroundColor = "black";
      startBot.addEventListener("click", () => {
        video.style.backgroundColor = "initial";
        let recorder = RecordRTC(stream, {
          type: "video",
        });
        recorder.startRecording();
        video.play();
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
        finalizar.addEventListener("click", async() => {
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
          video.pause();
          recorder.stopRecording(function() {
            var blob = new Blob(gifo, {
              type: "video/webm"
            });
            var url = URL.createObjectURL(blob);
            return url
          });
         
          subirGifo.addEventListener("click", () => {
    /*         let elemento = document.createElement("div");
            elemento.setAttribute("class", "elemento_sobresaliente");
            containerVideo.appendChild(video);
            containerVideo.appendChild(elemento); */
            localStorage.setItem('gifo-propio',url)
          });
          contador.addEventListener("click", () => {

            let recorder = RecordRTC(stream, {
              type: "video",
            });
            video.play();
            recorder.startRecording();
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
            video.play();
            recorder.startRecording();

            let finalizar = document.createElement("input");
            finalizar.setAttribute("type", "submit");
            finalizar.setAttribute("class", "comenzar");
            finalizar.setAttribute("value", "FINALIZAR");
            finalizar.setAttribute("id", "finalizar");
            insertBoton(finalizar);
            deleteBoton();

            finalizar.addEventListener("click", async () => {
              window.clearInterval(intervalo);
              contador.innerHTML = "";

              let subirGifo = document.createElement("input");
              subirGifo.setAttribute("type", "submit");
              subirGifo.setAttribute("class", "comenzar");
              subirGifo.setAttribute("value", "SUBIR GIFO");
              insertBoton(subirGifo);
              deleteBoton();

              video.pause();
              recorder.stopRecording(function() {
                console.log('terminado')
              });

              subirGifo.addEventListener("click", () => {
       
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
  while (i < 7) {
    containerVideo.removeChild(elemtsDelete[1]);
    i++;
  }
  let dos = document.getElementById("dos");
  dos.style.color = "rgba(255,255,255,1)";
  dos.style.backgroundColor = "rgba(87,46,229,1)";

  uno.style.color = "rgba(87,46,229,1)";
  uno.style.backgroundColor = "rgba(255,255,255,1)";

  deleteBoton();
  const startBot = document.createElement("input");
  startBot.setAttribute("type", "submit");
  startBot.setAttribute("class", "comenzar");
  startBot.setAttribute("value", "GRABAR");
  insertBoton(startBot);

  return startBot;
}
