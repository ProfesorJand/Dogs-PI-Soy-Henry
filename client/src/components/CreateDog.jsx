/* eslint-disable */
import React, {useState} from "react";
import { useEffect } from "react";
import Dog from "./Dog";
import "./css/CreateDog.css"



export default function CreateDog(){
    const [constante, setConstante] = useState("");
    const [dogsNames, setDogsNames] = useState([])
    const [temperamentos, setTemperamentos] = useState([]);
    const [bred, setBred] = useState([]);
    const [breedGroup, setBreedGroup] = useState([]);
    const [valueBG, setValueBG] = useState("");
    const [arrayB, setArrayB] = useState([]);
    const [arrayT, setArrayT]= useState([]);
    const [error, setError] = useState({arrayBG:"error"});
    const isNullUndefEmptyStr = Object.values(error).every(value => {
      if (value === '') {
        return true;
      }
      return false;
    });

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
      fetch('http://localhost:3001/dogs').then(r=> r.json()).then(r=>r.map((x)=>x.name)).then(r=>setDogsNames(r))
      fetch('http://localhost:3001/temperaments').then(r=> r.json()).then(r=>setTemperamentos(r))
      fetch('http://localhost:3001/bred_for').then(r=> r.json()).then(r=>setBred(r))
      fetch('http://localhost:3001/breed_group').then(r=> r.json()).then(r=>setBreedGroup(r))
    },[constante]);

    useEffect(()=>{
      setData((data)=>({...data, temperaments : arrayT.join(", ")}))
    },[arrayT])

    useEffect(()=>{
      setData((data)=>({...data, bred_for : arrayB.join(", ")}))
    },[arrayB])

    useEffect(()=>{
      setData((data)=>({...data, breed_group : valueBG}))
    },[valueBG])
   
    function handler(e){
      const inputName = e.target.name;
      const inputValue = e.target.value;
      setData((data)=>({...data, [inputName] : inputValue }));
      if(inputName === "name" ) {
        if(!(/[^0-9\.\,\"\?\!\;\:\#\$\%\&\(\)\*\+\-\/\<\>\=\@\[\]\\\^\_\{\}\|\~]/.test(inputValue)) || inputValue.length > 40){
          return setError((err)=>({...err, name:"Primera letra Mayuscula de cada palabra, maximo 40 caracteres, no utlizar caracteres especiales"}))
        }
        if(dogsNames.includes(inputValue)){
          return setError((err)=>({...err, name:"Este nombre ya existe!!, porfavor cambiar el nombre"}))
        }
        const arr = inputValue.split(" ");
        for (var i = 0; i < arr.length; i++){
          arr[i] = arr[i].charAt(0).toUpperCase() + arr[i].slice(1);
        }
        const capitalize = arr.join(" ");
        setData((data)=>({...data, [inputName] : capitalize }));
        return setError((err)=>({...err, name:""}))
      }
      if(inputName === "life_spanMin"){
        if( !(/(^[1-9]{1,1}(\d{0,2}?)$)/.test(inputValue)) ){
          return setError((err)=>({...err, life_span:"Numero Entero Positivos, no se acepta 0 y maximo 3 digitos",life_spanMin:"error"}))
        }
        if(Number(inputValue) > Number(data.life_spanMax)){
          return setError((err)=>({...err, life_span:"Life Span Minimun is higher than Life Span Maximun",life_spanMin:"error"}))
        }
        return setError((err)=>({...err, life_span:"",life_spanMax:"",life_spanMin:""}))
      }
      if(inputName === "life_spanMax"){
        if(!(/(^[1-9]{1,1}(\d{0,2}?)$)/.test(inputValue)) ){
          return setError((err)=>({...err, life_span:"Numero Entero Positivos, no se acepta 0, maximo 3 digitos y debe ser mayor o igual minimo",life_spanMax:"error"}))
        }
        if(Number(data.life_spanMin) > Number(inputValue) ){
          return setError((err)=>({...err, life_span:"Life Span Minimun is higher than Life Span Maximun",life_spanMax:"error"}))
        }
        return setError((err)=>({...err, life_span:"",life_spanMax:"",life_spanMin:""}))
      }
      if(inputName === "heightMin"){
        if( !(/(^[1-9]{1,1}(\d{0,2}?)$)/.test(inputValue)) ){
          return setError((err)=>({...err, height:"Numero Entero Positivos, no se acepta 0 y maximo 3 digitos", heightMin:"error"}))
        }
        if(Number(inputValue) > Number(data.heightMax)){
          return setError((err)=>({...err, height:"Height Minimun is higher than Height Maximun", heightMin:"error"}))
        }
        return setError((err)=>({...err, height:"", heightMin:"", heightMax:""}))
      }
      if(inputName === "heightMax"){
        if( !(/(^[1-9]{1,1}(\d{0,2}?)$)/.test(inputValue)) ){
          return setError((err)=>({...err, height:"Numero Entero Positivos, no se acepta 0 y debe ser mayor o igual minimo", heightMax:"error"}))
        }
        if(Number(data.heightMin) > Number(inputValue)){
          return setError((err)=>({...err, height:"Height Minimun is higher than Height Maximun", heightMax:"error"}))
        }
        return setError((err)=>({...err, height:"", heightMax:"", heightMin:""}))
      }
      if(inputName === "weightMin" ){
        if( !(/(^[1-9]{1,1}(\d{0,2}?)$)/.test(inputValue)) ){
          return setError((err)=>({...err, weight:"Numero Entero Positivos, no se acepta 0 y maximo 3 digitos", weightMin:"error"}))
        }
        if(Number(inputValue) > Number(data.weightMax)){
          return setError((err)=>({...err, weight:"Weight Minimun is higher than Weight Maximun", weightMin:"error"}))
        }
        return setError((err)=>({...err, weight:"", weightMax:"", weightMin:""}))
      }
      if(inputName === "weightMax"){
        if( !(/(^[1-9]{1,1}(\d{0,2}?)$)/.test(inputValue)) ){
          return setError((err)=>({...err, weight:"Numero Entero Positivos, no se acepta 0 y debe ser mayor o igual minimo", weightMax:"error"}))
        }
        if( Number(data.weightMin) > Number(inputValue)) {
          return setError((err)=>({...err, weight:"Numero Entero Positivos, no se acepta 0", weightMax:"error"}))
        }
        return setError((err)=>({...err, weight:"", weightMax:"", weightMin:""}))
        
      }
      if(inputName === "image"){
        function testImage(URL) {
          var tester=new Image();
          tester.onload=imageFound;
          tester.onerror=imageNotFound;
          tester.src=URL;
      }
      function imageFound() {
          alert('That image is found and loaded');
          return setError((err)=>({...err, image:""}))
      }
      function imageNotFound() {
          alert('That image was not found.');
          return setError((err)=>({...err, image:"That image was not found."}))
      }
      testImage(inputValue);
      }
    }

    function handlerBreds(e){   
      if (!arrayB.includes(e.target.value)){
        setArrayB((r)=>[...r, e.target.value])
      }
      return setError((err)=>({...err, arrayB:""}))
    }

    function elimarBreds(t){
      setArrayB((valores)=>{
        return valores.filter((bred)=>{
          return bred !== t
        })
      })
      setData((data)=>({...data, bred_for : arrayB.join(", ")}))
      if(arrayB.length===0){
        return setError((err)=>({...err, arrayB:"This value cannot be Empty"}))
      }

    }

    function handlerTemperaments(e){
      if (!arrayT.includes(e.target.value)){
        setArrayT((r)=>[...r, e.target.value]) 
      }
      return setError((err)=>({...err, arrayT:""}))
    }

    function elimarTemperamento(t){
      setArrayT((valores)=>{
        return valores.filter((tempe)=>{
          return tempe !== t
        })
      })  
      setData((data)=>({...data, temperaments : arrayT.join(", ")}));
      if(arrayT.length===0){
        return setError((err)=>({...err, arrayT:"This value cannot be Empty"}))
      }
    }

    function handlerBreedGroup(e){ 
      if (!valueBG.includes(e.target.value)){
        setValueBG(e.target.value)
      }
      setError((err)=>({...err,arrayBG:""}))
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
    
    async function mandarInfo(){ 
      const isNullUndefEmptyStr = Object.values(error).every(value => {
        // 👇️ check for multiple conditions
        if (value === '') {
          return true;
        }
        return false;
      });
      if(isNullUndefEmptyStr){
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
      alert("You have 1 or more errors in the data you wanna create please change where is indicated");
       
    }

   
    
    return (
      <>
      {
        temperamentos.length !==0 && breedGroup.length !==0 && bred.length !==0 &&
        <>
        <h1>Create Dog</h1>
        <div className="CreateDogContainer">
        <div className="ContainerCreator">
        <form action="http://localhost:3001/dogs" method="post" onSubmit={(e)=>{
            mandarInfo(e);
            e.preventDefault();
            
            
        }}>
            <label for="image">Image URL: </label>
            <input type={"text"} value={data.image} name="image" id="image" onChange={(e)=>handler(e)} className={error.image?"InputError":""} required autofocus/><br/>
            {error.image && <><label className="Error">{error.image}</label><br/></>}
            <br/>
            <label for="name">Name: </label>
            <input type="text" value={data.name} name="name" id="name" onChange={(e)=>handler(e)} className={error.name?"InputError":""} required /><br/>
            {error.name && <><label className="Error">{error.name}</label><br/></>}
            <br/>
            <label for="height" >Height minimun: </label>
            <input type="number" value={data.heightMin} name="heightMin" width="10" onChange={(e)=>handler(e)} className={error.heightMin?"InputError":""} required/><br/>
            <label for="height" >Height maximun: </label>
            <input type="number" value={data.heightMax} name="heightMax" width="10" onChange={(e)=>handler(e)} className={error.heightMax?"InputError":""} required/><br/>
            {error.height && <><label className="Error">{error.height}</label><br/></>}
            <br/>
            <label for="weight">Weight minimun: </label>
            <input type="number"value={data.weightMin} name="weightMin" onChange={(e)=>handler(e)} className={error.weightMin?"InputError":""} required/><br/>
            <label for="weight">Weight maximun: </label>
            <input type="number" value={data.weightMax} name="weightMax" onChange={(e)=>handler(e)} className={error.weightMax?"InputError":""} required/><br/>
            {error.weight && <><label className="Error">{error.weight}</label><br/></>}
            <br/>
            <label for="life_span">Life Span minimun: </label>
            <input type="number" value={data.life_spanMin} name="life_spanMin" id="life_spanMin" onChange={(e)=>handler(e)} className={error.life_spanMin?"InputError":""} required/><br/>
            <label for="life_span">Life Span maximun: </label>
            <input type="number" value={data.life_spanMax} name="life_spanMax" id="life_spanMax" onChange={(e)=>handler(e)} className={error.life_spanMax?"InputError":""} required/><br/>
            {error.life_span && <><label className="Error">{error.life_span}</label><br/></>}
            <br/>

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
              <br/>

            <label for="breed_group">Breed Group: </label>
            <select name="temperaments" id="temperaments" onChange={(e)=>handlerBreedGroup(e)}>
                <option value="" disabled selected></option>
                {breedGroup?.map((e)=>{
                  return <option key={e.id} value={e.name}>{e.name}</option>
                })}
              </select>
            <br/><br/>

          
            <label for="temperaments">Temperament: </label>
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
              
              
            { isNullUndefEmptyStr && <input type="submit" value="Create Dog" />}
            <input type="reset" onClick={()=>{setData({}); setArrayT([]); setArrayB([]); setValueBG("")}} ></input>
        </form>
        </div>
        <div className="CreateDogInfo">
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
              classN={"fixCreator"}
              />}
        </div>
        </div>
        </>
      }      
      </>
  )   
}


