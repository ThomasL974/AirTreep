import React from 'react'
import { useNavigate } from 'react-router-dom'

const Home = () => {
    const navigate = useNavigate();
    return (
        <div className="home">
            <h1>Accueil</h1>
            <button onClick={() => navigate('/discover')}>welcome</button>
        </div>
    )
}

export default Home