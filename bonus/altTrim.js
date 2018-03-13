var test = "       Ослик суслик паукан      ";

function trim(s){
  var n = 0;
  var m = 0;
    for (i=0; i<s.length-1; i++){
        if (s[i] == " "){
        n++;
      } else {
        break;
      }
    }
    for (i=s.length-1; i>0; i--){
        if (s[i] == " "){
        m++;
      } else {
        break;
        }
    }
    return s.substr(n,s.length-m-n);  
}

trim(test);