function Bg (){

    this.w =  document.documentElement.clientWidth;
    this.h = document.documentElement.clientHeight;

    this.x = this.w
    this.speed = vMin/280 ;

    this.bgImg = "bg1.jpg" 

    this.setPositionX = function(n){
         this.x = n 
    }

    this.update = function(){
        this.x -= this.speed 
    }

    this.createImg = function(className){
        var img = new Image();
        img.className = className;
        img.height = this.h
        img.src = this.bgImg
        img.style.position = "absolute"
        img.style.zIndex = "-1"
        img.style.transform = "translateZ(0)"
        return img;
    }
}