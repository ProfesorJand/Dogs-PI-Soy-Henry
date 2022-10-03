/* eslint-disable */
import React, { useState } from "react";
import { useEffect } from "react";
import "./css/Order.css"

export default function OrderBar({onOrder, valueOrder}) {
  const [order, setOrder] = useState("name");
  const [tipo, setTipo] = useState("A-Z");

  useEffect(()=>{
    const handler = ()=>{
      var select = document.getElementById('inputOrder');
      var option = select.options[select.selectedIndex].value;
      onOrder(option, tipo);
    }
    handler();
  },[tipo, order])

 

  function funcion1(e){
    setOrder(e.target.value)
  }

  function funcion2(e){
   
    if(e.target.value === "A-Z"){
      e.target.value = "Z-A"
      setTipo(e.target.value)
    }else{
      e.target.value = "A-Z"
      setTipo(e.target.value)
    }
  }

  function seleccion(e){
    return (
      <option key={e} value={e}>{e}</option>
    )
  }

  return (
    <div>
      <label>OrderBy </label>
      <select name="inputOrder" id="inputOrder" onChange={(e)=>funcion1(e)}>
        {valueOrder?.map((e)=>{
          return seleccion(e)
        })}
      </select>
      <input type="button"  value={tipo} onClick={(e)=>funcion2(e)}/>
    </div>

  );
}