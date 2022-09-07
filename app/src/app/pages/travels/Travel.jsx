import _ from 'lodash'
import React, { useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import { getTravelsByUserId } from '../../../core/services/travels/travel.service'
import CardTravel from '../../layout/shared/card/CardTravel'
import CardAdd from '../../layout/shared/card/CardAdd'
import { BsPlusLg } from 'react-icons/bs'

const Travel = ({ travels, setTravels, isAuthenticated }) => {

    const fetchTravels = async () => {
        try {
            const data = await getTravelsByUserId();
            setTravels(data);
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
                        <span>Ajouter une destination</span>
                    </div>
                </NavLink>
            </div>
            <div className="travels">
                {_.map(travels, (travel, key) => (
                    <div key={key}>
                        <CardTravel
                            isAuthenticated={isAuthenticated}
                            travel={travel}
                            key={key}
                            fetchTravels={fetchTravels} />
                    </div>
                ))}
                <NavLink to="/travels/create">
                    <CardAdd />
                </NavLink>
            </div>
        </div>
    )
}

export default Travel