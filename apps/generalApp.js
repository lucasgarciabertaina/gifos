//Mode Nocturno/Diurno
function darkmode(){
    let body = document.getElementsByTagName('body')
    let modo = document.getElementById("dark_default");
    let camaraDark = document.getElementById("camara");
    let peliculaDark = document.getElementById("pelicula")
    let imgClose = document.getElementById('img_close_on')
    if(sessionStorage.getItem('modo') == null || sessionStorage.getItem('modo') == 'Modo Diurno'){
        body[0].setAttribute("class","darkmode");
        modo.value = "Modo Diurno";
        if(camaraDark != null){
            camaraDark.removeAttribute("src");
            camaraDark.setAttribute("src", "/images/camara-modo-noc.svg");
            peliculaDark.removeAttribute("src");
            peliculaDark.setAttribute("src", "/images/pelicula-modo-noc.svg");
        }
        sessionStorage.setItem('modo','Modo Nocturno');
    }
    else if(sessionStorage.getItem('modo') == 'Modo Nocturno'){
        body[0].removeAttribute("class","darkmode");
        modo.value = "Modo Nocturno";
        if(camaraDark != null){
            camaraDark.removeAttribute("src");
            camaraDark.setAttribute("src", "/images/camara.svg");
            peliculaDark.removeAttribute("src");
            peliculaDark.setAttribute("src", "/images/pelicula.svg");
        }
        sessionStorage.removeItem('modo');
        sessionStorage.setItem('modo','Modo Diurno')   
    }       
}

//Comprobador de la función en los otros enlaces
if(sessionStorage.getItem('modo') != null){
    if(sessionStorage.getItem('modo') == 'Modo Nocturno'){
        sessionStorage.setItem('modo', 'Modo Diurno');
        darkmode();
    }else{
        sessionStorage.setItem('modo', 'Modo Nocturno');
        darkmode();
    }
}

//API GIPHY TRENDIG GIFOS
const apiKey = 'DENft9K6PwvYPg4VZEJmkeY2iciLh2yb';
let trendingContainer = document.getElementById('trending');
let endPointTrending = `http://api.giphy.com/v1/gifs/trending?api_key=${apiKey}&limit=50offset=0`;

async function callApi(endpoint){
    const server = await fetch(endpoint);
    let json = await server.json();
    return json
}

function acomodateGifos(json){
    if(json.data.length != 50){
        let gifos = [];
        return gifos
    }else{
        let gifos = []
        for(let i = 0; i<49;i++){
            let array = []
            array.push(json.data[i].images.original.url)
            array.push(json.data[i].username)
            array.push(json.data[i].title)
            array.push(favorite(json.data[i].title,gifoToken))
            gifos.push(array)
        }
        return gifos
    }
}

function stringArrayToArray(stringArray){
    let array = [];
    let word = '';
    if(stringArray != 0){
        for(let i=0;i< stringArray.length+1;i++){
            if(stringArray[i] == ',' ||  i == stringArray.length){
                array.push(word);
                word = '';
            }else{
                word += stringArray[i];
            }
        }
    }
    return array
}

function insertAfter(e, i) {
    if (e.nextSibling) {
      e.parentNode.insertBefore(i, e.nextSibling);
    } else {
      e.parentNode.appendChild(i);
    }
  }

let gifoToken = []

if(localStorage.getItem('tokens') != null){
    gifoToken = localStorage.getItem('tokens');
    gifoToken = stringArrayToArray(gifoToken);
}

function favorite(gifoToken,tokens){
    if(tokens.length == 0){
        return false
    }else{
        for(let i = 0; i<tokens.length; i++){
            if(tokens[i] == gifoToken){
                return true
            }
        }
        return false
    }
}

function checkboxState(state){
    document.getElementById('check').checked = state;
}


