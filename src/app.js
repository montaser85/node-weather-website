const path=require('path')
const express = require('express')
const hbs=require('hbs')

const geoCode=require('./utils/geoCode')
const forecast=require('./utils/forecast')



const app= express()

//Define paths for express config
const publicDirectoryPath=path.join(__dirname, '../public')
const viewsDirectory =path.join(__dirname, '../templates/views')
const partialsDirectory=path.join(__dirname, '../templates/partials')

//setup handlebar engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsDirectory)
hbs.registerPartials(partialsDirectory)

//setup static directory to serve
app.use(express.static(publicDirectoryPath))


app.get('', (req, res)=>{
    res.render('index',{
        title: 'Weather App',
        name: 'Monster'
    })
})

app.get('/about', (req, res)=>{
    res.render('about',{
        title: 'About Me',
        name: 'Monster'
    })
})

app.get('/help', (req, res)=>{
    res.render('help',{
        message:'This is the help page.',
        title:'Help Page',
        name:'Monster'
    })

})

app.get('/weather', (req,res)=>{
    if(!req.query.address){
        return res.send({
            error: 'Please provide an address'
        })  
    }
   geoCode(req.query.address, (error, {latitude, longitude, location}={})=>{
       if(error)
       {
           return res.send({error})
       }

       forecast(latitude, longitude, (error, forecastData)=>{
           if(error){
               return res.send({error})
           }

           res.send({
               forecast:forecastData,
               location,
               address: req.query.address
           })
       })
   })
})

app.get('/products', (req, res)=>{
    if (!req.query.search){
        return res.send({
            error: 'You must search an item'
        })
    }

    res.send({
        products:[]
    })
})

app.get('/help/*', (req, res)=>{
    res.render('error',{
        message:'404 Help article not found error'
        
    })
})


app.get(
    '*', (req, res)=>{
    res.render('error',{
        message:'404 page not found error'
        
    })
})

app.listen(3000, ()=>{
    console.log('Server is up on port 3000')
})