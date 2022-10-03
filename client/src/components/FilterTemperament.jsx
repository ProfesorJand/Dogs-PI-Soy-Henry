import React from "react";
import "./css/Filter.css"

export default function FilterTemperamentos({onFilter, temperamentos, breed}) {

  function handler(){
    var select = document.getElementById('temperamentos');
    var option = select.options[select.selectedIndex].value;
    onFilter(breed, true, 1, option);
  }

  function seleccion(e){
    return (
      <option key={e} value={e}>{e}</option>
    )
  }
  return (
    <div>
      <label>Temperament Filter </label>
      <select name="temperamentos" id="temperamentos" onChange={(e)=>handler(e)}>
      <option value="All">All</option>
        {temperamentos?.map((e)=>{
          return seleccion(e.name)
        })}
      </select>
    </div>
  );
}