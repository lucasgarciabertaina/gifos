/* let comparator = document.getElementById('fav_mis_gifos');
if(comparator.innerHTML == 'Favoritos'){
    activator('fav')
}else if(comparator.innerHTML == 'Mis GIFOS'){
    activator('my_gifos')
}
function activator(id){
    let element = document.getElementById(id); 
    let classNames = element.getAttribute('class');
    let arrayGenerator = classNames.split(' ');
    arrayGenerator.length = 0;
    let newClass = arrayToString(arrayGenerator);
    newClass += ' favMygifos'
    element.setAttribute('class', newClass)
}
function arrayToString(array){
    let convertor = ''
    for(let i= 0; i<1;i++){
        convertor += ' '+array[i]
    }
    console.log(convertor)
    return convertor
} */
function gifoDeleteRepited(tokens) {
  let array = [];
  for (let i = 0; i < tokens.length; i++) {
    comparator = tokens[i];
    let desigual = true;
    for (let j = 0; j < tokens.length; j++) {
      if (i != j) {
        if (comparator == tokens[j]) {
          desigual = false;
        }
      }
    }
    if (desigual) {
      array.push(comparator);
    }
  }
  console.log(array);
  return array;
}

function insertFav() {
  let tokens = localStorage.getItem("tokens");
  if (tokens != null) {
    tokens = stringArrayToArray(tokens);
    tokens = gifoDeleteRepited(tokens);
  }
  if (localStorage.length != 0) {
    dataProcess(tokens)  
  }if(localStorage.length <= 1){
    let container = document.getElementById('favoritos')
    container.setAttribute('class','sin-contenido')

    let image = document.createElement('img');
    image.setAttribute('src','/images/icon-fav-sin-contenido.svg');
    image.setAttribute('class','sin-contenido__image');
    container.appendChild(image)

    let text = document.createElement('h3');
    text.setAttribute('class','sin-contenido__text');
    text.innerHTML = '¡Guarda tu primer GIFO en Favoritos para que se muestre aquí!';
    container.appendChild(text)
  }
}

function dataProcess(tokens){
    let container = document.getElementById("favoritos");
    if (localStorage.length > 13) {
        let i = 0;
        let j = 12;
        while (i < j) {
          insertFavDom(localStorage.getItem(tokens[i]));
          i++;
        }
        let button = document.createElement("input");
        button.setAttribute("type", "submit");
        button.setAttribute("id", "verMas");
        button.setAttribute("value", "VER MÁS");
        insertAfter(container, button);
    
        button.addEventListener("click", () => {
          j += 12;
          if(localStorage.length > j+1){
            console.log('localStorage.length > j')
              while(i<j){
                  insertFavDom(localStorage.getItem(tokens[i]));
                  i++;        
              }
          }else{
            console.log(`i: ${i}`)
            console.log(`Local Storage: ${localStorage.length}`)
               for(i;i<localStorage.length-1;i++){
                 console.log(i)
                  insertFavDom(localStorage.getItem(tokens[i]));        
              }
            let html = document.getElementsByTagName('body');
            html[0].removeChild(html[0].childNodes[8])
          }
        });

    } else {
        let i = 0;
        let j = tokens.length;
        while (i < j) {
          insertFavDom(localStorage.getItem(tokens[i]));
          i++;
        } 
    }
}

  function insertFavDom(gifoDataString) {
    let gifoData = stringArrayToArray(gifoDataString);
    let container = document.getElementById('favoritos')

    let gifoContainer = document.createElement("div");
    gifoContainer.setAttribute("class", "gifo-InActive");

    let gifoImage = document.createElement('img');
    gifoImage.setAttribute('src', gifoData[0]);
    gifoImage.setAttribute('class', 'gifo-InActive__image');
    gifoContainer.appendChild(gifoImage);

    let gifoElments = document.createElement('div');
    gifoElments.setAttribute('class', 'gifo-InActive__elments');
    gifoContainer.appendChild(gifoElments);
    
    let iconsContainer = document.createElement('div');
    iconsContainer.setAttribute('class', 'elments-gifo-InActive__icons')
    gifoElments.appendChild(iconsContainer);

    let gifoFav = document.createElement('img');
    if(gifoData[3]){
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
    gifoTitle.innerHTML = gifoData[2];
    gifoTitle.setAttribute('class', 'text-container__title')
    textContainer.appendChild(gifoTitle);

    let gifoUser = document.createElement('p');
    gifoUser.innerHTML = gifoData[1];
    gifoUser.setAttribute('class', 'text-container__user');
    textContainer.appendChild(gifoUser);

    container.appendChild(gifoContainer)

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
            localStorage.setItem(`${gifoData[2]}`, gifo);
            gifoToken.push(gifoData[2]);
            localStorage.setItem('tokens', gifoToken);
        }else{
            gifoFav.setAttribute('src', '/images/icon-fav.svg');
            localStorage.removeItem(`${gifoData[2]}`);
            gifoToken = removeToken(gifoToken,gifoData[2]);
            localStorage.setItem('tokens', gifoToken);
    }})
 }

insertFav();
