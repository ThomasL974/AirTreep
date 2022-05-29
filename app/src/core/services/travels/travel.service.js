import axios from 'axios';
import TokenService from '../auth/token/token.service';

const config = {
    headers: { Authorization: `Bearer ${TokenService.getLocalAccessToken()}` }
};

const getTravels = (userId = null) => {
    return axios.get(`${process.env.REACT_APP_API_URL}travels/list`)
        .then(response => {
            if (userId) {
                return response.data.filter((value, key) => value.user.id === userId)
            } else {
                return response.data
            }
        })
}

const getTravel = (id) => {
    return axios.get(`${process.env.REACT_APP_API_URL}travels/${id}`)
        .then(response => response.data)
}

const createTravel = (credentials) => {
    return axios.post(`${process.env.REACT_APP_API_URL}travels/create`, credentials, config)
        .then(response => response.data)

}

const updateTravel = (credentials, id) => {
    return axios.patch(`${process.env.REACT_APP_API_URL}travels/${id}`, credentials)
        .then(response => response.data)

}

const deleteTravel = (id) => {
    return axios.delete(`${process.env.REACT_APP_API_URL}travels/${id}`, config)
        .then(response => response.data)
}

export {
    getTravels,
    getTravel,
    createTravel,
    updateTravel,
    deleteTravel
}