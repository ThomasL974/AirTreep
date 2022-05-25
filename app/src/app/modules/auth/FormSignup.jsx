import React, { useState } from 'react'
import { signup } from '../../../services/auth/auth.service'
import ToastMessage from '../../layout/shared/toast/Toast';

function FormSignup({ credentials, setCredentials, message, setMessage }) {

    const [open, setOpen] = useState(false);

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
            setMessage('Vous êtes inscrit')
            handleClick()
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className="register">
            <ToastMessage open={open} handleClose={handleClose} message={message}></ToastMessage>
            <h1>Inscription</h1>
            <form className="register__form" onSubmit={handleSubmit} action="">
                <input type="email" name="email" className="register__form-email" placeholder="Email" onChange={handleChange} />
                <input type="password" name="password" className="register__form-password" placeholder="Password" onChange={handleChange} />
                <input type="submit" value="Send" className="register__form-send btn btn-send" />
            </form>
        </div>
    )
}

export default FormSignup