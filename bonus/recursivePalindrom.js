"use strict";

var str = "А роза упала на лапу Азора";

function isPalindrom(n){
  var pali = "",
      rpali = "",
      letterE ="е",
      punctMarks = [";",":","?",".",",","!"];
  
  function getPali(n,i=n.length-1){
    if (n[i] == " " || punctMarks.indexOf(n[i]) > -1 || n[i] == "ь") {
      return getPali(n,i-1);
    } else if (n[i] == "ё"){
      pali += letterE.toLowerCase(); return getPali(n,i-1);
    } else if (i>0){pali += n[i].toLowerCase(); return getPali(n,i-1);
    } else if (i===0){pali += n[i].toLowerCase(); return getPali(n,i-1);
    } else return pali == getReservedPali(n);
  
    function getReservedPali(n,m=0){
        if (n[m] == " " || punctMarks.indexOf(n[m]) > -1 || n[m] == "ь") {
          return getReservedPali(n,m+1);
        } else if (n[m] == "ё"){rpali += letterE.toLowerCase(); return getReservedPali(n,m+1);
        } else if (m<n.length-1){rpali += n[m].toLowerCase(); return getReservedPali(n,m+1);
        } else if (m==n.length-1){rpali += n[m]; return rpali;
        } else return rpali;
    }
  }
  return getPali(str);
}

isPalindrom(str);