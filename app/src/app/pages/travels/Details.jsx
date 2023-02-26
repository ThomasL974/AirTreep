import React, { useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router'
import { getTravel } from '../../../core/services/travels/travel.service';
import profil from '../../../assets/images/pexels-pixabay-220453.jpg'
import test from '../../../assets/images/test.jpg'
import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax
mapboxgl.accessToken = 'pk.eyJ1IjoidG90bzk3NCIsImEiOiJjbDdpM2JzZmMwazd0M3ZvYXQ2M3Nya3p5In0.irf2xbd7qQi759ka61aF4A';

const Details = () => {

    const mapContainer = useRef(null);
    const map = useRef(null);
    const [lng, setLng] = useState(55.5364);
    const [lat, setLat] = useState(21.1151);
    const [zoom, setZoom] = useState(9);

    const [travel, setTravel] = useState([])
    const [propriety, setPropriety] = useState('');
    let { id } = useParams();

    const getTravelById = async (id) => {
        try {
            const travel = await getTravel(id)
            setTravel(travel[0])
        } catch (error) {
            console.log(error)
        }
    }

    const getProfile = (user) => {
        setPropriety(user);
    }

    const joinCharacter = (word) => {

    }

    useEffect(() => {
        getTravelById(id);
        if (map.current) return; // initialize map only once
        map.current = new mapboxgl.Map({
            container: mapContainer.current,
            style: 'mapbox://styles/mapbox/streets-v11',
            center: [lng, lat],
            zoom: zoom
        });
    }, [])

    useEffect(() => {
        getProfile(travel.user)
        joinCharacter(travel.title)
    }, [travel])
    return (
        <div>
            <div className="header">
                <h1>{travel.title}</h1>
                <div className="user-profil">
                    {propriety ? propriety.pseudo : ''}
                    <div className="user-img">
                        <img src={profil} alt="Profil" />
                    </div>
                </div>
            </div>
            <div className="content-details">
                <div className="content-details-img">
                    <img src={test} alt="" />
                </div>
                <div className="content-details-description">
                    <div className="description">
                        <h2 className='bold'>Description</h2>
                        <p>
                            {travel.description}
                        </p>
                    </div>
                    <div className="description">
                        <h2 className='bold'>Informations</h2>
                        <div className="country">
                            <p className='bold'>Pays :</p><span>{travel.country ? travel.country : 'Il n\'y a pas de pays renseigné'}</span>
                        </div>
                        <div className="city">
                            <p className='bold'>Ville :</p><span>{travel.city ? travel.city : 'Il n\'y a pas de ville renseignée'}</span>
                        </div>
                        <div className="activity">
                            <p className='bold'>Type d'activité :</p><span>{travel.activityType ? travel.activityType : 'Il n\'y a pas de type d\'activité renseigné'}</span>
                        </div>
                        <div className="diffculty">
                            <p className='bold'>Difficulté :</p><span>{travel.difficulty ? travel.difficulty : 'Il n\'y a pas de difficulté renseignée'}</span>
                        </div>
                        <div className="address">
                            <p className='bold'>Départ :</p><span>{travel.address ? travel.address : 'Il n\'y a pas d\'adresse renseignée'}</span>
                        </div>
                    </div>
                    <div className="description">
                        <h2 className='bold'>Localisation</h2>
                        <div ref={mapContainer} className="map-container" />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Details