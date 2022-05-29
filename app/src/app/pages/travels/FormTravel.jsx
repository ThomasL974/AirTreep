import { Button, TextField } from '@mui/material'
import React, { useState } from 'react'
import { useNavigate } from 'react-router'
import { createTravel } from '../../../core/services/travels/travel.service'
import { SelectList } from '../shared/ui/select/Select'
import { locomotionTypes } from './data'

const FormTravel = () => {
    const [credentials, setCredentials] = useState({})
    const navigate = useNavigate()
    const handleChange = (e) => {
        setCredentials({
            ...credentials,
            [e.target.name]: e.target.value
        })

    }
    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            await createTravel(credentials)
            navigate('/travels')
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <div className="form-travel">
            <h1>Formulaire de création</h1>
            <form onSubmit={handleSubmit}>
                <TextField id="outlined-basic" name="title" label="Titre" variant="outlined" onChange={handleChange}/>
                <TextField id="outlined-basic" name="description" label="Description" variant="outlined" onChange={handleChange}/>
                <SelectList 
                    label="Locomotions"
                    dataOptions={locomotionTypes}
                    locomotion={credentials.locomotion}
                    handleChange={handleChange}
                    nameOption='locomotionType'
                />
                <TextField id="outlined-basic" name="startLocation" label="Départ" variant="outlined" onChange={handleChange}/>
                <TextField id="outlined-basic" name="arrivalLocation" label="Arrivé" variant="outlined" onChange={handleChange}/>
                <Button type="submit" variant="contained">Envoyer</Button>
            </form>
        </div>
    )
}

export default FormTravel