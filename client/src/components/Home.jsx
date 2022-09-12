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
        {!buleano ? <p>BREED NOT FOUND, please insert another Breed in the filter</p>:
            <>
            <Dogs data={filter}/>
            </>
        }
        
        </>
    )
}
