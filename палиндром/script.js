"use strict"

var str = "Голод, чем меч долог?";
// var str = "ещещ еще ще щеще";
// var str = "А роза упала на лапу Азора";
// var str = "Ещё и ещё и ещё и ещЁ";

function isPalindrom(n){
  
  var palindrom = "",
      palindromReverse = "",
      letterE ="е",
      punctMarks = [";",":","?",".",",","!"];
  
  for(var i=0; i<=n.length-1;i++){
    if (n[i] == " " || punctMarks.indexOf(n[i]) > -1 || n[i] == "ь"){
      continue;
    }else if(n[i] == "ё"){
    palindrom += letterE.toLowerCase();
    }else{
    palindrom += n[i].toLowerCase();
    }
    }

  for(var y=n.length-1;y>=0; y--){
    if (n[y] == " " || punctMarks.indexOf(n[y]) > -1 || n[y] == "ь"){
      continue;
    }else if(n[y] == "ё"){
    palindromReverse += letterE.toLowerCase();
    }else{
    palindromReverse += n[y].toLowerCase();
    }
    }
  
  return palindrom==palindromReverse
  }
  
    isPalindrom(str);