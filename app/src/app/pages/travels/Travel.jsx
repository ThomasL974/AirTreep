import _ from 'lodash'
import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { deleteTravel, getTravelsByUserId } from '../../../core/services/travels/travel.service'
import CardTravel from '../../layout/shared/card/CardTravel'
import CardAdd from '../../layout/shared/card/CardAdd'
import { BsPlusLg } from 'react-icons/bs'

const Travel = ({ travels, setTravels, isAuthenticated }) => {

    const [open, setOpen] = useState(false);

    const fetchTravels = async () => {
        try {
            const data = await getTravelsByUserId();
            setTravels(data);
        } catch (error) {
            console.log(error)
        }
    }

    const handleDelete = async (travelId) => {
        try {
            await deleteTravel(travelId);
            setOpen(false);
            fetchTravels();
        } catch (error) {
            console.log(error)
        }

    }

    useEffect(() => {
        fetchTravels();
    }, [])
    return (
        <div className="discover">
            <div className="travel-add">
                <NavLink to="/travels/create">
                    <div className="btn btn-create">
                        <BsPlusLg/>
                        <span>Ajouter un voyage</span>
                    </div>
                </NavLink>
            </div>
            <div className="travels">
                {_.map(travels, (travel, key) => (
                    <>
                        <CardTravel
                            handleDelete={handleDelete}
                            isAuthenticated={isAuthenticated}
                            travel={travel}
                            key={key}
                            open={open}
                            setOpen={setOpen} />
                    </>
                ))}
                <NavLink to="/travels/create">
                    <CardAdd />
                </NavLink>
            </div>
        </div>
    )
}

export default Travel