var string = prompt("Введите строку");

function countGlasnye(s){

  var array = s.split('');
  var count = 0;

    array.forEach(function isGlasnaya(s){
      var vowels = "ыйуеёаоэяию";
      if(vowels.indexOf(s) > -1){
          count ++;
      }
    });
    return count;
    }

countGlasnye(string);