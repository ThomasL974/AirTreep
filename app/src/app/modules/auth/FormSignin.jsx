import React, { useState } from 'react'
import { singin } from '../../../services/auth/auth.service';
import ToastMessage from '../../layout/shared/toast/Toast';

function FormSignin({ credentials, setCredentials, message, setMessage }) {

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
    e.preventDefault();
    try {
      await singin(credentials)
      setMessage('Vous êtes connecté')
      handleClick()
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="conection">
      <ToastMessage open={open} handleClose={handleClose} message={message}></ToastMessage>
      <h1>Connexion</h1>
      <form className="conection__form" onSubmit={handleSubmit} action="">
        <input type="email" name="email" className="conection__form-email" placeholder="Email" onChange={handleChange} />
        <input type="password" name="password" className="conection__form-password" placeholder="Password" onChange={handleChange} />
        <input type="submit" value="Send" className="conection__form-send btn btn-send" />
      </form>
    </div>
  )
}

export default FormSignin