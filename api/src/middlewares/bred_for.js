const { Router } = require('express');
const { Dog, Temperament, Bred_For } = require('../db');
const DogModel = require('../models/Dog');
const TemperamentModel = require('../models/Temperament');
const fetch = require('node-fetch');

const router = Router();

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
        const results = bred.filter(Boolean); 
        let arrayBred = [...new Set(Array.prototype.concat.apply([], results))]; 
        ArrayDataBreds = arrayBred.sort(); 
        const ArrayObjBred = ArrayDataBreds.map((e)=>{
            return { id: y++, name: e}
        })
        const crearBred = await Bred_For.bulkCreate(ArrayObjBred)
        
        if(crearBred){
            return res.json(crearBred)
        } 
        
    } catch (error) {
        res.json(breds)
    }
})

router.post('/', async (req,res)=>{
    try{
        const {name} = req.query;
        if(name){
            await Bred_For.create({id: y++, name:name})
            res.send(`Bred For: ${name} Created`)
        }
    }
    catch(error){
        res.send("error")
    }
})

module.exports = router;