import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";


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
                        weight:{imperial:"6 - 13",metric:"3 - 6"},
                        height:{imperial:"9 - 11.5",metric:"23 - 29"},
                        id:"desconocido",
                        name:"Is this a Dog?.",
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
        {
        data.length !== 0 ? 
            <div key={data[0].id} className="Contenedor">
                <img className="ImgDog" src={data[0].image ? data[0].image.url : `https://cdn2.thedogapi.com/images/${data[0].reference_image_id}.jpg`} alt={data[0].reference_image_id}/> 
                <p>name: {data[0].name}</p>
                {/* <p>bred_for: {bred_for ? bred_for : <></>}</p>
                <p>breed_group: {breed_group ? breed_group : <></>}</p> */}
                {/* <p>height_imperial: {height.imperial} - height_metric: {height.metric}</p> */}
                <p>weight_imperial: {data[0].weight.imperial} - weight_metric: {data[0].weight.metric}</p>
                {/* {life_span ? <p>life_span: {life_span} </p> : <></>}
                {origin ? <p>origin: {origin} </p> : <></>} */}
                {/* <p>reference_image_id: {reference_image_id}</p> */}
                {data[0].temperament ? <p>temperament: {data[0].temperament}</p> : <></>}
                {/* <p>country_code: {country_code ? country_code : "unknown"}</p> */}

            </div> : <>Cargando</>

        }
        </>
        // <>
        //     {
        //         !id? <p key={id}>Cargando</p>:
            
        //     <div key={id} className="Contenedor">
        //         <img className="ImgDog" src={image.url} alt={image.id}/> 
        //         <p>name: {name}</p>
        //         {/* <p>bred_for: {bred_for ? bred_for : <></>}</p>
        //         <p>breed_group: {breed_group ? breed_group : <></>}</p> */}
        //         {/* <p>height_imperial: {height.imperial} - height_metric: {height.metric}</p> */}
        //         <p>weight_imperial: {weight.imperial} - weight_metric: {weight.metric}</p>
        //         {/* {life_span ? <p>life_span: {life_span} </p> : <></>}
        //         {origin ? <p>origin: {origin} </p> : <></>} */}
        //         {/* <p>reference_image_id: {reference_image_id}</p> */}
        //         {temperament ? <p>temperament: {temperament}</p> : <></>}
        //         {/* <p>country_code: {country_code ? country_code : "unknown"}</p> */}

        //     </div>
        //     }
        // </>
    )
}