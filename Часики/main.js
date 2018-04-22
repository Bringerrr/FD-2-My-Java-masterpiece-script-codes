"use strict"

var circle = document.getElementById("roundBox");
var circleCenter = document.getElementById("roundBoxCenter");

var clockSeconds, clockMinutes, clockHours; // Стрелочки на циферблате 

var posSec, posMin, posHour; // Положения стрелочек
var timer1, timer2, timer3; // Таймеры дял стрелочек

var degPerSecond = 6; // Разница между секундами в градусах (360/60)
var kostyl = 15; // Пришлось прикрутить костыль, поскольку стрелки в положении rotation(0deg) указывают на красный кружочек "3" (3:15:15) 
var numbersForHour = 12; 

var str = ""

var allNumbers =[]; // массив из кружочков, показывающих время на циферблате

var FormatDateTime = function(){
    var soon = new Date();
    this.hours=soon.getHours();
    this.minutes=soon.getMinutes();
    this.seconds=soon.getSeconds();
}

var currentDate = new FormatDateTime;

var Circle = {
    padding: 50,
    width : circle.offsetWidth,
    height : circle.offsetHeight
}

for(var i=1; i<=numbersForHour;i++){
   str += "<div></div>"
}

circle.innerHTML += str;
allNumbers = circle.querySelectorAll("div");

function start(){
    posSec=+currentDate.seconds*degPerSecond; 
    posMin=+currentDate.minutes*degPerSecond+posSec/60; // для более гладкой анимации
    posHour=+currentDate.hours*30+posMin/12; // Подумать почему 12 !!!
    timer1=setInterval(tick1,10);
    timer2=setInterval(tick2,10);
    timer3=setInterval(tick3,10);
}

function tick1() {
    posSec+=0.06; // (360deg / 60sec / 100)
    clockSeconds.style.transform = "rotate(" + (posSec-kostyl*degPerSecond) + "deg)"
}

function tick2() {
    posMin+=0.001; //  (posSec / 60)
    clockMinutes.style.transform = "rotate(" + (posMin-kostyl*degPerSecond) + "deg)"
}

function tick3() {  
    posHour+=0.001/12; //  (posMin / 12)
    clockHours.style.transform = "rotate(" + (posHour-kostyl*6) + "deg)"
}

    start(); // Часики запускаются здесь!

clockSeconds = document.getElementById("clockSeconds");
clockMinutes = document.getElementById("clockMinutes");
clockHours = document.getElementById("clockHours");

clockSeconds.style.transform = "rotate(" + (currentDate.seconds*6-kostyl*degPerSecond) + "deg)" // Положение стрелок по умолчанию (до срабатывания таймера)
clockMinutes.style.transform = "rotate(" + ((currentDate.minutes*6-kostyl*degPerSecond)+(currentDate.seconds*6)/60) + "deg)" // плавность аницмации
clockHours.style.transform = "rotate(" + (currentDate.hours*30-kostyl*degPerSecond)+ "deg)" // СДЕЛАТЬ ПОПРАВКУ НА МИНУТЫ И СЕКУНДЫ!!!!!

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