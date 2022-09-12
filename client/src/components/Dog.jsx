import React from "react";
import "./css/Dog.css"

export default function Dog({id, bred_for, breed_group, height, image, life_span, name, origin, reference_image_id, temperament, weight, country_code}){

    return (
        <>
            {
                !id? <p key={id}>Cargandoaaaaaaaa</p>:
            
            <div key={id} className="Contenedor">
                <img className="ImgDog" src={image.url} alt={image.id}/> 
                <p>name: {name}</p>
                <p>bred_for: {bred_for ? bred_for : <></>}</p>
                <p>breed_group: {breed_group ? breed_group : <></>}</p>
                {/* <p>height_imperial: {height.imperial} - height_metric: {height.metric}</p> */}
                <p>weight_imperial: {weight.imperial} - weight_metric: {weight.metric}</p>
                {/* {life_span ? <p>life_span: {life_span} </p> : <></>}
                {origin ? <p>origin: {origin} </p> : <></>} */}
                {/* <p>reference_image_id: {reference_image_id}</p> */}
                {temperament ? <p>temperament: {temperament}</p> : <></>}
                {/* <p>country_code: {country_code ? country_code : "unknown"}</p> */}

            </div>
            }
        </>
    )
}
//height={image.height} width={image.width}