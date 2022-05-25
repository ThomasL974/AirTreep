import axios from 'axios';

const getTravels = () => {
    return axios.get(`${process.env.REACT_APP_API_URL}travels/list`)
        .then(response => response.data)
}

const getTravel = (id) => {
    return axios.get(`${process.env.REACT_APP_API_URL}travels/list/${id}`)
        .then(response => response.data)
}

const createTravel = (credentials) => {
    if (localStorage.getItem('accessToken')) {
        return axios.get(`${process.env.REACT_APP_API_URL}travels/create`, credentials)
            .then(response => response.data)
    }

    return
}

const updateTravel = (credentials, id) => {
    if(localStorage.getItem('accessToken')){
        return axios.patch(`${process.env.REACT_APP_API_URL}travels/${id}`, credentials)
        .then(response => response.data)
    }

    return
}

export {
    getTravels,
    getTravel,
    createTravel,
    updateTravel
}