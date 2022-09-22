/*[ ] Input de búsqueda para encontrar razas de perros por nombre
[ ] Área donde se verá el listado de razas de perros. Deberá mostrar su:
Imagen
Nombre
Temperamento
Peso
[ ] Botones/Opciones para filtrar por:
Temperamento
Raza existente (es decir las que vienen de la API) o agregada por nosotros (creadas mediante el form)
[ ] Botones/Opciones para ordenar tanto ascendentemente como descendentemente las razas de perro por:
Orden alfabético
Peso
[ ] Paginado para ir buscando y mostrando las siguientes razas, mostrando 8 razas por página. 
IMPORTANTE: Dentro de la Ruta Principal se deben mostrar tanto las razas de perros traidas desde la API como así también las de la base de datos,
pero NO está permitido almacenar en la base de datos las razas de perros de la API sino que solamente se pueden guardar aquellas creadas desde el form. */

import React, {useEffect, useState} from 'react';
import Dogs from './Dogs.jsx';
import FilterBreedGroup from './FilterBreedGroup';
import Order from './Order.jsx'
import Pagination from './Paginations.jsx';
import FilterTemperamentos from './FilterTemperament.jsx'
// import Logo from '../../logoHenry.png'

export default function Home() {
    const [dogs, setDogs] = useState([]); // api de dogs... peticion al backend
    const [filter, setFilter] = useState([]); // data filtrado x input value
    const [breed, setBreed] = useState("all"); // data filtrado2 x input value para el order
    const [valueFilter, setValueFilter] = useState("");
    const [buleano, setBuleano] = useState(true); // condicion verdadero o falso
    const [currentPage, setCurrentPage] = useState(1);
    //const [dataCurrentPage, setDataCurrentPage] = useState([]);
    const [totalPage, setTotalPage] = useState(0); // cantidad total de paginacion
    const [maxShow, setMaxShow] = useState(8); // cantidad max a mostrar por paginacion
    const [arrayPag, setArrayPag] = useState([]); // cantidad de paginacion inputs
    const [temperamentos, setTemperamentos] = useState([]); // temperamentos del backend
    const [razas, setRazas] = useState([]); // Grupos de Razas
    

    useEffect(()=>{
        fetch('http://localhost:3001/dogs').then(r=>r.json()).then(all=>{setDogs([...all])}) //backend
        fetch('http://localhost:3001/temperaments').then(r=> r.json()).then(r=>setTemperamentos(r))
        fetch('http://localhost:3001/dogs/razas').then(r=> r.json()).then(r=>setRazas(r))
        
    },[])

    useEffect(()=>{
        setFilter(dogs);
        onFilter(breed);
    },[dogs])

    useEffect(()=>{
        onFilter(valueFilter)
    },[currentPage])

    useEffect(()=>{
        setArrayPag([]) //restablecer el array para que se cree de nuevo
        for(let i = 1; i <= totalPage; i++){ //2
            setArrayPag((e)=>[...new Set([...e,i])]) //[1,2]
        }
    },[totalPage])

    function onFilter(breed, buleano = false, pag = currentPage, option = "all"){
        //tener la base de datos con los breeds para realizar un condicional para verificar si existe ese breed
        //en caso de que no exista setear buleano en false con setBulueano
        console.log(breed)
        setBreed(breed);
        if(buleano){
            setCurrentPage(1);
            window.location.hash = "#1"
        }
        console.log("otro filtrado")
        setValueFilter(breed) // 
        if(breed.toLowerCase() === "all" || !breed){
            console.log("traer todos los dogs sin paginado")
            const totalPage = Math.ceil(dogs.length / maxShow);
            setTotalPage(totalPage);
            const otroFiltrado = [].concat(dogs).splice((pag * maxShow) - maxShow, maxShow);
            
            return setFilter(otroFiltrado);
        }
        if(temperamentos.find(e =>e.name === breed)){
            
            const filtrado = dogs.filter((d)=>{
                console.log(d)
                if(d.Temperaments){
                    console.log("AAAAAAAAAAAAAAAAAAAA")
                    return d.Temperaments.map((t)=>t.name).join(", ").includes(breed)
                }
                if(d.temperament){
                    return d.temperament.includes(breed); 
                }
                
            });
            const totalPage = Math.ceil(filtrado.length / maxShow);  
            setTotalPage(totalPage);
            const otroFiltrado = [].concat(filtrado).splice((pag * maxShow) - maxShow, maxShow); 
            console.log("otroFiltrado ::", otroFiltrado)
            setFilter(otroFiltrado);
        }else{
            const filtrado = dogs.filter((d)=>{
                // falta filtrar por temperamento 
                if(d.breed_group){ // filtrar por breed_group
                    return d.breed_group.toLowerCase() === breed.toLowerCase(); 
                } 
            });
            const totalPage = Math.ceil(filtrado.length / maxShow); // 10 / 8 , 
            setTotalPage(totalPage);
            const otroFiltrado = [].concat(filtrado).splice((pag * maxShow) - maxShow, maxShow); // 2 * 8 = 16 - 8  (8, 8 )
            setFilter(otroFiltrado);
        }
        

        

       
    }

    function onOrder( arg, cambio , array = dogs ){ //arg = name //[{name: "nombre"}]
        console.log(arg)
        if(!arg){
            return 
        }

        if(cambio === "A-Z"){
            const sorteado = array.sort(function(a, b) {
                console.log(a[arg])
                var x = a[arg]; var y = b[arg];
                return ((x < y) ? -1 : ((x > y) ? 1 : (x === undefined) ? 1 : 0)); //verificar si es necesario x = undifned con el cambio del filtro temperament y breed_gruop
                
            });
            setDogs([].concat(sorteado)) // hago esto para que surta efecto el useState
        }else{
            const sorteado = array.sort(function(a, b) {
                console.log(a[arg])
                var x = a[arg] ? a[arg]: ""; var y = b[arg] ? b[arg]: "";
                
                return ((x > y) ? -1 : ((x < y) ? 1 : (x === undefined) ? 1 : (y === undefined) ? 1 : 0)); //verificar si es necesario y = undifned con el cambio del filtro temperament y breed_gruop
            });
            setDogs([].concat(sorteado)) // hago esto para que surta efecto el useState
        }
    }
        
   
    return (
        <>
        <FilterBreedGroup onFilter={onFilter} razas={razas}/>
        <FilterTemperamentos onFilter={onFilter} temperamentos={temperamentos}/>
        <Order onOrder={onOrder}/>
        <Pagination arrayPag={arrayPag} setCurrentPage={setCurrentPage} currentPage={currentPage} totalPage={totalPage}/>
        {!buleano ? 
            <>
            <p>hola</p>
            <img src="data:image/jpeg;base64,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" alt="Cargando"/>
            <p>BREED NOT FOUND, please insert another Breed in the filter</p>
            
            </>
            :
            <>
            <Dogs data={filter}/>
            </>
        }
        
        </>
    )
}
