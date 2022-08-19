import React from 'react'
import { SidebarDataExternal, SidebarDataInternal } from './sidebar.data'
import _ from 'lodash'
import { NavLink } from 'react-router-dom'
import { BsFillShieldLockFill } from 'react-icons/bs'
import { BiLogOut } from "react-icons/bi";
import { useNavigate } from 'react-router';
import { useDispatch } from 'react-redux';
import { logout } from '../../../core/redux/userSlice';
import { RiAccountPinCircleFill } from 'react-icons/ri';
import logo from '../../../assets/images/logo/logo.png';

const Sidebar = ({ userInfos, isAuthenticated, setIsAuthenticated }) => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const handleLogout = (e) => {
    setIsAuthenticated(false);
    dispatch(logout());
    navigate('/auth');
  }
  return (
    <div className="sidebar">
      <div className={`sidebar__logo ${isAuthenticated && 'circle'}`}>
        <img src={logo} width="80" alt="Logo" />
      </div>
      <div className="sidebar__external">
        <span className="sidebar__title-external">Airtreep</span>
        <ul className="sidebar__nav-menu-items">

          {/* Iterate link from sidebarData */}
          {_.map(SidebarDataExternal, (value, key) => (
            <li className="sidebar__nav-menu-item" key={key}>
              <NavLink to={value.link}>
                {value.icon}
                <span>{value.title}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
      {isAuthenticated &&
        <div className="sidebar__internal">
          <span className="sidebar__title-internal">Utilisateur</span>
          <ul className="sidebar__nav-menu-items">

            {/* Iterate link from sidebarData */}
            {_.map(SidebarDataInternal, (value, key) => (
              <li className="sidebar__nav-menu-item" key={key}>
                <NavLink to={value.link}>
                  {value.icon}
                  <span>{value.title}</span>
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      }
      <div className="sidebar__bottom-cta">
        {!isAuthenticated ?
          <div className="sidebar__cta">
            <NavLink to="/auth">
              <BsFillShieldLockFill />
              <span>Connexion</span>
            </NavLink>
          </div>
          :
          <div className="sidebar__cta">
            <li className="sidebar__nav-menu-item">
              <NavLink to={'/account'} className="sidebar__connect">
                <RiAccountPinCircleFill />
                <span>{userInfos.firstName} {userInfos.lastName}</span>
              </NavLink>
            </li>
            <NavLink className="sidebar__disconnect" to="/auth" onClick={(e) => handleLogout()}>
              <BiLogOut />
              <span>Deconnexion</span>
            </NavLink>
          </div>
        }
      </div>
    </div>
  )
}

export default Sidebar