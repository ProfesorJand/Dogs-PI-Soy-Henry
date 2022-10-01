import React, {useState} from "react";
import { useEffect } from "react";
import Rectangulos from "./Rectangulos";
import Dog from "./Dog";
import "./css/CreateDog.css"



export default function CreateDog(){
    const [constante, setConstante] = useState("");
    const [temperamentos, setTemperamentos] = useState([]);
    const [bred, setBred] = useState([]);
    const [breedGroup, setBreedGroup] = useState([]);
    const [valueBG, setValueBG] = useState("");
    const [arrayB, setArrayB] = useState([]);
    const [arrayT, setArrayT]= useState([])
    const [data, setData] = useState({
      name: "",
      bred_for: arrayB.join(", "),
      breed_group: "",
      life_spanMin: "",
      life_spanMax: "",
      temperaments: arrayT.join(", "),
      heightMin: "",
      heightMax: "",
      weightMin: "",
      weightMax: "",
      image: "",
      country_code: "",
    });

    useEffect(()=>{
      fetch('http://localhost:3001/temperaments').then(r=> r.json()).then(r=>setTemperamentos(r))
      fetch('http://localhost:3001/bred_for').then(r=> r.json()).then(r=>setBred(r))
      fetch('http://localhost:3001/breed_group').then(r=> r.json()).then(r=>setBreedGroup(r))
    },[constante]);

    useEffect(()=>{
      setData((data)=>({...data, temperaments : arrayT.join(", ")}))
    },[arrayT])

    useEffect(()=>{
      setData((data)=>({...data, bred_for : arrayB.join(", ")}))
      console.log("arrayB", arrayB)
    },[arrayB])

    useEffect(()=>{
      setData((data)=>({...data, breed_group : valueBG}))
      console.log("arrayBG", valueBG)
    },[valueBG])
   
    function handler(e){
      setData((data)=>({...data, [e.target.name] : e.target.value }))
    }

    function handlerBreds(e){
      
      if (!arrayB.includes(e.target.value)){

        setArrayB((r)=>[...r, e.target.value])
        
      }
    }


    function elimarBreds(t){
      setArrayB((valores)=>{
        return valores.filter((bred)=>{
          return bred !== t
        })
      })
      
      return setData((data)=>({...data, bred_for : arrayB.join(", ")}))
    }

    function handlerTemperaments(e){
      
      if (!arrayT.includes(e.target.value)){

        setArrayT((r)=>[...r, e.target.value])
        
      }
    }


    function elimarTemperamento(t){
      setArrayT((valores)=>{
        return valores.filter((tempe)=>{
          return tempe !== t
        })
      })
      
      return setData((data)=>({...data, temperaments : arrayT.join(", ")}))
    }

    function handlerBreedGroup(e){
      
      if (!valueBG.includes(e.target.value)){

        setValueBG(e.target.value)
        
      }
    }

    function agregarBredBD(){
      const valor = window.document.getElementById("inputCrearBred").value;
      fetch(`http://localhost:3001/bred_for?name=${valor}`, {
        method: "POST",
      });
      setConstante(valor);
      console.log("Bred", valor, "Created Succesfully");
      
    }

    function agregarTempBD(){
      const valor = window.document.getElementById("inputCrearTemp").value;
      fetch(`http://localhost:3001/temperaments?name=${valor}`, {
        method: "POST",
      });
      setConstante(valor);
      console.log("Temperament", valor, "Created Succesfully");
      
    }

    function agregarBreedGroupBD(){
      const valor = window.document.getElementById("inputCrearBreedGroup").value;
      fetch(`http://localhost:3001/breed_group?name=${valor}`, {
        method: "POST",
      });
      setConstante(valor);
      console.log("Breed Group", valor, "Created Succesfully");
      
    }
    
    async function mandarInfo(e){
      console.log("mandar array",arrayB.join(", "))
      console.log(JSON.stringify(data));
      fetch("http://localhost:3001/temperaments")
      .then(()=>
        fetch("http://localhost:3001/bred_for"))
      .then(()=>
        fetch("http://localhost:3001/breed_group"))  
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
          setData({name: "",
          bred_for: arrayB.join(", "),
          breed_group: "",
          life_spanMin: "",
          life_spanMax: "",
          temperaments: arrayT.join(", "),
          heightMin: "",
          heightMax: "",
          weightMin: "",
          weightMax: "",
          image: "",
          country_code: "",});
          setValueBG("");
          setArrayB([]);
          setArrayT([]);
          alert("Breed Created Succesfully");
          

        })
      )  
    }
    
    return (
      <>
      {
        temperamentos.length !==0 && breedGroup.length !==0 && bred.length !==0 &&
        <>
        <h1>Create Dog</h1>
        <div className="ContainerCreator">
        <form action="http://localhost:3001/dogs" method="post" onSubmit={(e)=>{
            mandarInfo(e);
            e.preventDefault();
            
            
        }}>
            <label for="image">Image URL: </label>
            <input type={"text"} value={data.image} name="image" id="image" onChange={(e)=>handler(e)}/><br/>
            <label for="name">Name: </label>
            <input type="text" value={data.name} name="name" id="name" pattern="^[A-Z]+[a-z]{1,25}" title="Primera letra Mayusculas; demas letras minusculas; Maximo de Caracteres (25); No se aceptan numeros; No se aceptan caracteres especiales" onChange={(e)=>handler(e)} required autofocus/><br/>
            <label for="height" >Height minimun: </label>
            <input type="number" value={data.heightMin} name="heightMin" pattern="^[1-9]{0,5}[0-9]{0,1}[^.][^,]" min="1" title="Debe contener 2 decimales (0,22), No debe tener puntos (.); El decimal debe ser una coma (,); Si tiene mas de 2 digitos el primero no debe ser un cero (0)" width="10" onChange={(e)=>handler(e)} required/>
            <label for="height" >Height maximun: </label>
            <input type="number" value={data.heightMax} name="heightMax" pattern="^[1-9]{0,5}[0-9]{0,1}[^.][^,]" min={Number(data.heightMin)} title="Debe contener 2 decimales (0,22), No debe tener puntos (.); El decimal debe ser una coma (,); Si tiene mas de 2 digitos el primero no debe ser un cero (0)" width="10" onChange={(e)=>handler(e)} required/><br/>
            <label for="weight">Weight minimun: </label>
            <input type="number"value={data.weightMin} name="weightMin" pattern="^[1-9]{0,5}[0-9]{0,1}[^.][^,]" min="1" title="Debe ser un Numero Entero y no puede ser 0" onChange={(e)=>handler(e)} required/>
            <label for="weight">Weight maximun: </label>
            <input type="number" value={data.weightMax} name="weightMax" pattern="^[1-9]{0,5}[0-9]{0,1}[^.][^,]" min={Number(data.weightMin)} title="Debe ser un Numero Entero y superior al Numero Min o igual" onChange={(e)=>handler(e)} required/><br/>
            <label for="life_span">Life Span minimun: </label>
            <input type="number" value={data.life_spanMin} name="life_spanMin" id="life_spanMin" patter="^[1-9]{0,5}[0-9]{0,1}[^.][^,]" min="1" title="Debe ser un Numero Entero y no puede ser 0" onChange={(e)=>handler(e)} required/><br/>
            <label for="life_span">Life Span maximun: </label>
            <input type="number" value={data.life_spanMax} name="life_spanMax" id="life_spanMax" patter="^[1-9]{0,5}[0-9]{0,1}[^.][^,]" min={Number(data.life_spanMin)} title="Debe ser un Numero Entero y superior al Numero Min o igual" onChange={(e)=>handler(e)} required/><br/>
            
            <br/><br/>
            {/* cambiar Bred for para seleccionar Bred for */}
            <label for="bred_for" >Bred For: </label>
            <select name="bred_for" id="bred_for" onChange={(e)=>handlerBreds(e)}>
                <option value="" disabled selected></option>
                {bred?.map((e)=>{
                  return <option key={e.id} value={e.name}>{e.name}</option>
                })}
              </select><br/>
              <div className="breedGroup">
              {arrayB.map((t)=>{
                  return (
                    <div className="Selecciones" key={"keyBred"+t}> 
                    {t}
                    <input type={"button"} value={"X"} onClick={()=>elimarBreds(t)}></input>
                    </div>
                  )                    
              })}
              </div>
              <br/><br/>

            <label for="breed_group">Breed Group: </label>
            <select name="temperaments" id="temperaments" onChange={(e)=>handlerBreedGroup(e)}>
                <option value="" disabled selected></option>
                {breedGroup?.map((e)=>{
                  return <option key={e.id} value={e.name}>{e.name}</option>
                })}
              </select>
            <br/><br/>

            {/* cambiar temperamentos para seleccionar temperamentos */}
            <label for="temperaments">Temperament: </label>
            {/* <input type="text" name="temperaments" id="temperaments" onChange={(e)=>handler(e)} autoComplete required/><br/> */}
            <select name="temperaments" id="temperaments" onChange={(e)=>handlerTemperaments(e)}>
                <option value="" disabled selected></option>
                {temperamentos?.map((e)=>{
                  return <option key={e.id} value={e.name}>{e.name}</option>
                })}
              </select><br/>
              <div className="breedGroup">
              {arrayT.map((t)=>{
                  return (
                    <div className="Selecciones" key={"keyTemp"+t}> 
                    {t}
                    <input type={"button"} value={"X"} onClick={()=>elimarTemperamento(t)}></input>
                    </div>
                  )                    
              })}
              </div>
              <br/><br/>
              <hr></hr>
              <input type="text" name="inputCrearBred" id="inputCrearBred"/>
              <input type="button" onClick={()=>agregarBredBD()} value="Add Bred For"/><br/><br/>
              <input type="text" name="inputCrearBreedGroup" id="inputCrearBreedGroup"/>
              <input type="button" onClick={()=>agregarBreedGroupBD()} value="Add Breed Group"/><br/><br/>
              <input type="text" name="inputCrearTemp" id="inputCrearTemp"/>
              <input type="button" onClick={()=>agregarTempBD()} value="Add Temperament"/><br/><br/>
              
              {data &&
              <Dog
              perfil={true}
              id="999"
              name={data.name}
              life_span={`${data.life_spanMin} - ${data.life_spanMax} years`}
              image={data.image}
              temperament={arrayT.join(", ")}
              bred_for={arrayB.join(", ")}
              breed_group={data.breed_group}
              weight={`${data.weightMin} - ${data.weightMax}`}
              height={`${data.heightMin} - ${data.heightMax}`}
              />}
            
            <input type="submit" value="Create Dog" />
            <input type="reset" onClick={()=>{setData({}); setArrayT([]); setArrayB([])}}></input>
        </form>
        </div>

        </>
      }      
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
