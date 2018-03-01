"use strict"

var test = [ 5, 7, 
        [ 4, [2], 8, [1,3], 2 ], 
        [ 9, [] ], 
        1, 8
      ];

// var test = [1, [5] ];
      
  function sumArray(n, i=0){
 if (typeof(n)=="number"){
   return +n
 }else if(typeof(n)=="object" && n.length>i){
   return sumArray (n[i])+ sumArray (n, i+1)
 }else{
   return 0;
}
}

sumArray(test);