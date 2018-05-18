function Score (){
    this.x = 0;
    this.y = 0;

    this.w = document.documentElement.clientWidth/6;
    this.h = document.documentElement.clientHeight/6;

    this.tick = 0;
    this.total = 0;

    this.update = function(){
        this.total += this.tick;

    }
    this.createDiv = function(className){
        var div = document.createElement('div');
        div.className      = className;
        div.style.width  = this.w+"px";
        div.style.height = this.h+"px";
        div.style.position ="absolute";
        div.style.top = this.y + "px";
        div.style.left = this.x + "px";
        return div
    }
}