import React, {useState} from "react";
import { useEffect } from "react";
import Rectangulos from "./Rectangulos";



export default function CreateDog(){

    const [temperamentos, setTemperamentos] = useState();
    const [array, setArray]= useState([])
    const [data, setData] = useState({
      name: "",
      bred_for: "",
      breed_group: "",
      life_span: "",
      temperaments: "",
      heightMin: "",
      heightMax: "",
      weightMin: "",
      weightMax: "",
      image: "",
    });

    useEffect(()=>{
      fetch('http://localhost:3001/temperaments').then(r=> r.json()).then(r=>setTemperamentos(r)).then(()=>console.log(temperamentos))
    },[]);
   
    function handler(e){
      setData((data)=>({...data, [e.target.name] : e.target.value }))
    }

    function handlerTemperaments(e){
      
      console.log(e.target.value)
      if (!array.includes(e.target.value)){
        setArray((r)=>[...r, e.target.value])
        return setData((data)=>({...data, [e.target.name] : array.join(", ")}))

      }
      
    }

    function elimarTemperamento(t){
      setArray((valores)=>{
        return valores.filter((tempe)=>{
          return tempe !== t
        })
      })
      return setData((data)=>({...data, temperaments : array.join(", ")}))
    }
    
    async function mandarInfo(){
      console.log(JSON.stringify(data));
      fetch("http://localhost:3001/temperaments")
      .then(()=>
        fetch("http://localhost:3001/dogs",{
          method: "POST",
          body: JSON.stringify(data),
          headers:{
            'Content-Type': 'application/json'
          }
        })
        .then(r=> {
          console.log(data);
        })
      )  
    }
    
    return (
        <>
        <form action="http://localhost:3001/dogs" method="post" onSubmit={(e)=>{
            e.preventDefault();
            alert("Breed Created Succesfully")
            
        }}>
            <label for="name">Name: </label>
            <input type="text" name="name" id="name" pattern="^[A-Z]+[a-z]{1,25}" title="Primera letra Mayusculas; demas letras minusculas; Maximo de Caracteres (25); No se aceptan numeros; No se aceptan caracteres especiales" onChange={(e)=>handler(e)} required autofocus/><br/>
            {/* cambiar Bred for para seleccionar Bred for */}
            <label for="bred_for" >Bred For: </label>
            <input type="text" name="bred_for" id="bred_for" pattern="^[A-Z]+[a-z]{1,25}" title="Primera letra Mayusculas; demas letras minusculas; Maximo de Caracteres (25); No se aceptan numeros; No se aceptan caracteres especiales" onChange={(e)=>handler(e)} required/><br/>
            <label for="breed_group">Breed Group: </label>
            <input type="text" name="breed_group" id="breed_group" pattern="^[A-Z]+[a-z]{1,25}" title="Primera letra Mayusculas; demas letras minusculas; Maximo de Caracteres (25); No se aceptan numeros; No se aceptan caracteres especiales" onChange={(e)=>handler(e)} required/><br/>
            <label for="height" >Height minimun: </label>
            <input type="text" name="heightMin" pattern="^[1-9]{0,5}[0-9]{0,1}[^.][,][0-9]{2,2}" title="Debe contener 2 decimales (0,22), No debe tener puntos (.); El decimal debe ser una coma (,); Si tiene mas de 2 digitos el primero no debe ser un cero (0)" width="10" onChange={(e)=>handler(e)} required/>
            <label for="height" >Height maximun: </label>
            <input type="text" name="heightMax" pattern="^[1-9]{0,5}[0-9]{0,1}[^.][,][0-9]{2,2}" title="Debe contener 2 decimales (0,22), No debe tener puntos (.); El decimal debe ser una coma (,); Si tiene mas de 2 digitos el primero no debe ser un cero (0)" width="10" onChange={(e)=>handler(e)} required/><br/>
            <label for="weight">Weight minimun: </label>
            <input type="text" name="weightMin" pattern="^[1-9]{0,5}[0-9]{0,1}[^.][,][0-9]{2,2}" title="Debe contener 2 decimales (0,22), No debe tener puntos (.); El decimal debe ser una coma (,); Si tiene mas de 2 digitos el primero no debe ser un cero (0)" onChange={(e)=>handler(e)} required/>
            <label for="weight">Weight maximun: </label>
            <input type="text" name="weightMax" pattern="^[1-9]{0,5}[0-9]{0,1}[^.][,][0-9]{2,2}" title="Debe contener 2 decimales (0,22), No debe tener puntos (.); El decimal debe ser una coma (,); Si tiene mas de 2 digitos el primero no debe ser un cero (0)" onChange={(e)=>handler(e)} required/><br/>
            <label for="life_span">Life Span: </label>
            <input type="text" name="life_span" id="life_span" patter="^[0-9]{1,3}" onChange={(e)=>handler(e)} required/><br/>

            {/* cambiar temperamentos para seleccionar temperamentos */}
            <label for="temperaments">Temperament: </label>
            {/* <input type="text" name="temperaments" id="temperaments" onChange={(e)=>handler(e)} autoComplete required/><br/> */}
            <select name="temperaments" id="temperaments" onChange={(e)=>handlerTemperaments(e)}>
                <option value="" disabled selected></option>
                {temperamentos?.map((e)=>{
                  return <option key={e.name} value={e.name}>{e.name}</option>
                })}
              </select><br/>
              <div className="breedGroup">
              {array.map((t)=>{
                  return (
                    <div className="Selecciones"> 
                    {t}
                    <input type={"button"} value={"X"} onClick={()=>elimarTemperamento(t)}></input>
                    </div>
                  )                    
              })}
              </div>

            <label for="country_code">Country Code: </label>
            <input type="text" name="country_code" id="country_code" onChange={(e)=>handler(e)} required/><br/>
            <label for="image">Image URL</label>
            <input type={"text"} name="image" id="image" onChange={(e)=>handler(e)}/>
            <input type="button" value="Enviar" onClick={()=>mandarInfo()}/>
            <input type="reset"></input>
        </form>
        
        </>
  )   
}

{/* <input list="browsers" name="browser">
<datalist id="browsers">
  <option value="Internet Explorer">
  <option value="Firefox">
  <option value="Chrome">
  <option value="Opera">
  <option value="Safari">
</datalist> */}
