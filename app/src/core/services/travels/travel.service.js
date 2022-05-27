import axios from 'axios';

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
    return axios.get(`${process.env.REACT_APP_API_URL}travels/list/${id}`)
        .then(response => response.data)
}

const createTravel = (credentials) => {
    return axios.get(`${process.env.REACT_APP_API_URL}travels/create`, credentials)
        .then(response => response.data)

}

const updateTravel = (credentials, id) => {
    return axios.patch(`${process.env.REACT_APP_API_URL}travels/${id}`, credentials)
        .then(response => response.data)

}

const deleteTravel = (id) => {
    return axios.delete(`${process.env.REACT_APP_API_URL}travels/${id}`)
        .then(response => response.data)
}

export {
    getTravels,
    getTravel,
    createTravel,
    updateTravel,
    deleteTravel
}