"use strict";

var Ball = function() {

    var self = this;

    self.posX= 0;
    self.posY= 0;
    self.speedX= 5;
    self.speedY= 5;
    self.width= 60;
    self.height= 60;

    // Координаты точек
    self.coordBL = [self.posX,self.posY+self.height]; //  coordBL [0,1], где 0 - это Х, 1 - это Y
    self.coordTR = [self.posX+self.width,self.posY]; // 
    self.coordTL = [self.posX,self.posY]; // Y
    self.coordBR = [self.posX+self.width,self.posY+self.height]; // 

    self.setPosition = function (x,y){
        self.posX = x;
        self.posY = y;
    };

    self.update = function () { 
        self.coordBL = [self.posX,self.posY+self.height]; // 
        self.coordTR = [self.posX+self.width,self.posY]; //
        self.coordTL = [self.posX,self.posY]; 
        self.coordBR = [self.posX+self.width,self.posY+self.height];

        var ballElem = document.getElementById('IBall');

        ballElem.style.left = this.posX + "px";
        ballElem.style.top = this.posY + "px";
    }
}

var ballH = new Ball();

var score = document.getElementById("score")

var scoreParam = {
    left: 0,
    right: 0
}
var areaH = {
    width: 600,
    height: 300
}

ballH.setPosition(areaH.width/2-ballH.width/2,areaH.height/2-ballH.height/2)

var mainField = document.getElementById("mainField")

mainField.style.width = areaH.width + "px"
mainField.style.height = areaH.height + "px"

var block1 = document.getElementById("block1")
var block2 = document.getElementById("block2")
var pause= document.getElementById("pause")

var blockPara = function() {
    var self = this;

    self.posX= 0;
    self.posY= 0;
    self.width= 40;
    self.height= 100;
    self.speedY= 0;
    self.bgc= "";

    self.coordBL = [self.posX,self.posY+self.height]; // X,Y
    self.coordTR = [self.posX+self.width,self.posY]; // Y
    self.coordTL = [self.posX,self.posY]; // Y
    self.coordBR = [self.posX+self.width,self.posY+self.height]; // X

    self.update = function (block) {
        self.coordBL = [self.posX,self.posY+self.height]; // X,Y
        self.coordTR = [self.posX+self.width,self.posY+self.width]; // Y
        self.coordTL = [self.posX,self.posY]; // Y
        self.coordBR = [self.posX+self.width,self.posY+self.height]; // X
        block.style.top = self.posY + "px"; // Придумать универсальную замену block1 
    }

}

var block1Para = new blockPara();
var block2Para = new blockPara();


function setBlockConfigs(block,conf,x,y,c,w,h){
    block.style.left = (x || conf.posX) + "px";
    block.style.top = (y || conf.posY) + "px";
    block.style.backgroundColor = (c || conf.bgc);
    block.style.width = (w || conf.width) + "px";
    block.style.height = (h || conf.height) + "px";
}   

setBlockConfigs(block1,block1Para,0,0,"red");
setBlockConfigs(block2,block2Para,areaH.width-block2Para.width,0,"blue");

var buttonStart = document.getElementById("button")

function gameStart() {
    // синхрон с внутренней анимацией браузера
    // обычно 60 раз в сек
    buttonStart.style.display="none";
    document.addEventListener('keydown', eventDown, false);
    document.addEventListener('keyup', eventUp, false);
    requestAnimationFrame(tick);
    requestAnimationFrame(tick2);
}

function gameZabil(){
    ballH.speedX = 0;
    ballH.speedY = 0;
    block1Para.speedY = 0;
    block2Para.speedY = 0;
    pause.style.opacity = 1;
    document.addEventListener('keypress', eventUnPause, false);
    document.removeEventListener('keydown', eventDown, false);
    document.removeEventListener('keyup', eventUp, false);
}

function gameContinue(){

    ballH.setPosition(areaH.width/2-ballH.width/2,areaH.height/2-ballH.height/2)
    ballH.speedX = 5 
    ballH.speedY = 5

    pause.style.opacity=0;

    document.removeEventListener('keypress', eventUnPause, false);
    document.addEventListener('keydown', eventDown, false);
    document.addEventListener('keyup', eventUp, false);
}


