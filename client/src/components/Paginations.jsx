import React from 'react'
import { useEffect , useState} from 'react';

export default function Pagination({max,arrayPag, setCurrentPage, currentPage, totalPage}){


    // useEffect(()=>{
    //     max();
    
    // })

    function pag(a){
 
        return (
        <input
            key={a}
            id={"paginadoNum"+a}
            className={window.location.hash === `#${a}` ? "active" : `#${a}`}
            type="button"
            onClick={(e)=>todo(e)}
            value={a}
        />)
    }

    function todo(e){
        if(e.target.value === "PrevPag") {
            if(currentPage > 1){
                window.location.hash = `#${currentPage - 1}`
                setCurrentPage(currentPage - 1)
                return
            }
            return
        }
        if(e.target.value === "NextPag") {
            if(currentPage < totalPage){
                window.location.hash = `#${currentPage + 1}`
                setCurrentPage(currentPage + 1)
                return
            }
            return
        }
        window.location.hash = `#${e.target.value}`;
        setCurrentPage(Number(e.target.value))
    }

    return (
        <>
            <form id="formularioPaginacion" onSubmit={(e) => {
                e.preventDefault();
            }}>
                <input
                    id="PrevPag"
                    className="PrevPag" 
                    type="button"
                    value="PrevPag"
                    onClick={(e)=>todo(e)}
                />
                {arrayPag.length === 0 ? <p>Cargando Paginado...</p>: arrayPag.map((a)=>{
                    return (pag(a))
                })}
                <input
                    id="NextPag"
                    className="NextPag"
                    type="button"
                    value="NextPag"
                    onClick={(e)=>todo(e)}
                />
            </form>
        </>
    )
}