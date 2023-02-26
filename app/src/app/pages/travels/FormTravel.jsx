import { Button, TextField } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router'
import { createTravel, getTravel, updateTravel } from '../../../core/services/travels/travel.service'
import { SelectList } from '../shared/ui/select/Select'
import { locomotionTypes } from './data'
import MapboxAutocomplete from "react-mapbox-autocomplete";


const FormTravel = () => {

    const [credentials, setCredentials] = useState({})
    const travelId = useParams('id').id;
    const navigate = useNavigate()

    const mapAccess = {
        mapboxApiAccessToken:
            process.env.REACT_APP_MAP_BOX_TOKEN
    };

    const _suggestionSelect = (result, lat, long, text) => {
        console.log(result);
    }

    const fetchTravel = async () => {
        if (travelId) {
            try {
                const data = await getTravel(travelId)
                setCredentials(data[0])
            } catch (error) {
                console.log(error)
            }
        } else {
            return;
        }
    }

    const handleChange = (e) => {
        setCredentials({
            ...credentials,
            [e.target.name]: e.target.value
        })

    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            travelId ? await updateTravel(credentials, travelId) : await createTravel(credentials)
            navigate('/travels')
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        fetchTravel();
    }, [])

    return (
        <div className="form-travel">
            <h1>Création d'un voyage</h1>
            <div className="form-travel__content">
                <form onSubmit={handleSubmit}>
                    <TextField value={credentials.title} id="outlined-basic" name="title" label="Titre" variant="outlined" onChange={handleChange} />
                    <TextField value={credentials.description} id="outlined-basic" name="description" label="Description" variant="outlined" onChange={handleChange} />
                    <SelectList
                        label="Locomotions"
                        dataOptions={locomotionTypes}
                        locomotion={credentials.locomotionType}
                        handleChange={handleChange}
                        nameOption='locomotionType'
                    />
                    <TextField value={credentials.startLocation} id="outlined-basic" name="startLocation" label="Départ" variant="outlined" onChange={handleChange} />
                    <TextField value={credentials.arrivalLocation} id="outlined-basic" name="arrivalLocation" label="Arrivé" variant="outlined" onChange={handleChange} />
                    <MapboxAutocomplete
                        publicKey={mapAccess.mapboxApiAccessToken}
                        inputClass="form-control search"
                        onSuggestionSelect={_suggestionSelect}
                        country="fr"
                        resetSearch={false}
                        placeholder="Rechercher un lieu..."
                    />
                    <Button type="submit" variant="contained">Envoyer</Button>
                </form>
            </div>
        </div>
    )
}

export default FormTravel