import React, {useState} from "react";


export default function CreateDog(){
    const [name, setName] = useState("");
    const [breed_for, setBreed_for] = useState();
    const [breed_group, setBreed_group] = useState();
    const [height, setHeight] = useState();
    const [weight, setWeight] = useState();
    const [life_span, setTife_span] = useState();
    const [temperament, setTemperament] = useState();
    const [country_code, setCountryCode] = useState();
    return (
        <>
        <form>
            <label for="nombre">Nombre: </label>
            <input type="text" id="nombre"/><br/>
            <label for="apellido">Apellido: </label>
            <input type="text" id="apellido"/><br/>
            <label for="email">email: </label>
            <input type="text" id="email"/><br/>
            <input type="radio" name="sexo" value="Varón"/> Varón<br/>
            <input type="radio" name="sexo" value="Mujer"/> Mujer<br/>
            <input type="submit" value="Enviar"/>
            <input type="reset"></input>
        </form>
        
        </>
  )   
}

