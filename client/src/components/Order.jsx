import React, { useState } from "react";
import "./css/Order.css"

export default function OrderBar({onOrder, valueOrder}) {
  const [order, setOrder] = useState("name");
  const [tipo, setTipo] = useState("Z-A");

  function handler(arg = tipo){
    setTipo(arg)
    var select = document.getElementById('inputOrder');
    var option = select.options[select.selectedIndex].value;
    setOrder(option);
    onOrder(option, tipo);
  }

  function toggler(e){
    if(e.target.value === "A-Z"){
      handler("Z-A");
    }else{
      handler("A-Z");
    }
    
  }

  function seleccion(e){
    return (
      <option key={e} value={e}>{e}</option>
    )
  }

  return (
    <div>


      


    <div>
      <label>OrderBy</label>
      <select name="inputOrder" id="inputOrder" onChange={()=>handler()}>
      <option value="All">All</option>
        {valueOrder?.map((e)=>{
          return seleccion(e)
        })}
      </select>
      <input type="button"  value={tipo} onClick={(e)=>toggler(e)}/>
    </div>

  </div>
  );
}