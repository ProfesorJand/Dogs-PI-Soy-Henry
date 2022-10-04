const { Router } = require('express');
const { Dog, Temperament, Breed_Group} = require('../db');
const DogModel = require('../models/Dog');
const TemperamentModel = require('../models/Temperament');
const fetch = require('node-fetch');


const router = Router();

const ApiBreeds = `https://api.thedogapi.com/v1/breeds?api_key=`+process.env.API_KEY;


let h = 0;

router.get('/',async(req,res)=>{
    const breed_groups = await Breed_Group.findAll();
    
    try {
        
        if(breed_groups.length !==0){
            return res.json(breed_groups)
        }
        
        var ArrayDataBreedGroups = [];

        const razas = await fetch(ApiBreeds).then(r => r.json())
        
        const breed_group = razas.map((r) => {
            if(r.breed_group){
                const a = r.breed_group.split(", "); 
                return a
            }
        } )
        
        const results = breed_group.filter(Boolean);
        let arrayBreedGroup = [...new Set(Array.prototype.concat.apply([], results))]; 
        ArrayDataBreedGroups = arrayBreedGroup.sort(); 
        const ArrayObjBreedGroup = ArrayDataBreedGroups.map((e)=>{
            return { id: h++, name: e}
        })
        
        const crearBreedGroup = await Breed_Group.bulkCreate(ArrayObjBreedGroup)
        if(crearBreedGroup){
           
            return res.json(crearBreedGroup)
        } 
        
    } catch (error) {
        res.send(breed_groups)
    }
})

router.post('/', async (req,res)=>{
    try{
        const {name} = req.query;
        if(name){
            await Breed_Group.create({id: h++, name:name})
        }
    }
    catch(error){
        res.send("error")
    }
})

module.exports = router;