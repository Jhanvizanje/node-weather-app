const express = require('express');
const ejs = require('ejs');
const path = require('path');
const hbs = require('hbs');

const app = express();
const hbsPath = path.join(__dirname,'./templates/views');
const hbsPartials = path.join(__dirname,'./templates/partials');

app.use(express.static('public'));
app.set('view engine','hbs');
app.set('views',hbsPath);
hbs.registerPartials(hbsPartials);

const geoCode = require('./utils/geocode');
const forecast = require('./utils/forecast');


app.get('/', (req, res) => {
    res.render('weather',{title:'WEATHER', name:'You can know current weather here!'});
});

app.get('/about', (req, res) => {
    res.render('about',{title:'ABOUT' ,name:'Creator:Jhanvi Zanje',role:'ASE'});
});

app.get('/help', (req, res) => {
    res.render('help', {title:'HELP', name:'Jhanvi zanje'});
});

app.get('/help/*', (req,res) => {
    res.render('error',{errorMsg:'No futher articles for help!!'});
})

app.get('/weather', (req, res) => {
    const address = req.query.address;
    console.log(address);
    if(!address){
        console.log(true);
        return res.send({error: 'You must query an address!!'});
        // res.render('error',{errorMsg: })
    }
    // --------------------------------------------------------------------------------------
    geoCode(address,(err,{latitude, longitude, location} = {}) => {
        
        if(location !== 'undefined'){
            forecast(latitude, longitude, (error, {temperature, description, feelsLike} = {}) => {
                if(error){
                    return res.send({error: 'Please enter a valid desctination name>'});
                }
                res.send({
                    location: location,
                    temperature: temperature,
                    description: description,
                    feelsLike: feelsLike 
                })
                // res.render('weather',{title:'WEATHER',location:location, report:'Temperature here in location '+ location+' is '+temperature+'.Description: '+description+'.'+'It feels like '+feelsLike+' degree celsius.'});
            })
        }
        else{
            return res.send({err});
        }  
    });

    // --------------------------------------------------------------------------------------
    // res.render('weather',{title:'WEATHER',name:req.query.address});
});

app.get('*', (req,res) => {
    res.render('error', {errorMsg: 'My 404 Page.'});
});

app.listen(3000, (err) => {
    console.log('Listing on port 3000');
});