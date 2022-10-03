import React, { useState } from "react";
import {Link} from "react-router-dom"
import "./css/SearchBar.css"

export default function SearchBar() {
  const [dogName, setDogName] = useState("");
  function busqueda(e){
    const arr = e.split(" ");
    for (var i = 0; i < arr.length; i++){
      arr[i] = arr[i].charAt(0).toUpperCase() + arr[i].slice(1);
    }
    const capitalize = arr.join(" ");
    setDogName(capitalize)
  }

  return (
    <form id="formularioBusqueda" onSubmit={(e) => {
      e.preventDefault();
    }}>
      <input
        className="inputBusqueda"
        type="text"
        placeholder="Search Dog By Name..."
        value={dogName}
        onChange={e => busqueda(e.target.value)}
      />
      {dogName && <Link className ="btnBusqueda" to={`/perfil/${dogName}`}>Search</Link>}
    </form>
  );
}