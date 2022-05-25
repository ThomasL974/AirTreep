import React from 'react'
import { SidebarDataExternal } from './sidebar.data'
import _ from 'lodash'
import { NavLink } from 'react-router-dom'

function Sidebar() {
  // Open menu
  // const [sidebar, setSidebar] = useState(true);
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
    </div>
  )
}

export default Sidebar