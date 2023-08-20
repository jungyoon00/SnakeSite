const Timer=document.getElementById('Timer');
let time= 180000;
let min=3;
let sec=60;

const restart = document.querySelector("div > #restart");
let done = 0;

const statusView = document.querySelector("#status");

Timer.value=min+":"+'00'; 

function TIMER(){
    PlAYTIME=setInterval(function(){
        time=time-1000;
        min=time/(60*1000);

       if(sec>0){
            sec=sec-1;
            Timer.value=Math.floor(min)+':'+sec;
        }
        if(sec===0){
            sec=60;
            Timer.value=Math.floor(min)+':'+'00'
        }     
    },1000);
}

TIMER();
setTimeout(function(){
    clearInterval(PlAYTIME);
    done = 1;
    restart.classList.remove("invisible");
},180000);
