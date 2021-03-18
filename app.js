let sec = 0;
let min = 0;
let hour = 0;
let hora = document.getElementById('hora');
setInterval(()=>{
    sec++;
    if(sec == 60){
        min++;
        sec = 0;
    }if(min == 60){
        hour++
        min = 0;
    }if(sec<10 && min<10 && hour<10){
        hora.innerHTML = `0${hour}:0${min}:0${sec}`
    }else if(sec>9 && min<10 && hour<10){
        hora.innerHTML = `0${hour}:0${min}:${sec}`
    }else if(sec>9 && min>9 && hour<10){
        hora.innerHTML = `0${hour}:${min}:${sec}`
    }else if (sec>9 && min>9 && hour>9){
        hora.innerHTML = `${hour}:${min}:${sec}`
    }else if(sec>9 && min<10 && hour>9){
        hora.innerHTML = `${hour}:0${min}:${sec}`
    }else if(sec<10 && min>9 && hour>9){
        hora.innerHTML = `0${hour}:${min}:${sec}`
    }else if(sec<10 && min<10 && hour>9){
        hora.innerHTML = `${hour}:00:00`
    }
},1000)