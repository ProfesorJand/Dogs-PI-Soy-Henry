import React, { useState } from "react";
import {Link} from "react-router-dom"
import "./css/SearchBar.css"

export default function SearchBar({onSearch}) {
  const [dogName, setDogName] = useState("");
  function busqueda(){
    
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
        onChange={e => setDogName(e.target.value)}
      />
      {dogName && <Link className ="btnBusqueda" to={`/perfil/${dogName}`}>Search</Link>}
    </form>
  );
}