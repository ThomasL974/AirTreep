import axios from 'axios';
import _ from 'lodash';
import TokenService from '../auth/token/token.service';

let config = { headers: { Authorization: `Bearer ${TokenService.getLocalAccessToken()}` } };

const getTravels = () => {
    return axios.get(`${process.env.REACT_APP_API_URL}travels/list`)
        .then(response => response.data)
}

const getTravelsByTitle = (params = {}) => {
    return axios.get(`${process.env.REACT_APP_API_URL}travels/list`, { params: { ...params } })
        .then(response => response.data)
}

const getTravelsByTitleAndUser = (params = {}) => {
    config = {headers: config.headers, params: { ...params } };
    return axios.get(`${process.env.REACT_APP_API_URL}travels/list/mts`, config)
        .then(response => response.data)
}

const getTravelsByUserId = () => {
    config = { headers: { Authorization: `Bearer ${TokenService.getLocalAccessToken()}` } };
    return axios.get(`${process.env.REACT_APP_API_URL}travels/list/mts`, config)
        .then(response => response.data)
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
    return axios.patch(`${process.env.REACT_APP_API_URL}travels/${id}`, credentials, config)
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
    deleteTravel,
    getTravelsByUserId,
    getTravelsByTitle,
    getTravelsByTitleAndUser
}