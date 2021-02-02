const request = require("request");

function forecast(latitude, longitude , callback){
    const url = 'http://api.weatherstack.com/current?access_key=815c17a11376e9ded418ce72eb7a0d59&query='+(latitude)+','+(longitude)+'&units=m';

    request({url: url, json: true},(err,res) => {
        if(err){
            callback('Unable to respond your request!',undefined);
        }
        else if(res.body.error){
            callback(res.body.error,undefined);
        }
        else{
            const data = res.body;
            callback(undefined,{
                temperature: data.current.temperature,
                description: data.current.weather_descriptions,
                feelsLike: data.current.feelslike
            });
        }
    });
}

module.exports = forecast;