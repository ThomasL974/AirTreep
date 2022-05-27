import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './app/pages/home/Home';
import Sidebar from './app/layout/sidebar/Sidebar';
import Discover from './app/pages/discover/Discover';
import { useState } from 'react';
import Forms from './app/modules/auth/Forms';
import { useSelector } from 'react-redux'
import Travel from './app/pages/travels/Travel';
import Ressources from './app/pages/ressources/Ressources';
import Favourites from './app/pages/favourites/Favourites';
import Liked from './app/pages/liked/Liked';
import Dashboard from './app/pages/dashboard/Dashboard';
import Account from './app/pages/account/Account';
import Rank from './app/pages/rank/Rank';
import Details from './app/pages/travels/Details';


const App = () => {
  const [travels, setTravels] = useState([]);
  const isAuthenticated = useSelector((state) => state.user.user)

  return (
    <div className="app">
      <BrowserRouter>
        <Sidebar isAuthenticated={isAuthenticated} />
        <div className="content">
          <Routes>
            <Route path='/' element={<Home />} />
            <Route exact path='/signin' element={<Forms />} />
            <Route exact path='/discover' element={<Discover travels={travels} setTravels={setTravels} />} />
            {/* Ranking instead essentials */}
            <Route exact path='/ranking' element={<Rank />} />
            <Route exact path='/ressources' element={<Ressources />} />

            {isAuthenticated &&
              <>
                <Route
                  exact
                  path='/travels'
                  element={<Travel isAuthenticated={isAuthenticated} travels={travels} setTravels={setTravels}/>}
                />
                <Route exact path='/travels/details/:id' element={<Details travels={travels} setTravels={setTravels} />} />
                <Route exact path='/travels/favourites' element={<Favourites />} />
                <Route exact path='/travels/liked' element={<Liked />} />
                <Route exact path='/dashboard' element={<Dashboard />} />
                <Route exact path='/account' element={<Account />} />
              </>
            }
          </Routes>
        </div>
      </BrowserRouter>
    </div>

  );
}

export default App;
