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
                console.log(r)
                return r.json()})
            .then(r=>{
                if(r.error){
                    console.log(dogName)
                    throw new Error("Nombre del perro no existe")
                }
                
                return setData([...r])})
                .catch(error=>                    
                    setData([{
                        weight:"3 - 6",
                        height:"23 - 29",
                        id:"desconocido",
                        name:"Is this a Dog?",
                        bred_for:"Fearless",
                        breed_group:"Meme",
                        life_span:"Eternal?",
                        temperament:"Fun-loving, No Bite",
                        reference_image_id:"PerroMeme",
                        image:"https://www.liveabout.com/thmb/9oyhVbEg1OHIPqxsUSe9Pif61U8=/640x640/filters:no_upscale():max_bytes(150000):strip_icc()/superdog-treadmill-5af44eb2eb97de003d8c771d.gif",
                        classN:"fix"
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

        <div className="ContainerDogs">
        {
            data.length > 1 &&
            data?.map((result)=>{
                return (
                    
                        <Dog 
                        key={result.id}
                        perfil={false} 
                        id={result.id} 
                        bred_for={result.bred_for ? result.bred_for : result.Bred_Fors ? result.Bred_Fors.map((t)=>t.name).join(", "): ""} 
                        breed_group={result.breed_group ? result.breed_group : result.Breed_Groups ? result.Breed_Groups.map((t)=>t.name).join(", ") : ""} 
                        weight={result.weight} 
                        height={result.height} 
                        temperament={result.temperament ? result.temperament : result.Temperaments ? result.Temperaments.map((t)=>t.name).join(", "): ""} 
                        name={result.name} 
                        image={result.image} 
                        life_span={result.life_span}/>    
                )
            })   
        }
        {
            data.length === 1 &&
            data?.map((result)=>{
                return (
                    
                        <Dog 
                        key={result.id}
                        perfil={true} 
                        id={result.id} 
                        bred_for={result.bred_for ? result.bred_for : result.Bred_Fors ? result.Bred_Fors.map((t)=>t.name).join(", "): ""} 
                        breed_group={result.breed_group ? result.breed_group : result.Breed_Groups ? result.Breed_Groups.map((t)=>t.name).join(", ") : ""} 
                        weight={result.weight} 
                        height={result.height} 
                        temperament={result.temperament ? result.temperament : result.Temperaments ? result.Temperaments.map((t)=>t.name).join(", "): ""} 
                        name={result.name} 
                        image={result.image} 
                        life_span={result.life_span}
                        classN ={result.classN}/>    
                )
            })   
        }
        </div>
        
        </>

    )
}



