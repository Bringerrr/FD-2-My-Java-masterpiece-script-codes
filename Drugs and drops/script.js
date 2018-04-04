var mainBoard = document.getElementById("main-board"),
    boardForPieces = document.getElementById("board-for-pieces"),
    boardClear = document.getElementById("board-clear"),
    picture = document.getElementsByTagName("img"),
    imgSrc = picture[0].src, // адрес первой картинки
    pieces = boardForPieces.getElementsByTagName("div"),
    piecesInPurple = boardClear.getElementsByTagName("div"),
    piecesCountX = 4, piecesCountY = 4 , // Количество кусочков -------------
    posSpriteX = 0, posSpriteY = 0, // Координа для спратов

    str = "", // Переменная для innerHTML

    boardForPiecesPos=getElementPos(boardForPieces), // Получили координаты фиолетового блока

    draggedPiece=null, //Событийная переменная
    index = 1; //Переменная для изменения z-index

// Установка размеров куска картинки -------------
var Image = {
    width : picture[0].width / piecesCountX ,
    height : picture[0].height / piecesCountY 
}

// Создание досок для кусочков и пустой доски -------------
boardForPieces.style.width= Image.width*piecesCountX + "px"
boardForPieces.style.height= Image.height*piecesCountY + "px"

boardClear.style.width= Image.width*piecesCountX+ "px"
boardClear.style.height= Image.height*piecesCountY + "px"

// Создание блоков (кусков мозайки) -------------

for(i=0; i<piecesCountY*piecesCountX;i++){
    str+="<div></div>"
}

boardForPieces.innerHTML = str;

// Назначение стилей блокам -------------

for(i=0; i<(piecesCountY*piecesCountX);i++){
    pieces[i].style.float="left";

    pieces[i].style.width = Image.width + "px";
    pieces[i].style.height = Image.height + "px";

    pieces[i].style.background = " url(' " + imgSrc + " ') ";

    pieces[i].style.outline= "5px solid black";

    pieces[i].id=i; // присваивание айдишника (на всякий случай)
}

// Расстановка координат для спрайтов и самих блоков -------------

for(i=0; i<(piecesCountY*piecesCountX);i++){ 
    pieces[i].style.backgroundPositionX = -posSpriteX + "px";
    pieces[i].style.backgroundPositionY = -posSpriteY + "px";// Выставили позицию для спрайтов

    pieces[i].style.position="absolute" // задали абсолютное позиционирование 
    pieces[i].style.left = boardForPiecesPos.left + posSpriteX + "px";    
    pieces[i].style.top = boardForPiecesPos.top + posSpriteY + "px";  // задали координаты

    if (posSpriteX<Image.width*(piecesCountX-1)) {
        posSpriteX += Image.width;
    }
    else{
        posSpriteX = 0;
        posSpriteY +=Image.height;
    }
}

// События ------------------------------

for(i=0; i<(piecesCountY*piecesCountX);i++){ 
    pieces[i].addEventListener('dragstart',pieceDragStart,false);
    pieces[i].addEventListener('drop',pieceDragEnd,false);
    // pieces[i].addEventListener('dragover',divDragOver,false);
    pieces[i].addEventListener('click',clickIndex,false);
}

boardForPieces.addEventListener('dragover',divDragOver,false);
boardForPieces.addEventListener('drop',divDrop,false);

boardClear.addEventListener('dragover',divDragOver,false);
boardClear.addEventListener('drop',divDrop,false);

function clickIndex(EO){
    EO=EO||window.event;
    index +=1;
    EO.currentTarget.style.zIndex=index;
}

function pieceDragStart(EO) { // Хватаем кусочек
    EO=EO||window.event;
    console.log('starting drag id='+EO.currentTarget.id);
    draggedPiece=EO.currentTarget;
    // найдём положение самого жёлтого квадрата относительно страницы
    var boxPosX=getElementPos(draggedPiece);
    var infoObj=document.getElementById('IInfo');
    // находим координаты клика относительно жёлтого квадрата
    var clickXC=Math.round(EO.pageX-boxPosX.left);
    var clickYC=Math.round(EO.pageY-boxPosX.top);
    console.log({clickXC,clickYC});
}

function pieceDragEnd(EO) { // Сбрасываем кусочек
    // закончилось перетаскивание мячика (неважно куда он уронен)
    EO=EO||window.event;
    console.log('drag finished');
    draggedPiece=null;
}

function divDragOver(EO) { // Позволяем сбросить кусочек в блок
    EO=EO||window.event;
    // по-умолчанию ронять элементы в div запрещено, отменяем:
    EO.preventDefault();
}

function divDrop(EO) {  // Сбрасываем кусочек в блок
    // мячик уронен
    EO=EO||window.event;
    EO.preventDefault();
    if ( draggedPiece ){
        console.log(EO.currentTarget.id);
        EO.currentTarget.appendChild(draggedPiece);
        // var boxPos=getElementPos(draggedPiece);
        var infoObj=document.getElementById('IInfo');
        // найдём координаты клика относительно жёлтого квадрата
        var clickX=Math.round(EO.pageX);
        var clickY=Math.round(EO.pageY);
        infoObj.innerHTML="x="+clickX+" y="+clickY;
        
        draggedPiece.style.position="absolute";
        draggedPiece.style.top=clickY+"px";
        draggedPiece.style.left=clickX+"px";

        index +=1;
        EO.currentTarget.style.zIndex=index;
    }
}

// Функция дял установки координат ------------
function getElementPos(elem) {
    var bbox=elem.getBoundingClientRect();
    return {
        left: bbox.left+window.pageXOffset,
        top: bbox.top+window.pageYOffset
    };
}

