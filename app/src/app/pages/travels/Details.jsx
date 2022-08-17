import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { getTravel } from '../../../core/services/travels/travel.service';

const Details = () => {
    const [travel, setTravel] = useState([])
    let {id} = useParams();
    
    const getTravelById = async (id) => {
        try {
            const travel = await getTravel(id)
            setTravel(travel[0])
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(()=>{
        getTravelById(id)
    }, [])
    return (
        <div><h1>Détails du voyages de <span>{travel.title}</span></h1></div>
    )
}

export default Details