const request=require('request')

const forecast=(latitude, longitude, callback)=>{
    const url='https://api.openweathermap.org/data/2.5/onecall?lat='+encodeURIComponent(latitude)+'&lon='+encodeURIComponent(longitude)+'&units=metric&appid=ed4d3391093f69992b5bf1e90df5df80'
    request({ url, json:true }, (error, {body}) => {

        if(error){
            callback('Unable to send location request',undefined)
        }
        else if(body.error){
            callback('Unable to find loaction data',undefined)
        }else{
            callback(undefined,{
        
                time:'Timezone: '+body.timezone,
                report:'It is currently '+body.current.temp+' degree with humidity of '+body.current.humidity,
                weather:'Weather: '+body.current.weather[0].description
            })
        }    

    });

}

module.exports=forecast

