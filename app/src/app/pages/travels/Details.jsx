import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { getTravel } from '../../../core/services/travels/travel.service';

const Details = () => {
    let {id} = useParams();
    const [travel, setTravel] = useState({})
    const getTravelById = async (id) => {
        try {
            const travel = await getTravel(id)
            console.log(travel)
            setTravel({travel})
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(()=>{
        getTravelById(id)
    }, [])
    return (
        <div><h1>Détails du voyages de <span styel='color: red'>{travel.id}</span></h1></div>
    )
}

export default Details