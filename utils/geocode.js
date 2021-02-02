const request = require('request');

function geoCode(address, callback){
    const url2 = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURIComponent(address)+'.json?access_token=pk.eyJ1IjoiamhhbnZpemFuamUiLCJhIjoiY2trbTYwbHowMWg0OTJxdGRzeXQ5Z2k0YyJ9.l8CCXh8QDY91S1QUyH6v_w&limit=1'; 
    request({url: url2, json : true},(err,res) => {
        if(err){
            callback('Unable to respond to your request!',undefined);
        }
        else if(res.body.features.length === 0){
            callback('Unable to respond to Mapbox Apis.!!',undefined);
        }
        else{
            const data = res.body;
            callback(undefined,{
                latitude: data.features[0].center[1],
                longitude: data.features[0].center[0],
                location: data.features[0].place_name
            });
        }
    });
}

module.exports = geoCode;