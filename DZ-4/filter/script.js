var string = prompt("Введите строку");

function countGlasnye(s) {
  var array = s.split("");

  function ff(v, i, a) {
    var vowels = "ыйуеёаоэяию";
    return vowels.indexOf(v) > -1;
  }

  return array.filter(ff).length;
}

countGlasnye(string);
