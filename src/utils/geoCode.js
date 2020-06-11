const request=require('request')

const geoCode=(address,callback)=>{
    const mapUrl='https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURIComponent(address)+'.json?access_token=pk.eyJ1IjoibW9udGFzZXJoYW1pZCIsImEiOiJja2FoczYydWEwMzZxMnNwZjNpcHJhankyIn0.L2sFozGT7vQBd2MNwx45KQ&limit=1'
    request({ url: mapUrl, json:true }, (error, {body}) => {

        if(error){
            callback('Unable to send location request',undefined)
        }
        else if(body.features.length===0){
            callback('Unable to find loaction data, Try another search',undefined)
        }
        else{
            callback(undefined,{
                latitude:body.features[0].center[1],
                longitude:body.features[0].center[0],
                place:body.features[0].place_name
            })
           
            
        }
    })
}


module.exports=geoCode