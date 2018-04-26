"use strict"

var circle = document.getElementById("roundBox");
var circleCenter = document.getElementById("roundBoxCenter");

var clockMiliSeconds, clockSeconds, clockMinutes, clockHours; // Стрелочки на циферблате 

var timeTable; 

var posMili, posSec, posMin, posHour; // Положения стрелочек
var timer0, timer1, timer2, timer3; // Таймеры дял стрелочек

var tickDegPerSecond = 6; // глрадусов в одном тике в секунду (360/60 = 6)
var tickDegPerHour = 30; // (360/12 = 30)
var secsInOneMinute = 60; var miliSecondsInOneSec = 1000; 

var kostyl = 15; // Пришлось прикрутить костыль, поскольку стрелки в положении rotation(0deg) указывают на красный кружочек "3" (находятся в горизонтальном положении) (3:15:15) 
var numbersForHour = 12;

var str = ""

var allNumbers =[]; // массив из кружочков, показывающих время на циферблате

var FormatDateTime = function(){
    var soon = new Date();
    this.hours=soon.getHours();
    this.minutes=soon.getMinutes();
    this.seconds=soon.getSeconds();
    this.miliSeconds=soon.getMilliseconds();
}

var currentDate = new FormatDateTime;

var Circle = {
    padding: 50,
    width : circle.offsetWidth,
    height : circle.offsetHeight
}

for(var i=1; i<=numbersForHour;i++){ // создаем кружки дял цифр
   str += "<div></div>"
}

circle.innerHTML += str;
allNumbers = circle.querySelectorAll("div");

function start(){

    posMili = +currentDate.miliSeconds;
    posSec = +currentDate.seconds * tickDegPerSecond + posMili / miliSecondsInOneSec // для более гладкой анимации
    posMin = +currentDate.minutes * tickDegPerSecond + posSec / secsInOneMinute; 
    posHour = +currentDate.hours * tickDegPerHour + (posMin / numbersForHour);
    timer0=setInterval(tick0,10);
    timer1=setInterval(tick1,10);
    timer2=setInterval(tick2,10);
    timer3=setInterval(tick3,10);
}

function tick0() {  
    posMili+=3.6; // (360 / 1000 milisec / 10 )
    clockMiliSeconds.style.transform = "rotate(" + (posMili-250) + "deg)"
}

function tick1() {
    posSec+=0.06; // (360deg / 60sec / 100)
    clockSeconds.style.transform = "rotate(" + (posSec-kostyl*tickDegPerSecond) + "deg)"
}

function tick2() {
    posMin+=0.001; //  (posSec / 60)
    clockMinutes.style.transform = "rotate(" + (posMin-kostyl*tickDegPerSecond) + "deg)"
}

function tick3() {  
    posHour+=0.001/12; //  (posMin / 12)
    clockHours.style.transform = "rotate(" + (posHour-kostyl*tickDegPerHour) + "deg)"
}


 
clockMiliSeconds = document.getElementById("clockMiliSeconds");
clockSeconds = document.getElementById("clockSeconds");
clockMinutes = document.getElementById("clockMinutes");
clockHours = document.getElementById("clockHours");

var hour = (currentDate.hours*tickDegPerHour-3*tickDegPerHour)+(currentDate.minutes*6)/12 // Данное выражение некоректно работало, пока я сделал его переменной

clockSeconds.style.transform = "rotate(" + (currentDate.seconds*6-kostyl*tickDegPerSecond) + "deg)" // Положение стрелок по умолчанию (до срабатывания таймера)
clockMinutes.style.transform = "rotate(" + ((currentDate.minutes*6-kostyl*tickDegPerSecond)+(currentDate.seconds*6)/60) + "deg)"
clockHours.style.transform = "rotate(" + hour+ "deg)"

var left = getElementPos(allNumbers[0]).left; // Переменные для формулы
var right = getElementPos(allNumbers[0]).top;

for(i=1; i<=numbersForHour;){ 
    allNumbers[i-1].style.left = (Circle.width/2-Circle.padding) * - Math.sin((-Math.PI/6)*i)  + Circle.width/2 + "px"; // Формула разработанна собственноручно :)
    allNumbers[i-1].style.top =  (Circle.width/2-Circle.padding) * - Math.cos((-Math.PI/6)*i)  + Circle.width/2 + "px";
    allNumbers[i-1].innerHTML += "<span>"+i+"</span>";
    i++;
}

function getElementPos(elem) {
    var bbox=elem.getBoundingClientRect();
    return {
        left: bbox.left+window.pageXOffset,
        top: bbox.top+window.pageYOffset
    };
}

timeTable = document.getElementById("time");

setInterval(updateTime,10)
start(); // Часики запускаются здесь!

function updateTime(){
    var updatedTime = new FormatDateTime
    timeTable.innerHTML=str0l(updatedTime.hours,2)+" : "+str0l(updatedTime.minutes,2)+" : "+str0l(updatedTime.seconds,2)+" : "+str0l(Math.floor(updatedTime.miliSeconds/10),2);
}

function str0l(val,len) {
    var strVal=val.toString();
    while ( strVal.length < len )
        strVal='0'+strVal;
    return strVal;
}