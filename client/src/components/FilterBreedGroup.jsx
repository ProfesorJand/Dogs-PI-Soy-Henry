import React from "react";
import "./css/Filter.css"

export default function Filter({onFilter, razas, valueTemperament}) {

  function handler(){
    var select = document.getElementById('razas');
    var option = select.options[select.selectedIndex].value;
    onFilter(option, true, 1, valueTemperament);
  }

  function seleccion(e){
    return (
      <option key={e} value={e}>{e}</option>
    )
  }
  return (
    <div>
      <label>Breed Group Filter </label>
      <select name="razas" id="razas" onChange={()=>handler()}>
        <option value="All">All</option>
        {razas?.map((e)=>{
          return seleccion(e.name)
        })}
      </select>
    </div>
  );
}