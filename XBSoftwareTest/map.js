function Map(){
    this.data = [
        {city:"Nashville, TN", latitude:36.17, longitudes:-86.78},
        {city:"New York, NY", latitude:40.71, longitudes:-74.00},
        {city:"Atlanta, GA", latitude:33.75, longitudes:-84.39},
        {city:"Denver, CO", latitude:39.74, longitudes:-104.98},
        {city:"Seattle, WA", latitude:47.61, longitudes:-122.33},
        {city:"Los Angeles, CA", latitude:34.05, longitudes:-118.24},
        {city:"Memphis, TN", latitude:35.15, longitudes:-90.05}
    ]

    this.getAbbreviations = () =>{
        var exist=[]
        this.data.forEach( (e,i) => {
            if(!exist.includes(e.city.slice(-2)))
            exist.push(e.city.slice(-2))
        })
        var str = exist.join(' ');
        return str

    }

    this.getNearestCity = (x,y) =>{
        var nstCoord = null;
        var nstArr = null;

        this.data.forEach( (e,i) => {
            var diffX = Math.abs(x-e.latitude)
            var diffY = Math.abs(y-e.longitudes)

            if(nstCoord == null){
                nstCoord = diffX + diffY
                nstArr = e
            }

            if(nstCoord > ( diffX + diffY ) ){
                nstCoord = diffX + diffY
                nstArr = e
            }
        })

        return nstArr.city
    }

    this.getTheMost = (a) =>{
        var int = null;
        var obj = {}

        switch (a) {
            case "northernmost":
                this.data.forEach( (e,i) => {
                    if (int == null)
                        int = e.latitude

                    if(int > e.latitude){
                        int = e.latitude;
                        obj = e;
                    }
                })
                return obj.city
                break;

            case "easternmost":
                this.data.forEach( (e,i) => {
                    if (int == null)
                        int = e.longitudes

                    if (int < e.longitudes){
                        int = e.longitudes;
                        obj = e;
                    }
                })
                return obj.city
                break;

            case "southernmost":
                this.data.forEach( (e,i) => {
                    if (int == null)
                        int = e.latitude

                    if(int < e.latitude){
                        int = e.latitude;
                        obj = e;
                    }
                })
                return obj.city
                break;
          
            case "westernmost":
                this.data.forEach( (e,i) => {
                    if (int == null)
                        int = e.longitudes

                    if (int > e.longitudes){
                        int = e.longitudes;
                        obj = e;
                    }
                })
                return obj.city
                break;

            default:
              return ('Неизвестное значение: ' + a)
          }

    }
}
