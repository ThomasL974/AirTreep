import axios from 'axios';
import TokenService from '../auth/token/token.service';

const getUserInfos = () => {
    return axios.get(`${process.env.REACT_APP_API_URL}auth/details`, {headers: { Authorization: `Bearer ${TokenService.getLocalAccessToken()}` }})
        .then(response => response.data)
}

const updateUser = (credentials) => {
    return axios.patch(`${process.env.REACT_APP_API_URL}auth/update`, credentials, {headers: { Authorization: `Bearer ${TokenService.getLocalAccessToken()}` }})
        .then(response => response.data)
}

const uploadProfileImg = (formData) => {
    return axios.post(`${process.env.REACT_APP_API_URL}auth/upload`, formData, {headers: { Authorization: `Bearer ${TokenService.getLocalAccessToken()}`, "Content-Type": "multipart/form-data" }})
        .then(response => response.data)
}

export {
    getUserInfos,
    updateUser,
    uploadProfileImg
}