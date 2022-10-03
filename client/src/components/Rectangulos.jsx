import React from "react";
import "./css/Rectangulos.css";


export default function Rectangulos({item, eliminar}){

    const boxColor = ["blueBox","redBox","greenBox"];

    return (
        <>
        <div className={boxColor[Math.floor(Math.random() * boxColor.length)]}> 
            {item}
        </div>
        </>
    )
}