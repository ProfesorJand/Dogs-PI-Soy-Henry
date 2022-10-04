import React, {useEffect, useState} from 'react';
import Dogs from './Dogs.jsx';
import FilterBreedGroup from './FilterBreedGroup';
import Order from './Order.jsx'
import Pagination from './Paginations.jsx';
import FilterTemperamentos from './FilterTemperament.jsx';
import FilterApiDB from './FilterApiDB';
// import {useDispatch, useSelector} from 'react-redux';
// import {getBredFor} from '../actions/index.js';
// import { useCallback } from 'react';
import "./css/Home.css";



export default function Home() {
    const [dogs, setDogs] = useState([]); 
    const [razas, setRazas] = useState([]);
    const [temperamentos, setTemperamentos] = useState([]); 

    const [filter, setFilter] = useState([]);
    const [breedName, setBreed] = useState("all"); 
    const [valueTemperament, setValueTemperament] = useState("all");
    const [valueOrder, setValueOrder] = useState(["Name", "Weight"]);

    const [currentPage, setCurrentPage] = useState(1);
    const [totalPage, setTotalPage] = useState(0); 
    const [maxShow, setMaxShow] = useState(8); 
    const [arrayPag, setArrayPag] = useState([]);
    const [variableValue, setVariableValue] = useState("All");

    // const dispatch = useDispatch();
    // const varBredFor = useSelector((state)=>state.bred_for)


    useEffect(()=>{
        
        fetch('http://localhost:3001/dogs').then(r=>r.json()).then(all=>{
            const sorteado = all.sort(function(a, b) {
                var x = a.name; var y = b.name;
                return ((x < y) ? -1 : (x > y) ? 1 : 0)});
            setDogs([...sorteado])
        })
        fetch('http://localhost:3001/temperaments').then(r=> r.json()).then(r=>setTemperamentos(r))
        fetch('http://localhost:3001/breed_group').then(r=> r.json()).then(r=>setRazas(r))
        // dispatch(getBredFor());
    },[])

    useEffect(()=>{
        setFilter(dogs);
        onFilter(breedName, true, 1, valueTemperament);

    },[dogs]);

    useEffect(()=>{
        onFilter(breedName, false, currentPage, valueTemperament)
    },[currentPage]);

    useEffect(()=>{
        setArrayPag([]) 
        for(let i = 1; i <= totalPage; i++){ 
            setArrayPag((e)=>[...new Set([...e,i])]) 
        }
    },[totalPage]);

    useEffect(()=>{
        setFilter(dogs);
        onFilter(breedName, true, 1,valueTemperament, variableValue);
    },[variableValue])

    function onFilter(breed = "all", buleano = false, pag = currentPage, filterTemperament = "all", variable = variableValue){ 
        
        setBreed(breed);
        setValueTemperament(filterTemperament);
        var filt = []
        if(variable === "All") {
            filt = dogs
        }
        if(variable === "API") {
            filt = dogs.filter((e)=>{
                return e.id < 300
            })
        }
        if(variable === "DB") {
            filt = dogs.filter((e)=>{
                return e.id >= 300
            })
        }
        
        if(buleano){
            setCurrentPage(1);
            window.location.hash = "#1"
        }
         
        if(breed.toLowerCase() === "all" || !breed){
            if(filterTemperament.toLowerCase() !== "all"){
                if(temperamentos.find(e =>e.name === filterTemperament)){
                const filtrado = filt.filter((d)=>{
                    if(d.temperament){
                        return d.temperament.includes(filterTemperament) ; 
                    }
                    if(d.Temperaments){
                        return d.Temperaments.map((t)=>t.name).join(", ").includes(filterTemperament)
                    }
                });
                const totalPage = Math.ceil(filtrado.length / maxShow);  
                setTotalPage(totalPage);
                const otroFiltrado = [].concat(filtrado).splice((pag * maxShow) - maxShow, maxShow); 
                return setFilter(otroFiltrado);
                }
            }else{
                const totalPage = Math.ceil(filt.length / maxShow);
                setTotalPage(totalPage);
                const otroFiltrado = [].concat(filt).splice((pag * maxShow) - maxShow, maxShow);
                return setFilter(otroFiltrado);
            }

        }else{
            if(filterTemperament.toLowerCase() !== "all"){
                if(temperamentos.find(e =>e.name === filterTemperament)){
                const filtrado = filt.filter((d)=>{
                    if(d.temperament && d.breed_group){
                        return d.temperament.includes(filterTemperament) && d.breed_group.toLowerCase() === breed.toLowerCase(); 
                    }
                    if(d.Temperaments && d.breed_group){
                        return d.Temperaments.map((t)=>t.name).join(", ").includes(filterTemperament) && d.breed_group.toLowerCase() === breed.toLowerCase();
                    }
                });
                const totalPage = Math.ceil(filtrado.length / maxShow);  
                setTotalPage(totalPage);
                const otroFiltrado = [].concat(filtrado).splice((pag * maxShow) - maxShow, maxShow); 
                return setFilter(otroFiltrado);
                }
            }else{
                const filtrado = filt.filter((d)=>{
                    if(d.breed_group){
                        return d.breed_group.toLowerCase() === breed.toLowerCase() ; 
                    }
                })
                const totalPage = Math.ceil(filtrado.length / maxShow);
                setTotalPage(totalPage);
                const otroFiltrado = [].concat(filtrado).splice((pag * maxShow) - maxShow, maxShow);
                return setFilter(otroFiltrado);
            }
        }
    }

    

    function onOrder( arg, cambio , array = dogs ){ 
        if(!arg){
            return 
        }
        arg = arg.toLowerCase();
        if(cambio === "A-Z"){
            const sorteado = array.sort(function(a, b) {
                var x = a[arg]; var y = b[arg];
                if(arg === "weight"){
                    var x = Number(a[arg].split(" - ")[0])? Number(a[arg].split(" - ")[0]):15;
                    var y = Number(b[arg].split(" - ")[0])? Number(b[arg].split(" - ")[0]):15;
                }
                return ((x < y) ? -1 : ((x > y) ? 1 : (x === undefined) ? 1 : 0)); 
                
            });
            setDogs([].concat(sorteado))
        }else{
            const sorteado = array.sort(function(a, b) {
                var x = a[arg] ? a[arg]: ""; var y = b[arg] ? b[arg]: "";
                if(arg === "weight"){
                    var x = Number(a[arg].split(" - ")[0])? Number(a[arg].split(" - ")[0]):15;
                    var y = Number(b[arg].split(" - ")[0])? Number(b[arg].split(" - ")[0]):15;
                }
                return ((x > y) ? -1 : ((x < y) ? 1 : (x === undefined) ? 1 : (y === undefined) ? 1 : 0)); 
            });
            setDogs([].concat(sorteado)) 
        }
    }
        
   
    return (
        <>
        
        {dogs.length === 0 || temperamentos.length === 0 || razas.length === 0 ?
        <>
            <div className="ContainerFiltOrderPag">
            <FilterApiDB variableValue={variableValue} setVariableValue={setVariableValue}/>
            <FilterBreedGroup onFilter={onFilter} razas={razas} valueTemperament={valueTemperament}/>
            <FilterTemperamentos onFilter={onFilter} temperamentos={temperamentos} breed={breedName}/>
            <Order onOrder={onOrder} valueOrder={valueOrder}/>
            <Pagination arrayPag={arrayPag} setCurrentPage={setCurrentPage} currentPage={currentPage} totalPage={totalPage}/>
            </div>
            <div className='ContainerDogs'>
            <img src="https://cdn.dribbble.com/users/1782673/screenshots/4683964/ezgif.com-video-to-gif__2_.gif" alt="Cargando"/>
            </div>
            </>
            :
            <>
            <div className="ContainerFiltOrderPag">
            <FilterApiDB variableValue={variableValue} setVariableValue={setVariableValue}/>
            <FilterBreedGroup onFilter={onFilter} razas={razas} valueTemperament={valueTemperament}/>
            <FilterTemperamentos onFilter={onFilter} temperamentos={temperamentos} breed={breedName}/>
            <Order onOrder={onOrder} valueOrder={valueOrder}/>
            <Pagination arrayPag={arrayPag} setCurrentPage={setCurrentPage} currentPage={currentPage} totalPage={totalPage}/>

            {/* <select>
                {
                    varBredFor?.map((e)=>{
                        return <option key={e.id} value={e.name}>{e.name}</option>
                    })
                }
            </select> */}
            
            </div>
            <Dogs data={filter}/>
            </>
        }
        
        </>
    )
}
