import React, { useState } from "react";
import "./css/Order.css"

export default function OrderBar({onOrder}) {
  const [order, setOrder] = useState("");
  const [tipo, setTipo] = useState("A-Z");

  function toggleHandler(e){
    if(tipo === "A-Z"){
        return setTipo("Z-A")
    }
    return setTipo("A-Z")
  }
  return (
    <form id="formularioBusqueda" onSubmit={(e) => {
      e.preventDefault();
      onOrder(order, tipo);
    }}>
      <input
        className="inputBusqueda"
        type="text"
        placeholder="Order By..."
        value={order}
        onChange={e => setOrder(e.target.value)}
      />
      <input className="botonFiltrado" type="submit" value="Order" />
      <input type="submit"  value={tipo} onClick={(e)=>toggleHandler(e)}/>
    </form>
  );
}