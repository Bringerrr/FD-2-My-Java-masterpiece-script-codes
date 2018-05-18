function Pipe(){

    this.hole = vMin/3; // origin = height/6

    this.top = 0
   
    this.x = width;
    this.w = vMin/5.5;
    this.h = randomDiap(vMin/15,vMin/2);

    this.bottom = (this.h  + this.hole);

    this.hBot = (height - this.bottom);

    this.speed = vMin/250;

    this.highlight = false;

    this.className = "";

    this.hits = function(obj){

        if(obj.y+obj.kostylTop < this.h || obj.y+obj.h-obj.kostylBot > this.bottom){
            if(obj.x+obj.w-obj.kostylFront > this.x && obj.x+obj.kostylBack < this.x +this.w){
                this.highlight = true;
                return true;
            }
        }
        return false;
    }

    this.update = function(){
        this.x -= this.speed;
        }

    this.createDiv = function(className){
        this.className = className;
        var div = document.createElement('div');
        div.className    = className;
        div.style.width  = this.w+"px";
        div.style.height = this.h+"px";
        div.style.position ="absolute"
        div.style.top = this.top + "px";
        div.style.left = this.x + "px"
        div.style.transform="translateZ(0)";
        return div;
    }

    this.createDivBot = function(className){
        var divBot = document.createElement('div');
        divBot.className    = className;
        divBot.style.width  = this.w+"px";
        divBot.style.height = this.hBot+"px";
        divBot.style.position ="absolute"
        divBot.style.top = this.bottom + "px";
        divBot.style.left = this.x + "px"
        divBot.style.transform="translateZ(0)";
        return divBot;
    }
}