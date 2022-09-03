const { Router } = require('express');
const { Dog, Temperament } = require('../db');
const DogModel = require('../models/Dog');
const TemperamentModel = require('../models/Temperament');
const fetch = require('node-fetch');

const router = Router();

//const apiTemperament = `https://api.thedogapi.com/v1/categories?api_key=`+process.env.API_KEY; ?? no me trae nada

const ApiBreeds = `https://api.thedogapi.com/v1/breeds?api_key=`+process.env.API_KEY;

router.get('/',async(req,res)=>{
    //Obtener todos los temperamentos posibles
    //En una primera instancia deberán obtenerlos desde la API externa y guardarlos en su propia base de datos y luego ya utilizarlos desde allí
    const razas = await fetch(ApiBreeds).then(r => r.json())
   
    const temperament = razas.map((r) => {
        if(r.temperament){
            const a = r.temperament.split(", "); 
            return a
        }
    } )

    const results = temperament.filter(Boolean); //remover nulls

    const arrayTemperament = [...new Set(Array.prototype.concat.apply([], results))];
    //console.log(temperament);

    res.send(arrayTemperament)
})

module.exports = router;