import React, { useEffect, useState } from 'react'
import { signup } from '../../../core/services/auth/auth.service'
import { ToastMessage } from '../../layout/shared/toast/Toast';
import { ImArrowLeft2 } from "react-icons/im";

function FormSignup({ credentials, setCredentials, toast, setToast, setRegister, register }) {

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

export default FormSignup