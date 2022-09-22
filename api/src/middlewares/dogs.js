const { Router } = require('express');
const { Dog, Temperament, Op, Height } = require('../db');
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
    
    if(!name){ // verificamos si no hay query 
        const razas = await fetch(ApiBreeds).then(r => r.json()) // buscar todas las razas en api
        razas.map((r)=>{
            r.height = r.height.metric;
            r.weight = r.weight.metric;
            r.image = r.image.url;
            return 
        })
        console.log(razas[0].id)
        const razasBD = await Dog.findAll({include:Temperament})
        return res.json(razas.concat(razasBD)) // retornar datos de todas las razas en formato json
    }
    const ApiBreedsName = `https://api.thedogapi.com/v1/breeds/search?q=${encodeURI(name)}&`+process.env.API_KEY; //ruta de api x nombre de la raza
    try {
        const raza = await fetch(ApiBreedsName).then(r => r.json()) // busco raza por nombre
        raza.map((r)=>{
            r.height = r.height.metric;
            r.weight = r.weight.metric;
            r.image = "https://cdn2.thedogapi.com/images/"+r.reference_image_id+".jpg";
            return 
        })
        const razasNombreBD = await Dog.findAll({where:{name:{[Op.eq]: name}}, include:Temperament});
        console.log("raza : ", JSON.stringify(raza, null, 2))
        console.log("razasNombreBD : ", JSON.stringify(razasNombreBD, null, 2))
        const tempe = razasNombreBD[0]["Temperaments"].map((t)=>t.name)
        razasNombreBD[0]["hola"] = tempe.join(", ");

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
    const {name, heightMin, heightMax, weightMin, weightMax, life_span, temperaments, image} = req.body; // height y weight son objetos
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
            life_span,
            height: `${heightMin} - ${heightMax}`,
            weight: `${weightMin} - ${weightMax}`,
            image,

        })
        console.log(`temperaments: -${temperaments.split(", ")}-`)
        const tempe = await Temperament.findAll({where:{name: {[Op.in]: temperaments.split(", ") } } })
        raza.addTemperaments(tempe)
        console.log("epalEEEEEEEEE ",JSON.stringify(tempe, null, 4))
        // console.log(new Date().toISOString().split('T')[0])
        console.log(raza.toJSON())
        res.status(201).json(raza.toJSON())
        //faltan asociarles los temperamentos y acomodar con los datos correctos en body
    } catch (error) {
        console.log("Entro al Catch")
        console.log(error.message);
        return res.status(404).send({error: error.message, mensaje:'Error en alguno de los datos provistos'})
    }
})



module.exports = router;