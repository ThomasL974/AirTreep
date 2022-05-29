import _ from 'lodash'
import React, { useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import { deleteTravel, getTravels } from '../../../core/services/travels/travel.service'
import CardTravel from '../../layout/shared/card/CardTravel'
import { GrFormAdd } from "react-icons/gr";
import { Button } from '@mui/material'

const Travel = ({ isAuthenticated, travels, setTravels }) => {

    const fetchTravels = async () => {
        try {
            const data = await getTravels(isAuthenticated.userData.userId)
            setTravels(data)
        } catch (error) {
            console.log(error)
        }
    }

    const handleDelete = async (travelId) => {
        try {
            await deleteTravel(travelId);
            console.log("bienjoué");
            fetchTravels();
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        fetchTravels();
    }, [])
    return (
        <div className="travel">
            <h1>Mes voyages</h1>
            <div className="btn btn-create">
                <NavLink to="/travels/create">
                    <Button type="submit" variant="contained">
                        <GrFormAdd />
                        <span>Ajouter un voyage</span>
                    </Button>
                </NavLink>
            </div>
            <div className="travels">
                {_.map(travels, (travel, key) => (
                    <CardTravel handleDelete={handleDelete} isAuthenticated={isAuthenticated} travel={travel} key={key} />
                ))}
            </div>
        </div>
    )
}

export default Travel