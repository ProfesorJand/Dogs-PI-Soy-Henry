import React from "react";
import Rectangulos from "./Rectangulos";
import "./css/Dog.css"

export default function Dog({id, bred_for, breed_group, height, image, life_span, name, origin, reference_image_id, temperament, weight, country_code, perfil=false, classN}){   
    return (
        <>
            {

                <>
                
            <div key={id} className={`Contenedor ${window.location.href === `http://localhost:3000/perfil/${encodeURI(name)}` && "Perfil"} ${classN?classN:""}` } onClick={
                () => {
                    if (window.location.href !== `http://localhost:3000/perfil/${name}` && window.location.href !== `http://localhost:3000/createdog`){
                        return window.location.href=`/perfil/${name}`
                    }
                    }} > 
            
                <img className="ImgDog" src={image} alt={"Img"+name}/>
                <div className="ContenedorFondo"></div>
                
                <div className="ContenedorTexto"> 
                
                <h2>{name}</h2>
                {perfil && life_span && <h3>Life Span {life_span}</h3>}

                <div className="ContenedorMinTexto">
                {(weight.split(" - ")[0] || height.split(" - ")[0]) &&  
                    <table className="tablaPesoAltura">
                <thead>
                <tr>
                    <th rowSpan="2"></th>
                    <th colSpan="2">Weight</th>
                    {perfil && <th colSpan="2">Height</th>}
                </tr>
                
                <tr>
                    <td colSpan="1">min</td>
                    <td colSpan="1">max</td>
                    {perfil && <td colSpan="1">min</td>}
                    {perfil && <td colSpan="1">max</td>}
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td>Imperial</td>
                    {weight.split(" - ")[0] && 
                    <>
                    <td>{Math.round(Number(weight.split(" - ")[0]) * 0.39)}</td>
                    <td>{Math.round(weight.split(" - ")[1] ? Number(weight.split(" - ")[1]) * 0.39 : Number(weight.split(" - ")[0]) * 0.39)} </td>
                    </>
                    }
                    {perfil && height.split(" - ")[0] && 
                    <><td>{Math.round(height.split(" - ")[0] * 0.39)}</td>
                    <td>{Math.round(height.split(" - ")[1] ? height.split(" - ")[1] * 0.39 : height.split(" - ")[0] * 0.39)}</td>
                    </>
                    }
                </tr>
                <tr>
                    <td>Metrics</td>
                    {weight.split(" - ")[0] && 
                    <><td>{Math.round(weight.split(" - ")[0])}</td>
                    <td>{Math.round(weight.split(" - ")[1] ? weight.split(" - ")[1]: weight.split(" - ")[0])}</td>
                    </>
                    }
                    {perfil && height.split(" - ")[0] && 
                    <><td>{Math.round(height.split(" - ")[0])}</td>
                    <td>{Math.round(height.split(" - ")[1] ? height.split(" - ")[1]: height.split(" - ")[0])}</td>
                    </>
                    }
                </tr>
                </tbody>
                </table>}
                {perfil && bred_for &&
                <>
                <div className="temperamentDiv">
                <h3>Bred for</h3>
                    <div className="breedGroup">
                    {bred_for.split(", ").map((t)=>{
                        return (
                            <Rectangulos item={t} key={"bred_for"+t}/>
                        )                    
                    })}
                    </div>
                </div>
                </>
                
               }
                {perfil && breed_group &&
                <>
                <div className="temperamentDiv">
                <h3>Breed group</h3>
                    <div className="breedGroup">
                    {breed_group.split(", ").map((t)=>{
                        return (
                            <Rectangulos item={t}  key={"breed_group"+t}/>
                        )                    
                    })}
                    </div>
                </div>
                </>
                }
                </div>
                {temperament ? 
                
                <>
                <div className="temperamentDiv">
                <h3>Temperaments</h3>
                    <div className="temperamentList">
                    {temperament.split(", ").map((t)=>{
                        return (
                            <Rectangulos item={t}  key={"temperament"+t}/>
                        )                    
                    })}
                    </div>
                </div>
                
                </>

                    : <></>}

                </div>
            </div>
            
            </>
            }

        </>
    )
}
