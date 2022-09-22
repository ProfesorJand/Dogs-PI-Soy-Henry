import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Dog from "./Dog"
import "./css/Dogs.css"


export default function PerfilDog({props}){
    const [data, setData]= useState([]);
    const {dogName} = useParams();
    useEffect(()=>{
        setData([])
        try{            
            fetch(`http://localhost:3001/dogs?name=${dogName}`)
            .then(r=>{

                return r.json()})
            .then(r=>{
                if(r.error){
                    throw new Error("Nombre del perro no existe")
                }
                return setData([...r])})
                .catch(error=>                    
                    setData([{
                        weight:"3-6",
                        height:"23-29",
                        id:"desconocido",
                        name:"Is this a Dog?",
                        bred_for:"Content Creator",
                        breed_group:"Meme",
                        life_span:"Eternal?",
                        temperament:"Fun-loving, No Bite",
                        origin:"Argentina",
                        reference_image_id:"PerroMeme",
                        image:{id:"PerroMeme",width:1600,height:1199,url:"https://www.liveabout.com/thmb/9oyhVbEg1OHIPqxsUSe9Pif61U8=/640x640/filters:no_upscale():max_bytes(150000):strip_icc()/superdog-treadmill-5af44eb2eb97de003d8c771d.gif"}
                    }]))
        }catch(error){
            console.log("entro al catch")
            
        }
        return ()=>{
            setData([])
        }
    },[dogName]);

    return (
        <>
        
        
        {data.length !== 0 && 
            <div key={data[0].id} className="ContainerDogs">
            <Dog id={data[0].id} bred_for={data[0].bred_for} breed_group={data[0].breed_group} weight={data[0].weight} height={data[0].height} temperament={data[0].temperament} name={data[0].name} image={data[0].image}/>
            </div>
        }
        
        </>

    )
}


// {
//     data.length !== 0 ? 
//         <div key={data[0].id+"3"} className="ContainerDogs">
//             <div className="Contenedor">
//             <img className="ImgDog" src={data[0].image ? data[0].image.url : `https://cdn2.thedogapi.com/images/${data[0].reference_image_id}.jpg`} alt={data[0].reference_image_id}/> 
//             <p>id: {data[0].id}</p>
//             <p>name: {data[0].name}</p>
//             <p>bred_for: {data[0].bred_for ? data[0].bred_for : <></>}</p>
//             <p>breed_group: {data[0].breed_group ? data[0].breed_group : <></>}</p>
//             {/* <p>height_imperial: {height.imperial} - height_metric: {height.metric}</p> */}
//             <p>weight_imperial: {data[0].weight.imperial} - weight_metric: {data[0].weight.metric}</p>
//             {/* {life_span ? <p>life_span: {life_span} </p> : <></>}
//             {origin ? <p>origin: {origin} </p> : <></>} */}
//             {/* <p>reference_image_id: {reference_image_id}</p> */}
//             {data[0].temperament ? <p>temperament: {data[0].temperament}</p> : <></>}
//             {/* <p>country_code: {country_code ? country_code : "unknown"}</p> */}
//             </div>
//         </div> 
//         : 
//         <>
//         <div className='ContainerDogs'>
//             <img src="https://cdn.dribbble.com/users/1782673/screenshots/4683964/ezgif.com-video-to-gif__2_.gif" alt="Cargando"/>
//         </div>
//         </>

//     }