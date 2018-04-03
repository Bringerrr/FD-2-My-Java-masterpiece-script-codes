var mainBoard = document.getElementById("main-board");
var boardForPieces = document.getElementById("board-for-pieces");
var boardClear = document.getElementById("board-clear");
var picture = document.getElementsByTagName("img");
var imgSrc = picture[0].src;

var pieces = boardForPieces.getElementsByTagName("div");

var piecesInPurple = boardClear.getElementsByTagName("div");



var piecesCountX = 4, // Количество кусочков -------------
    piecesCountY = 4


var posSpriteX = 0;
var posSpriteY = 0;


// Установка параметров для куска картинки -------------
var Image = {
    width : picture[0].width / piecesCountX ,
    height : picture[0].height / piecesCountY 
}

console.log(Image);


// Создание досок для кусочков и пустой доски -------------
boardForPieces.style.width= Image.width*piecesCountX + "px"
boardForPieces.style.height= Image.height*piecesCountY + "px"

boardClear.style.width= Image.width*piecesCountX + "px"
boardClear.style.height= Image.height*piecesCountY + "px"




// Создание блоков (кусков мозайки) -------------

var str = "";

for(i=0; i<piecesCountY*piecesCountX;i++){
    str+="<div></div>"
}

boardForPieces.innerHTML = str;

// Присваивание стилей блокам -------------




for(i=0; i<(piecesCountY*piecesCountX);i++){
    pieces[i].style.float="left";

    pieces[i].style.width = Image.width + "px";
    pieces[i].style.height = Image.height + "px";

    pieces[i].style.background = " url(' " + imgSrc + " ') ";

    pieces[i].style.outline= "5px solid black";

    pieces[i].id=i; // присваиваие айдишника

}

// Расстановка координат для спрайтов и самих блоков -------------

var boardForPiecesPos=getElementPos(boardForPieces);
// Получили координаты блока для кусочков с помощью функции getElementPos()


for(i=0; i<(piecesCountY*piecesCountX);i++){ 
    pieces[i].style.backgroundPositionX = -posSpriteX + "px";
    pieces[i].style.backgroundPositionY = -posSpriteY + "px";
    // Выставили позицию для спрайтов

    pieces[i].style.position="absolute"
    pieces[i].style.left = boardForPiecesPos.left + posSpriteX + "px";
    pieces[i].style.top = boardForPiecesPos.top + posSpriteY + "px";
    // задали абсолютное позиционирование 
    // задали абсолютное позиционирование 

    if (posSpriteX<Image.width*(piecesCountX-1)) {
        posSpriteX += Image.width;
    }
    else{
        posSpriteX = 0;
        posSpriteY +=Image.height;
    }
}

// События ----------------

for(i=0; i<(piecesCountY*piecesCountX);i++){ 
    pieces[i].addEventListener('dragstart',pieceDragStart,false);
    pieces[i].addEventListener('drop',pieceDragEnd,false);
    pieces[i].addEventListener('click',boxClicked,false); // Test
    // pieces[i].addEventListener('dragover',divDragOver,false);

}

boardForPieces.addEventListener('dragover',divDragOver,false);
boardForPieces.addEventListener('drop',divDrop,false);
boardClear.addEventListener('dragover',divDragOver,false);
boardClear.addEventListener('drop',divDrop,false);

var draggedPiece=null;

function pieceDragStart(EO) {
    EO=EO||window.event;
    console.log('starting drag id='+EO.currentTarget.id);
    draggedPiece=EO.currentTarget;
    draggedPiece.style.zIndex="39";

            //Test

    // найдём положение самого жёлтого квадрата относительно страницы
    var boxPos=getElementPos(draggedPiece);
    // console.log(EO.currentTarget)
    var infoObj=document.getElementById('IInfo');
    // найдём координаты клика относительно жёлтого квадрата
    var clickX=Math.round(EO.pageX-boxPos.left);
    var clickY=Math.round(EO.pageY-boxPos.top);
    infoObj.innerHTML="x="+clickX+" y="+clickY;
    return clickX
}

function pieceDragEnd(EO) {
    // закончилось перетаскивание мячика (неважно куда он уронен)
    EO=EO||window.event;
    console.log('drag finished');
    console.log(piecesInPurple)
    
    draggedPiece=null;
}

function divDragOver(EO) {
    EO=EO||window.event;
    // по-умолчанию ронять элементы в div запрещено, отменяем:
    EO.preventDefault();
}

function divDrop(EO) {
    // мячик уронен
    EO=EO||window.event;
    EO.preventDefault();
    if ( draggedPiece ){
        // if (EO.currentTarget.id==15){
        //     console.log("u got it!")
        // }
        console.log(EO.currentTarget.id)
        EO.currentTarget.appendChild(draggedPiece);

        console.log(EO.currentTarget);
        var boxPos=getElementPos(boardClear);

        
        var infoObj=document.getElementById('IInfo');
        // найдём координаты клика относительно жёлтого квадрата
        var clickX=Math.round(EO.pageX);
        var clickY=Math.round(EO.pageY);
        infoObj.innerHTML="x="+clickX+" y="+clickY;
        // console.log(getElementPos)
        draggedPiece.style.position="absolute";
        draggedPiece.style.top=clickY+"px";
        draggedPiece.style.left=clickX+"px";
    }
}

function boxClicked(EO) {
    EO=EO||window.event;
    // найдём положение самого жёлтого квадрата относительно страницы
    var boxPos=getElementPos(EO.currentTarget);
    // console.log(EO.currentTarget)
    var infoObj=document.getElementById('IInfo');
    // найдём координаты клика относительно жёлтого квадрата
    var clickX=Math.round(EO.pageX-boxPos.left);
    var clickY=Math.round(EO.pageY-boxPos.top);
    infoObj.innerHTML="x="+clickX+" y="+clickY;
}

function getElementPos(elem) {
    var bbox=elem.getBoundingClientRect();
    return {
        left: bbox.left+window.pageXOffset,
        top: bbox.top+window.pageYOffset
    };
}

