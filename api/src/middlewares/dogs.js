const { Router } = require('express');
const { Dog, Temperament, Op, Bred_For, Breed_Group } = require('../db');
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
    
    if(!name){ 
        const razas = await fetch(ApiBreeds).then(r => r.json()) 
        const razas1 =
        razas.map((r)=>{
            const arreglo = {
                id : r.id,
                name: r.name,
                temperament: r.temperament,
                bred_for: r.bred_for,
                breed_group: r.breed_group,
                life_span: r.life_span,
                reference_image_id: r.reference_image_id,
                height : r.height.metric,
                weight : r.weight.metric,
                image : r.image.url,
            }
            return arreglo
        })
        console.log(razas1[0].id)
        const razasBD = await Dog.findAll({include:[Temperament, Bred_For, Breed_Group]})
        return res.json(razas1.concat(razasBD)) 
    }
    //const ApiBreedsName = `https://api.thedogapi.com/v1/breeds/search?q=${encodeURI(name)}&`+process.env.API_KEY; //ruta de api x nombre de la raza
    const ApiBreedsName = ApiBreeds;
    
    try {
        const raza = await fetch(ApiBreedsName).then(r => r.json()) 
        const seleccion = raza.filter((r)=>r.name.includes(name))
        seleccion.map((r)=>{
            var url = "https://cdn2.thedogapi.com/images/"+r.reference_image_id+".jpg";
            if(!(/\.(jpg|jpeg|png|webp|avif|gif|svg)$/.test(url))){
                url = "https://cdn2.thedogapi.com/images/"+r.reference_image_id+".png"
            }
            r.height = r.height.metric;
            r.weight = r.weight.metric;
            r.image = url;
            return 
        })
        
        const razasNombreBD = await Dog.findAll({where:{name:{[Op.startsWith]: name}}, include: [Temperament, Bred_For, Breed_Group]});

        if(seleccion.length === 0 && razasNombreBD.length === 0) { 
            throw new Error('Raza no encontrada') 
        }
        if(razasNombreBD.length !== 0){
            return res.json(seleccion.concat(razasNombreBD))
        }
        return res.json(seleccion) 
    } catch (err) {
        return res.send({error: err.message})
    }
    
});

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
    const {name, heightMin, heightMax, weightMin, weightMax, life_spanMin, life_spanMax, temperaments, image, bred_for, breed_group} = req.body; // height y weight son objetos
    console.log("breed_group",breed_group)
    if(!name || !heightMin || !heightMax || !weightMin || !weightMax){
        console.log("Faltan datos correctos");
        return res.status(404).send('Falta enviar datos obligatorios')
    }
    try {
        console.log("entro al Try");
        const raza = await Dog.create({
            id:id_Nuevos,
            name,
            life_span: `${life_spanMin} - ${life_spanMax} years`,
            height: `${heightMin} - ${heightMax}`,
            weight: `${weightMin} - ${weightMax}`,
            image,

        })
        console.log(`temperaments: -${temperaments.split(", ")}-`)
        const tempe = await Temperament.findAll({where:{name: {[Op.in]: temperaments.split(", ") } } })
        await raza.addTemperaments(tempe);
        console.log(`temperaments: -${bred_for.split(", ")}-`)
        const bred = await Bred_For.findAll({where:{name: {[Op.in]: bred_for.split(", ") } } });
        await raza.addBred_Fors(bred);
        const breedGroup = await Breed_Group.findAll({where:{name: {[Op.in]:[breed_group]} } });
        console.log("epalEEEEEEEEE ",JSON.stringify(breedGroup, null, 4))
        await raza.addBreed_Groups(breedGroup)
        id_Nuevos++;
        // await raza.addBreed_Group(breedGroup)
        console.log("epalEEEEEEEEE ",JSON.stringify(bred, null, 4))
        // // console.log(new Date().toISOString().split('T')[0])
        // console.log(raza.toJSON())
        res.status(201).json(raza.toJSON())
        //faltan asociarles los temperamentos y acomodar con los datos correctos en body
    } catch (error) {
        console.log("Entro al Catch")
        console.log(error.message);
        return res.status(404).send({error: error.message, mensaje:'Error en alguno de los datos provistos'})
    }
})



module.exports = router;