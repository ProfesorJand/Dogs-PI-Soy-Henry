import React, { useState } from "react";
import "./css/SearchBar.css"

export default function SearchBar({onSearch}) {
  const [city, setCity] = useState("");
  return (
    <form id="formularioBusqueda" onSubmit={(e) => {
      e.preventDefault();
      onSearch(city);
    }}>
      <input
        className="inputBusqueda"
        type="text"
        placeholder="Breed..."
        value={city}
        onChange={e => setCity(e.target.value)}
      />
      <input className="botonAgregar" type="submit" value="Search" />
    </form>
  );
}