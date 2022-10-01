const { Router } = require('express');
const { Dog, Temperament, Bred_For } = require('../db');
const DogModel = require('../models/Dog');
const TemperamentModel = require('../models/Temperament');
const fetch = require('node-fetch');

const router = Router();

//const apiTemperament = `https://api.thedogapi.com/v1/categories?api_key=`+process.env.API_KEY; ?? no me trae nada

const ApiBreeds = `https://api.thedogapi.com/v1/breeds?api_key=`+process.env.API_KEY;



let y = 0;

router.get('/',async(req,res)=>{
    const breds = await Bred_For.findAll();
    try {
        
        if(breds.length !== 0){
            return res.json(breds)
        }
        var ArrayDataBreds = [];
        const razas = await fetch(ApiBreeds).then(r => r.json())
        
        const bred = razas.map((r) => {
            if(r.bred_for){
                const a = r.bred_for.split(", "); 
                return a
            }
        } )
        const results = bred.filter(Boolean); //remover nulls
        let arrayBred = [...new Set(Array.prototype.concat.apply([], results))]; // remover duplicados
        ArrayDataBreds = arrayBred.sort(); //almacenarlos en un array
        const ArrayObjBred = ArrayDataBreds.map((e)=>{
            return { id: y++, name: e} // establecerlos con los mismos nombres que estan en el modelo Bred_For
        })
        const crearBred = await Bred_For.bulkCreate(ArrayObjBred)
        
        if(crearBred){
            return res.json(crearBred)
        } 
        // throw new Error("Hubo un error en creacion de algun registro a la base de datos")
        
    } catch (error) {
        res.json(breds)
    }
})

router.post('/', async (req,res)=>{
    try{
        const {name} = req.query;
        if(name){
            await Bred_For.create({id: y++, name:name})
        }
    }
    catch(error){
        res.send("error")
    }
})

module.exports = router;