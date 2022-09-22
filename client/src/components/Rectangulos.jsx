import React from "react";
import { useEffect } from "react";
import "./css/Rectangulos.css";


export default function Rectangulos({item, eliminar}){

    const boxColor = ["blueBox","redBox","greenBox"];
    useEffect(()=>{
        console.log(item)
    },[])
    return (
        <>
        <div className={boxColor[Math.floor(Math.random() * boxColor.length)]}> 
            {item}
        </div>
        </>
    )
}