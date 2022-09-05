import React, { useState } from "react";
import "./css/Filter.css"

export default function Filter({onFilter}) {
  const [breed, setBreed] = useState("");
  return (
    <form id="formularioBusqueda" onSubmit={(e) => {
      e.preventDefault();
      onFilter(breed, true);
    }}>
      <input
        className="inputBusqueda"
        type="text"
        placeholder="Name of Breed..."
        value={breed}
        onChange={e => setBreed(e.target.value)}
      />
      <input className="botonFiltrado" type="submit" value="Filter" />
    </form>
  );
}