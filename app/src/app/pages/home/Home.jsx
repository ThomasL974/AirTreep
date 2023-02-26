import React from 'react'
import { BsArrowRight } from 'react-icons/bs'
import { NavLink } from 'react-router-dom'

const Home = () => {
    return (
        <div className="home">
            <h1 className='title'>Découverte</h1>
            <NavLink className='margin0 absolute flex' to={'/discover'}>
                <p>Découvrir</p>
                <div className='home-button' size="small" ><BsArrowRight className='front-button'/></div>
            </NavLink>
        </div>
    )
}

export default Home