function tick() { // Решить проблему с ускорением !!!!!

    ballH.posX += ballH.speedX;
    // вылетел ли мяч правее стены?
    if (ballH.posX + ballH.width > areaH.width) {
        ballH.speedX = -ballH.speedX;
        ballH.posX = areaH.width - ballH.width;
        scoreParam.left += 1;
        score.innerHTML = "Левый : " + scoreParam.left + " Правый : " + scoreParam.right;
        gameZabil();
    }

    // вылетел ли мяч левее стены?

    if (ballH.posX < 0 ) { 
        // Решить проблему проницаемости
        ballH.speedX = -ballH.speedX;
        ballH.posX = 0;
        scoreParam.right += 1;
        score.innerHTML = "Левый : " + scoreParam.left + " Правый : " + scoreParam.right
        gameZabil();
    }

    if ( ballH.coordTL[1] < block1Para.coordBR[1] //
         && ballH.coordTL[0] < block1Para.coordBR[0]// 
         && ballH.coordBR[1]  > block1Para.coordTR[1] // 
         && ballH.coordBR[0]  > block1Para.coordTR[0]) {

        ballH.speedX = -ballH.speedX;
        ballH.posX = block1Para.posX+block1Para.width;
        console.log("Red Catched")
    }
    
    if ( ballH.coordTR[1] > block2Para.coordBL[1] // 
        && ballH.coordTR[0] > block2Para.coordBL[0] // 
        && ballH.coordBR[1] < block2Para.coordTL[1] // 
        && ballH.coordBR[0] < block2Para.coordTL[0]) { //

       ballH.speedX = +ballH.speedX;
       ballH.posX = block2Para.posX-block2Para.width;
       console.log("Blue Catched")
   }
    
    ballH.posY += ballH.speedY;
    // вылетел ли мяч ниже пола?
    if (ballH.posY + ballH.height > areaH.height) {
        ballH.speedY = -ballH.speedY;
        ballH.posY = areaH.height - ballH.height;
    }
    // вылетел ли мяч выше потолка?
    if (ballH.posY < 0) {
        ballH.speedY = -ballH.speedY;
        ballH.posY = 0;
    }

    ballH.update();

    requestAnimationFrame(tick);
}

ballH.update();

function tick2() {
    if (block1Para.posY<=0){
        block1Para.posY =0  
    }

    if (block1Para.posY>=areaH.height-block1Para.height){
        block1Para.posY =areaH.height-block1Para.height 
    }

    if (block2Para.posY<=0){
        block2Para.posY =0  
    }

    if (block2Para.posY>=areaH.height-block1Para.height){
        block2Para.posY =areaH.height-block1Para.height 
    }

    block1Para.posY += block1Para.speedY
    block2Para.posY += block2Para.speedY

    block1Para.update(block1);
    block2Para.update(block2);

    requestAnimationFrame(tick2);
}

// ---------------- События -------------------


function eventDown(EO) {
    EO = EO || window.event;
    EO.preventDefault();
    var kCode = EO.keyCode;
    //1-вверх 
    if (kCode === 49) {
        block1Para.speedY = 3.1;
    }
    //2-вниз
    if (kCode === 50) {
        block1Para.speedY = -3.1;
    }
    
    if (kCode === 51) {
        block2Para.speedY = 3.1;
    }
 
    if (kCode === 52) {
        block2Para.speedY = -3.1;
    }

}

function eventUp(EO) {
    EO = EO || window.event;
    EO.preventDefault();
    var kCode = EO.keyCode;
    //1-вверх 
    if (kCode === 49) {
        block1Para.speedY = 0;
    }
    //2-вниз
    if (kCode === 50) {
        block1Para.speedY = 0;
    }

    if (kCode === 51) {
        block2Para.speedY = 0;
    }
    if (kCode === 52) {
        block2Para.speedY = 0;
    }
    ;
}

function eventUnPause(EO){
    EO = EO || window.event;
    EO.preventDefault();
    var kCode = EO.keyCode;
    // клавиша 5 
    if (kCode === 53) {
        gameContinue();
        console.log("5")
    }
}

function getElementPos(elem) {
    var bbox = elem.getBoundingClientRect();
    return {
        left: bbox.left + window.pageXOffset,
        top: bbox.top + window.pageYOffset
    };
}