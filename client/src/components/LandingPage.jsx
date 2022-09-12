//[ ] Alguna imagen de fondo representativa al proyecto
//[ ] Botón para ingresar al home (Ruta principal)
import './css/LandingPage.css';
import React from 'react';

export default function LandingPage(){
    return (
        <>
        <div className="cover">
            <div className="LandingA">
                <h1>Henry Dogs</h1>
                <a href="/home">
                    <input className="ButtonHome" type ="button" value="HOME"/>
                </a>
            </div>      
        </div>
        </>
    )
}