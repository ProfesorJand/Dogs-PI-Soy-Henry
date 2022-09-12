const { Router } = require('express');
const { Dog, Temperament, Op } = require('../db');
const DogModel = require('../models/Dog');
const TemperamentModel = require('../models/Temperament');
const fetch = require('node-fetch');




require('dotenv').config();

//localhost:3001/dogs

const router = Router();

const ApiBreeds = `https://api.thedogapi.com/v1/breeds?api_key=`+process.env.API_KEY;

let id_Nuevos = 300;

var perros = [] 


router.get('/',async(req,res)=>{ // localhost:3001/dogs
    
    const name = req.query.name; // declaramos la query name 
    console.log("name :", name)
    const razasBD = await Dog.findAll()
    if(!name){ // verificamos si no hay query 
        const razas = await fetch(ApiBreeds).then(r => r.json()) // buscar todas las razas en api
        
        return res.json(razas.concat(razasBD)) // retornar datos de todas las razas en formato json
    }
    const ApiBreedsName = `https://api.thedogapi.com/v1/breeds/search?q=${encodeURI(name)}&`+process.env.API_KEY; //ruta de api x nombre de la raza
    try {
        const raza = await fetch(ApiBreedsName).then(r => r.json()) // busco raza por nombre
        const razasNombreBD = await Dog.findAll({where:{name:{[Op.eq]: name}}})
        console.log("raza : ", raza)
        console.log("razasNombreBD : ", razasNombreBD)
        if(raza.length === 0 && razasNombreBD.length === 0) { //en caso de no existir dicha raza tirar error
            throw new Error('Raza no encontrada') // mensaje del error
        }
        if(razasNombreBD.length !== 0){
            return res.json(razasNombreBD)
        }
        return res.json(raza) //retornar datos de la raza en formato json -> res.json([...raza,...dogs]) cuando hagamos la conexion a la base de datos
    } catch (err) {
        return res.send({error: err.message})
    }
    
});

router.get('/razas',async(req,res)=>{
    //conectarme a la base de datos y obtener todas las razas

    const razas = await fetch(ApiBreeds).then(r => r.json())
    const breedGruop = razas.map((p)=>{ return p.breed_group})
    const unicos = [...new Set(breedGruop)].filter(Boolean)
    res.send(unicos)
})

router.get('/:idRaza',async (req,res)=>{
    //Obtener el detalle de una raza de perro en particular
    const {idRaza} = req.params;
    const razas = await fetch(ApiBreeds).then(r => r.json()) // buscar todas las razas en api

    //Debe traer solo los datos pedidos en la ruta de detalle de raza de perro
    try {   
        const filtrado = razas.filter((r)=>Number(r.id) === Number(idRaza));
        if(filtrado.length === 0){
            throw new Error("La ID proporcionada no existe")
        }
        res.json(filtrado)
        
    } catch (error) {
        res.json([{weight:{imperial:"6 - 13",metric:"3 - 6"},
        height:{imperial:"9 - 11.5",metric:"23 - 29"},
        id:"desconocido",
        name:"Is this a Dog?",
        bred_for:"Content Creator",
        breed_group:"Meme",
        life_span:"Eternal?",
        temperament:"Fun-loving, No Bite",
        origin:"Argentina",
        reference_image_id:"PerroMeme",
        image:{id:"PerroMeme",width:1600,height:1199,url:"https://www.liveabout.com/thmb/9oyhVbEg1OHIPqxsUSe9Pif61U8=/640x640/filters:no_upscale():max_bytes(150000):strip_icc()/superdog-treadmill-5af44eb2eb97de003d8c771d.gif"}}])
    }
    //Incluir los temperamentos asociados ????? ya la data de arriba me da toda la info de la raza no entiendo la pregunta
    
   
})

//falta arreglar este con el FRONT Y DB
router.post('/',async (req,res)=>{
    //Recibe los datos recolectados desde el formulario controlado de la ruta de creación de raza de perro por body
    //Crea una raza de perro en la base de datos relacionada con sus temperamentos
    console.log(req.body)
    const {name, heightMin, heightMax, weightMin, weightMax, life_span} = req.body; // height y weight son objetos
    console.log("years_of_life: ", life_span);
    if(!name || !heightMin || !heightMax || !weightMin || !weightMax){
        console.log("Faltan datos correctos");
        return res.status(404).send('Falta enviar datos obligatorios')
    }
    try {
        console.log("entro al Try");
        const raza = await Dog.create({
            id:id_Nuevos++,
            name,
            height: `imperial: ${heightMin * 0,39} - ${heightMax * 0,39}, metric: ${heightMin} - ${heightMax}`,
            weight: `imperial: ${weightMin * 0,39} - ${weightMax * 0,39}, metric: ${weightMin} - ${weightMax}`,
            life_span,
        })
        // console.log(new Date().toISOString().split('T')[0])
        console.log(raza.toJSON())
        res.status(201).json(raza.toJSON())
        //faltan asociarles los temperamentos y acomodar con los datos correctos en body
    } catch (error) {
        console.log("entro al Catch");
        return res.status(404).send({error: error.message, mensaje:'Error en alguno de los datos provistos'})
    }
})



module.exports = router;