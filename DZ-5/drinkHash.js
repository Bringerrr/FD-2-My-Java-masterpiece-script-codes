"use strict";

  var Storage = function(){
    console.log("Сработал прототип");
  };
  
  Storage.prototype.addValue = function(key,alc,recipe){
    var value = [alc,recipe];
    this[key]=value;
  };
  
  Storage.prototype.getValue = function(key){
    console.log(this[key]);
  };

  Storage.prototype.deleteValue = function(key){
    if (key in this){delete this[key]; return true}
    else return false;
  };
  
  Storage.prototype.getKeys = function(){
  console.log(Object.keys(this));
  };

  var drinkStorage = new Storage();
  
  drinkStorage.addValue("Красный грех",true,"Черносмородиновый ликер Creme de Cassis - 40 мл Апельсиновый сок - 10 мл Красное шампанское - 300-400 мл Лед - 5-6 куб. Сахар - 100 г");
  
  drinkStorage.addValue("Мохито",true,"Мята свежая - 4-5 веточек Коричневый тростниковый сахар (или обычный) - 1 ч. л. Белый ром (например, Bacardi) - 50 мл Спрайт (или содовая) - 60 мл Лайм - 0,5 шт Лед - сколько уйдет");
  
  drinkStorage.addValue("Чифир",true,"Чай и кефир");
  
  drinkStorage.getValue("Чифир");
  drinkStorage.deleteValue("Красный грех");
  drinkStorage.getKeys();