function insertInDOM(gifos,i,j,container){
    if(gifos.length == 0){
        let imgError = document.createElement('img');
        imgError.setAttribute('src','/images/icon-busqueda-sin-resultado.svg');
        imgError.setAttribute('class','img_error');
        if(imgError != null && container != null){
            container.appendChild(imgError);
        }

        let textError = document.createElement('h3');
        textError.setAttribute('class','text_error')
        textError.innerHTML = 'Intenta con otra búsqueda.';
        container.appendChild(textError);
    }else{
        for(i;i<j;i++){
            let gifo = gifos[i];
            let gifoContainer = document.createElement('div');
            gifoContainer.setAttribute('class', 'gifo-InActive');
            
            let gifoImage = document.createElement('img');
            gifoImage.setAttribute('src', gifo[0]);
            gifoImage.setAttribute('class', 'gifo-InActive__image');
            gifoContainer.appendChild(gifoImage);

            let gifoElments = document.createElement('div');
            gifoElments.setAttribute('class', 'gifo-InActive__elments');
            gifoContainer.appendChild(gifoElments);
            
            let iconsContainer = document.createElement('div');
            iconsContainer.setAttribute('class', 'elments-gifo-InActive__icons')
            gifoElments.appendChild(iconsContainer);

            let gifoFav = document.createElement('img');
            if(gifo[3]){
                gifoFav.setAttribute('src', '/images/icon-fav-active.svg')  
            }else{
                gifoFav.setAttribute('src', '/images/icon-fav.svg');
            }
            gifoFav.setAttribute('class', 'icons__gifo-fav');
            iconsContainer.appendChild(gifoFav);

            let gifoDownload = document.createElement('img');
            gifoDownload.setAttribute('src', '/images/icon-download.svg');
            gifoDownload.setAttribute('class', 'icons__gifo-download');
            iconsContainer.appendChild(gifoDownload);

            let gifoMax = document.createElement('img');
            gifoMax.setAttribute('src', '/images/icon-max-normal.svg');
            gifoMax.setAttribute('class', 'icons__gifo-max');
            iconsContainer.appendChild(gifoMax);

            let textContainer = document.createElement('div');
            textContainer.setAttribute('class', 'elments-gifo-InActive__text-container')
            gifoElments.appendChild(textContainer);

            let gifoTitle = document.createElement('h3');
            gifoTitle.innerHTML = gifo[2];
            gifoTitle.setAttribute('class', 'text-container__title')
            textContainer.appendChild(gifoTitle);

            let gifoUser = document.createElement('p');
            gifoUser.innerHTML = gifo[1];
            gifoUser.setAttribute('class', 'text-container__user');
            textContainer.appendChild(gifoUser);

            if(gifoTitle.length != null){
                container.appendChild(gifoContainer)
            }

            gifoImage.addEventListener('click', () =>{
                let chekboxHeader = document.getElementById('check');
                chekboxHeader.style.display = 'none';
                gifoContainer.setAttribute('class', 'gifo-Expand');

                gifoImage.setAttribute('class', 'gifo-Expand__image')
                gifoElments.setAttribute('class', 'gifo-Expand__elments');
                iconsContainer.setAttribute('class', 'elments-gifo-Expand__icons');
                textContainer.setAttribute('class', 'elments-gifo-Expand__text-container');

                let checkboxContainer = document.createElement('div');
                checkboxContainer.setAttribute('class','close-it');

                let checkbox = document.createElement('input');
                checkbox.setAttribute('type','checkbox');
                checkbox.setAttribute('class','checking');
                checkboxContainer.appendChild(checkbox);

                let close1 = document.createElement('div');
                close1.setAttribute('class','close1');
                checkboxContainer.appendChild(close1);
                
                let close2 = document.createElement('div'); 
                close2.setAttribute('class','close2');
                checkboxContainer.appendChild(close2);

                gifoContainer.appendChild(checkboxContainer);

                window.scrollTo(0,0)


                checkbox.addEventListener('click', () =>{
                    let chekboxHeader = document.getElementById('check');
                    chekboxHeader.style.display = 'block';
        
                    let gifosToDelete = gifoContainer.childNodes;
                    gifoContainer.removeChild(gifosToDelete[2]);

                    gifoContainer.setAttribute('class','gifo-InActive');
                    gifoImage.setAttribute('class', 'gifo-InActive__image');
                    gifoElments.setAttribute('class', 'gifo-InActive__elments')
                    iconsContainer.setAttribute('class', 'elments-gifo-InActive__icons');
                    textContainer.setAttribute('class', 'elments-gifo-InActive__text-container');                 
                })
    
            })


            gifoContainer.addEventListener('mouseover',()=>{
                if(gifoContainer.getAttribute('class') != 'gifo-Expand'){
                    gifoContainer.setAttribute('class', 'gifo-Active');
                    gifoImage.setAttribute('class', 'gifo-Active__image')
                    gifoElments.setAttribute('class', 'gifo-Active__elments');
                    iconsContainer.setAttribute('class', 'elments-gifo-Active__icons');
                    textContainer.setAttribute('class', 'elments-gifo-Active__text-container');
                }
            })

            gifoContainer.addEventListener('mouseout' ,() => {
                if(gifoContainer.getAttribute('class') != 'gifo-Expand'){
                    gifoContainer.setAttribute('class','gifo-InActive');
                    gifoImage.setAttribute('class', 'gifo-InActive__image');
                    gifoElments.setAttribute('class', 'gifo-InActive__elments')
                    iconsContainer.setAttribute('class', 'elments-gifo-InActive__icons');
                    textContainer.setAttribute('class', 'elments-gifo-InActive__text-container');
                }
            })

            gifoMax.addEventListener('mouseover',()=>{
                gifoMax.setAttribute('src','/images/icon-max-hover.svg');})
            
            gifoMax.addEventListener('mouseout',()=> {
                gifoMax.setAttribute('src','/images/icon-max-normal.svg')});

            gifoMax.addEventListener('click',()=>{
                gifoContainer.setAttribute('class','gifo-Expand');
                gifoImage.setAttribute('class', 'gifo-Expand__image');
                gifoElments.setAttribute('class', 'gifo-Expand__elments')
                iconsContainer.setAttribute('class', 'elments-gifo-Expand__icons');
                textContainer.setAttribute('class', 'elments-gifo-Expand__text-container');
                window.scrollTo(0,0)

                let checkboxContainer = document.createElement('div')
                checkboxContainer.setAttribute('class','close-it')
                
                let checkbox = document.createElement('input');
                checkbox.setAttribute('type','checkbox');
                checkbox.setAttribute('class','checking');
                checkboxContainer.appendChild(checkbox);

                let close1 = document.createElement('div');
                close1.setAttribute('class','close1');
                checkboxContainer.appendChild(close1);
                
                let close2 = document.createElement('div'); 
                close2.setAttribute('class','close2');
                checkboxContainer.appendChild(close2);

                gifoContainer.appendChild(checkboxContainer);

                checkbox.addEventListener('click',()=>{
                    gifoContainer.setAttribute('class','gifo-InActive');
                    gifoImage.setAttribute('class', 'gifo-InActive__image');
                    gifoElments.setAttribute('class', 'gifo-InActive__elments')
                    iconsContainer.setAttribute('class', 'elments-gifo-InActive__icons');
                    textContainer.setAttribute('class', 'elments-gifo-InActive__text-container');

                    let gifosToDelete = gifoContainer.childNodes;
                    gifoContainer.removeChild(gifosToDelete[2]);
                
                })
            })

            gifoFav.addEventListener('mouseover',()=> {
                if(gifoFav.getAttribute('src') != '/images/icon-fav-active.svg'){
                    gifoFav.setAttribute('src','/images/icon-fav-hover.svg')}});
            
            gifoFav.addEventListener('mouseout',()=> {
                if(gifoFav.getAttribute('src') != '/images/icon-fav-active.svg'){
                gifoFav.setAttribute('src','/images/icon-fav.svg')}});
            
            gifoFav.addEventListener('click',()=>{
                if(gifoFav.getAttribute('src') != '/images/icon-fav-active.svg'){
                    gifoFav.setAttribute('src', '/images/icon-fav-active.svg');
                    localStorage.setItem(`${gifo[2]}`, gifo);
                    gifoToken.push(gifo[2]);
                    localStorage.setItem('tokens', gifoToken);
                }else{
                    gifoFav.setAttribute('src', '/images/icon-fav.svg');
                    localStorage.removeItem(`${gifo[2]}`);
                    gifoToken = removeToken(gifoToken,gifo[2]);
                    localStorage.setItem('tokens', gifoToken);
            }})
        }
    }
}

