function Field (){
    this.w =  document.documentElement.clientWidth;
    this.h = document.documentElement.clientHeight;

    this.vMin = function(){
        if (this.w > this.h){
            return this.h 
        }
        return this.w
    }
    
    this.update = function (obj){
        obj.style.width = this.w + "px";
        obj.style.height = this.h + "px";
    }

}