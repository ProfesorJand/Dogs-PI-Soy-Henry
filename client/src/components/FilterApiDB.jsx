import React from 'react';
import './css/FilterApiDB.css'

export default function FilterApiDB({variableValue, setVariableValue}){

    function changeDogs(e){

        const value = e.target.value;
        setVariableValue(value);
       
    }
    return (
        <>
        <div>
            <input type="button" value={"All"} className={variableValue === "All" ? "Selected": ""} onClick={(e)=>changeDogs(e)}/>
            <input type="button" value={"API"}  className={variableValue === "API" ?"Selected": ""} onClick={(e)=>changeDogs(e)}/>
            <input type="button" value={"DB"} className={variableValue === "DB" ? "Selected" : ""} onClick={(e)=>changeDogs(e)}/>
        </div>
        </>
    )
}