function removeToken(tokens,token){
    for(let i=0; i< tokens.length;i++){
        let comparator = tokens[i]
        if(comparator == token){
            tokens.shift(i)
        }
    }
    return tokens
}


function deleteOld(){
    let gifosToDelete = trendingContainer.childNodes;
    for(let i=0; i<3;i++){
        trendingContainer.removeChild(gifosToDelete[0])
    }
}

let i = 0;
let j = 3;
callApi(endPointTrending)
.then(json =>{
    let acomodateTrending = acomodateGifos(json);
    insertInDOM(acomodateTrending,i,j,trendingContainer);

    let arrowLeft = document.getElementById('arrow_left');
    if(arrowLeft != null){
        arrowLeft.addEventListener('click',()=>{
            deleteOld()
            if(i == 48 || j == 48){
                i = 0;
                j = 3
            }else{
                i = i+3;
                j = j+3;
            }
            insertInDOM(acomodateTrending,i,j,trendingContainer)
        })
    }
    let arrowRight = document.getElementById('arrow_right');
    if(arrowRight != null){
        arrowRight.addEventListener('click', ()=>{
            deleteOld()
            if(i <= 0 || j <= 0){
                i = 45;
                j = 48;
            }else{
                i = i-3;
                j = j-3;
            }
            insertInDOM(acomodateTrending,i,j,trendingContainer)
        })
    }
    if(trendingContainer != null){
        trendingContainer.addEventListener('scroll',() => {
            var x = trendingContainer.offsetLeft;
            var z = trendingContainer.scrollLeft;
            let controler = -60
            if(x-z < controler){
                i = i+3;
                j = j+3;
                if(i == 48 || j == 48){
                    i = 0;
                    j = 3
                }else{
                    i = i+3;
                    j = j+3;
                }
                controler*2
                insertInDOM(acomodateTrending,i,j,trendingContainer)
            }
        });
    }
})

//ELEMENTO GIFO
//Pre armo como quedaría en un gif y despues lo aplico a la función
//AGARRO FUNCIÓN insertInDOM y le agrego un div a cada gif que vaya a meter
//Cambiar configuración general que tengan los divs (puede que cause error)
//ERROR CUANDO SE REALIZA LA BUSQUEDA. NO TE ACTUALIZA LO RECOMENDADO.