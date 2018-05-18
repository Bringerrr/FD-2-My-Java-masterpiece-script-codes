function UI(){

    this.speed = 0; // 60 кадров 2 секунды анимации

    this.currentObj;
    this.currentPos = 130
    this.goal = 0;

    this.currentPosMax = -230
    this.currentPosMin = 130

    this.setCurrentObj = function(obj){
        this.currentObj = obj;
    }

    this.goTo= function (goal,speed){
        this.goal = goal;
        this.speed = speed;
    }

    this.update = function(){
        if(this.currentPos>=this.currentPosMax || this.currentPos<=this.currentPosMin){
            if(this.goal >= this.currentPos){
                this.currentPos += this.speed
                if(this.currentObj!==undefined){
                    this.currentObj.style.transform ="translateZ(0) translateX(" + this.currentPos + "%) translateY(-50%)"
                }
            }
            if(this.goal <= this.currentPos){
                this.currentPos -= this.speed
                if(this.currentObj!==undefined){
                    this.currentObj.style.transform ="translateZ(0) translateX(" + this.currentPos + "%) translateY(-50%)"
                }
            }
        }
    }

    // this.move = function(func,butt,eventFunc){
    //     if(this.currentPos<=-50){
    //        butt.addEventListener("click",eventFunc,false);
    //     }
    //     else {
    //         RAF(func)
    //     }
    // }

}
