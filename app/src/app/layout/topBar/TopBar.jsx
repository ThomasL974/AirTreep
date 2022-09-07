import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { FaSearch } from "react-icons/fa";
import { getTravelsByTitle, getTravelsByTitleAndUser } from '../../../core/services/travels/travel.service';

const TopBar = ({ setTravels }) => {

    const [searchCredential, setSearchCredential] = useState({});

    const handleChange = (e) => {
        setSearchCredential({
            ...searchCredential,
            [e.target.name]: e.target.value
        })
    }

    const fetchTravels = async () => {
        try {
            if(window.location.pathname === '/travels'){
                setTravels(await getTravelsByTitleAndUser(searchCredential))
            }else{
                setTravels(await getTravelsByTitle(searchCredential))
            }
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        const timer = setTimeout(() => {
            fetchTravels();
        }, 500)

        return () => clearTimeout(timer);
    }, [searchCredential])

    return (
        <div className="top-bar">
            <div className="filter-search">
                <FaSearch />
                <input type="text" className='input-search' name='title' placeholder="Rechercher une destination par titre" onChange={handleChange} />
            </div>
        </div>
    )
}

export default TopBar