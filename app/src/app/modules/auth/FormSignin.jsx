import React, { useState } from 'react'
import { singin } from '../../../core/services/auth/auth.service';
import { ToastMessage } from '../../layout/shared/toast/Toast';
import { useDispatch } from 'react-redux';
import { login } from '../../../core/redux/userSlice';
import { useNavigate } from 'react-router';
import TokenService from '../../../core/services/auth/token/token.service';

function FormSignin({ credentials, setCredentials, toast, setToast, setRegister }) {

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

      setTimeout(()=>{
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

export default FormSignin