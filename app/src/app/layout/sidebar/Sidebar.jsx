import React from 'react'
import { SidebarDataExternal, SidebarDataInternal } from './sidebar.data'
import _ from 'lodash'
import { NavLink } from 'react-router-dom'
import { BsFillShieldLockFill } from 'react-icons/bs'
import { BiLogOut } from "react-icons/bi";
import { useNavigate } from 'react-router';
import { useDispatch } from 'react-redux';
import { logout } from '../../../core/redux/userSlice';

const Sidebar = ({ isAuthenticated }) => {
  // Open menu
  // const [sidebar, setSidebar] = useState(true);
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const handleLogout = (e) => {
    dispatch(logout())
    localStorage.removeItem('accessToken')
    navigate('/signin')
  }
  return (
    <div className="sidebar">
      <div className="sidebar__external">
        <ul className="sidebar__nav-menu-items">

          {/* Iterate link from sidebarData */}
          {_.map(SidebarDataExternal, (value, key) => (
            <li className="sidebar__nav-menu_item" key={key}>
              <NavLink to={value.link} activeClassName="selected">
                {value.icon}
                <span>{value.title}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
      {isAuthenticated &&
        <div className="sidebar__internal">
          <ul className="sidebar__nav-menu-items">

            {/* Iterate link from sidebarData */}
            {_.map(SidebarDataInternal, (value, key) => (
              <li className="sidebar__nav-menu_item" key={key}>
                <NavLink to={value.link} activeClassName="selected">
                  {value.icon}
                  <span>{value.title}</span>
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      }
      {!isAuthenticated ?
        <div className="sidebar__cta">
          <NavLink to="/signin" activeClassName="selected">
            <BsFillShieldLockFill />
            <span>Connexion</span>
          </NavLink>
        </div>
        :
        <div className="sidebar__cta">
          <NavLink to="/signin" onClick={(e)=>handleLogout()}>
            <BiLogOut />
            <span>Deconnexion</span> 
          </NavLink>
        </div>
      }
    </div>
  )
}

export default Sidebar