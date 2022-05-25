const insertToken = (accessToken) => {
    localStorage.setItem('accessToken', accessToken)
}

const getLocalAccessToken = () => {
    return localStorage.getItem('accessToken')
}

const TokenService = {
    insertToken,
    getLocalAccessToken
}

export default TokenService