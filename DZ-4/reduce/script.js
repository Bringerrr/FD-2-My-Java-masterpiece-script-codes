var string = prompt("Введите строку");

function countGlasnaya(s){
    var array = s.split(""),
        vowels = "ыйуеёаоэяию";
    
      return array.reduce(function f(count, elem) {
        if(vowels.indexOf(elem) > -1){
          return count + 1;
        }  
          return count;
        },0);
    }
  
countGlasnaya(string);
  