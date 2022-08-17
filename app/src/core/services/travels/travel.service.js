import axios from 'axios';
import TokenService from '../auth/token/token.service';

const getTravels = () => {
    return axios.get(`${process.env.REACT_APP_API_URL}travels/list`)
        .then(response => response.data)
}

const getTravelsByUserId = () => {
    return axios.get(`${process.env.REACT_APP_API_URL}travels/list/mts`, {headers: { Authorization: `Bearer ${TokenService.getLocalAccessToken()}` }})
        .then(response => response.data)
}

const getTravel = (id) => {
    return axios.get(`${process.env.REACT_APP_API_URL}travels/${id}`)
        .then(response => response.data)
}

const createTravel = (credentials) => {
    return axios.post(`${process.env.REACT_APP_API_URL}travels/create`, credentials, {headers: { Authorization: `Bearer ${TokenService.getLocalAccessToken()}` }})
        .then(response => response.data)

}

const updateTravel = (credentials, id) => {
    return axios.patch(`${process.env.REACT_APP_API_URL}travels/${id}`, credentials, {headers: { Authorization: `Bearer ${TokenService.getLocalAccessToken()}` }})
        .then(response => response.data)

}

const deleteTravel = (id) => {
    return axios.delete(`${process.env.REACT_APP_API_URL}travels/${id}`, {headers: { Authorization: `Bearer ${TokenService.getLocalAccessToken()}` }})
        .then(response => response.data)
}

export {
    getTravels,
    getTravel,
    createTravel,
    updateTravel,
    deleteTravel,
    getTravelsByUserId
}