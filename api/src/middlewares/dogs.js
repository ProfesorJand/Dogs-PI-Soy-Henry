const { Router } = require('express');
const { Dog, Temperament } = require('../db');
const DogModel = require('../models/Dog');
const TemperamentModel = require('../models/Temperament');
const fetch = require('node-fetch');
require('dotenv').config();

//localhost:3001/dogs

const router = Router();

const ApiBreeds = `https://api.thedogapi.com/v1/breeds?api_key=`+process.env.API_KEY;


router.get('/',async(req,res)=>{
    const name = req.query.name; // declaramos la query name 
    if(!name){ // verificamos si no hay query 
        const razas = await fetch(ApiBreeds).then(r => r.json()) // buscar todas las razas en api
        return res.json(razas) // retornar datos de todas las razas en formato json
    }
    const ApiBreedsName = `https://api.thedogapi.com/v1/breeds/search?q=${encodeURI(name)}&`+process.env.API_KEY; //ruta de api x nombre de la raza
    try {
        const raza = await fetch(ApiBreedsName).then(r => r.json()) // busco raza por nombre
        if(raza.length === 0) { //en caso de no existir dicha raza tirar error
            throw new Error('Raza no encontrada') // mensaje del error
        }
        return res.json(raza) //retornar datos de la raza en formato json -> res.json([...raza,...dogs]) cuando hagamos la conexion a la base de datos
    } catch (err) {
        return res.send({error: err.message})
    }
    
});

router.get('/razas',async(req,res)=>{
    //conectarme a la base de datos y obtener todas las razas
})

router.get('/:idRaza',async (req,res)=>{
    //Obtener el detalle de una raza de perro en particular
    const {idRaza} = req.params;
    
    const razas = await fetch(ApiBreeds).then(r => r.json()) // buscar todas las razas en api

    //Debe traer solo los datos pedidos en la ruta de detalle de raza de perro
    const filtrado = razas.filter((r)=>Number(r.id) === Number(idRaza))
    console.log(filtrado);
    res.json(filtrado)
    
    //Incluir los temperamentos asociados ????? ya la data de arriba me da toda la info de la raza no entiendo la pregunta
    
   
})

//falta arreglar este con el FRONT Y DB
router.post('/',async (req,res)=>{
    //Recibe los datos recolectados desde el formulario controlado de la ruta de creación de raza de perro por body
    //Crea una raza de perro en la base de datos relacionada con sus temperamentos
    const {name, height, weight, years_of_life} = req.body;
    if(!name || !height || !weight){
        return res.status(404).send('Falta enviar datos obligatorios')
    }
    try {
        const raza = await Dog.create({
            name,
            height,
            weight,
            years_of_life,
        })
        // console.log(new Date().toISOString().split('T')[0])
        res.status(201).json(raza.toJSON())
        //faltan asociarles los temperamentos y acomodar con los datos correctos en body
    } catch (error) {
        return res.status(404).send('Error en alguno de los datos provistos')
    }
})



module.exports = router;