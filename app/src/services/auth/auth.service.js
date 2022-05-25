import axios from 'axios';
import TokenService from './token/token.service';

const singin = (credentials) => {
    return axios.post(`${process.env.REACT_APP_API_URL}auth/login`, credentials)
    .then(response => {
        const {token} = response.data
        console.log(token);
        token && TokenService.insertToken(token)
    })
}

const signup = (credentials) => {
    return axios.post(`${process.env.REACT_APP_API_URL}auth/register`, credentials)
    .then(response =>{
    })
}

export {
    singin,
    signup
}