import axios from 'axios';
import TokenService from '../auth/token/token.service';

const getUserInfos = () => {
    return axios.get(`${process.env.REACT_APP_API_URL}auth/details`, {headers: { Authorization: `Bearer ${TokenService.getLocalAccessToken()}` }})
        .then(response => response.data)
}

export {
    getUserInfos
}