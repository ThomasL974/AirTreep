import React, { useEffect, useState } from 'react'
import { singin } from '../../../core/services/auth/auth.service';
import { ToastMessage } from '../../layout/shared/toast/Toast';
import { useDispatch } from 'react-redux';
import { login } from '../../../core/redux/userSlice';
import { useNavigate, useParams } from 'react-router';
import TokenService from '../../../core/services/auth/token/token.service';
import { signup } from '../../../core/services/auth/auth.service'
import { ImArrowLeft2 } from "react-icons/im";
import { Button, TextField } from '@mui/material'
import { createTravel, getTravel, updateTravel } from '../../../core/services/travels/travel.service'
import MapboxAutocomplete from "react-mapbox-autocomplete";

export const FormSignin = ({ credentials, setCredentials, toast, setToast, setRegister }) => {

    const [open, setOpen] = useState(false)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const displayRegister = () => {
        setRegister(false);
    }

    const handleClick = () => {
        setOpen(true);
    };

    const handleClose = (reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };

    const handleChange = (e) => {
        setCredentials({
            ...credentials,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {

            await singin(credentials)

            const localToken = TokenService.getLocalAccessToken()

            dispatch(login({
                isAuthenticated: true,
                userData: JSON.parse(atob(localToken.split('.')[1]))
            }))

            setToast({
                message: 'Vous êtes connecté',
                severity: 'success'
            })

            handleClick()

            setTimeout(() => {
                navigate('/travels')
            }, 1000)
        } catch (error) {
            setToast({
                message: 'Email ou mot de passe incorrect',
                severity: 'error'
            })
            handleClick()
        }
    }

    return (
        <div className="signin">
            <h1>Se connecter</h1>
            <form className="signin__form" onSubmit={handleSubmit}>
                <input type="email" name="email" className="signin__form-email" placeholder="E-mail" onChange={handleChange} />
                <input type="password" name="password" className="signin__form-password" placeholder="Mot de passe" onChange={handleChange} />
                <input type="submit" value="Se connecter" className="signin__form-send btn btn-send" />
            </form>
            <div className="forgot">
                <a href="/#">Mot de passe oublié ?</a>
            </div>
            <div className="signin__register">
                <p>Pas de compte ?</p>
                <button onClick={displayRegister}>Créer un compte</button>
            </div>
            <ToastMessage open={open} handleClose={handleClose} toast={toast}></ToastMessage>
        </div>
    )
}

export const FormSignup = ({ credentials, setCredentials, toast, setToast, setRegister }) => {

    const [open, setOpen] = useState(false);

    const handleDisplayRegisterForm = () => {
        setRegister(true);
    }
    const handleClick = () => {
        setOpen(true);
    };

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };

    const handleChange = (e) => {
        setCredentials({
            ...credentials,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            await signup(credentials)

            setToast({
                message: 'Vous êtes maintenant inscrit',
                severity: 'success'
            })
            handleClick()

            setTimeout(() => {
                handleDisplayRegisterForm()
            }, 2000)
        } catch (error) {
            setToast({
                message: 'Des informations sont incorrect',
                severity: 'error'
            })
            handleClick()
        }
    }

    return (
        <div className="signup">
            <div className="signup__backIcon" onClick={handleDisplayRegisterForm}>
                <ImArrowLeft2 />
            </div>
            <h1>S'inscrire</h1>
            <form className="signup__form" onSubmit={handleSubmit}>
                <div className="signup__first-last">
                    <input type="text" name="firstName" className="signup__form-firstName" placeholder="Prénom" onChange={handleChange} />
                    <input type="text" name="lastName" className="signup__form-lastName" placeholder="Nom" onChange={handleChange} />
                </div>
                <input type="text" name="pseudo" className="signup__form-pseudo" placeholder="Pseudonyme" onChange={handleChange} />
                <input type="email" name="email" className="signup__form-email" placeholder="Email" onChange={handleChange} />
                <input type="password" name="password" className="signup__form-password" placeholder="Mot de passe" onChange={handleChange} />
                <textarea name="description" className="signup__form-description" placeholder="Bio..." onChange={handleChange} rows={6} />
                <input type="submit" value="Send" className="signup__form-send btn btn-send" />
                <ToastMessage open={open} handleClose={handleClose} toast={toast}></ToastMessage>
            </form>
        </div>
    )
}

export const FormTravel = () => {

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

