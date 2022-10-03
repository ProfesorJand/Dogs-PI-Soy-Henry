import React from "react";
import Dog from "./Dog.jsx";
import "./css/Dogs.css";

export default function Dogs({data}){

    return (
        <>
        <div className="ContainerDogs">
        {data.length === 0 ? 
        <>
        <h2>No Dog Found</h2>
        </>
        : 
        data?.map((d)=>{ return (
            <Dog
                key={d.id}
                bred_for={d.bred_for ? d.bred_for : d.Bred_Fors ? d.Bred_Fors.map((b)=>b.name).join(", "): d.bred_for}
                breed_group={d.breed_group}
                height={d.height}
                id={d.id}
                image={d.image}
                life_span={d.life_span}
                name={d.name}
                origin={d.origin}
                reference_image_id={d.reference_image_id}
                temperament={d.temperament ? d.temperament : d.Temperaments ? d.Temperaments.map((t)=>t.name).join(", "): d.temperament}
                weight={d.weight}
                country_code={d.country_code}

                />
            )}
        )
        }
        </div>
        </>
    )
}