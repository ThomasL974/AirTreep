import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Home from './app/pages/home/Home';
import Sidebar from './app/layout/sidebar/Sidebar';
import Discover from './app/pages/discover/Discover';
import { useEffect, useState } from 'react';
import Travel from './app/pages/travels/Travel';
import Ressources from './app/pages/ressources/Ressources';
import Favourites from './app/pages/favourites/Favourites';
import Liked from './app/pages/liked/Liked';
import Dashboard from './app/pages/dashboard/Dashboard';
import Account from './app/pages/account/Account';
import Rank from './app/pages/rank/Rank';
import Details from './app/pages/travels/Details';
import TokenService from './core/services/auth/token/token.service';
import { getUserInfos } from './core/services/user/user.service';
import TopBar from './app/layout/topBar/TopBar';
import FormsSign from './app/modules/auth/FormsSign';
import { FormTravel } from './app/layout/forms/Forms';


const App = () => {
  const [travels, setTravels] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userInfos, setUserInfos] = useState({});

  const fetchUserInfo = async () => {
    if (isAuthenticated) {
      try {
        const user = await getUserInfos();
        setUserInfos({ ...user })
      } catch (error) {
        console.log(error)
      }
    } else {
      setUserInfos({});
    }
  }

  useEffect(() => {
    // eslint-disable-next-line
    fetchUserInfo();
    // eslint-disable-next-line
  }, [isAuthenticated])

  useEffect(() => {
    setIsAuthenticated(TokenService.getLocalAccessToken())
    window.addEventListener('storage', () => {
      setIsAuthenticated(TokenService.getLocalAccessToken() ? true : false)
    });
    // eslint-disable-next-line
  }, TokenService.getLocalAccessToken())

  return (
    <div className="app">
      <BrowserRouter>
        <div className="content-right">
          {window.location.pathname !== '/' &&
            <Sidebar userInfos={userInfos} isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} />
          }
        </div>
        <div className="content-left">
          {window.location.pathname !== '/' &&
            <TopBar setTravels={setTravels} travels={travels}></TopBar>
          }
          <div className="content">
            <Routes>
              <Route path='/' exact element={<Home />} />
              <Route exact path='/auth' userInfos={userInfos} setUserInfos={setUserInfos} element={<FormsSign />} />
              <Route exact path='/discover' element={<Discover travels={travels} setTravels={setTravels} />} />
              <Route exact path='/ranking' element={<Rank />} />
              <Route exact path='/ressources' element={<Ressources />} />
              <Route exact path='/travels/details/:id' element={<Details />} />

              {isAuthenticated &&
                <>
                  <Route
                    exact
                    path='/travels'
                    element={<Travel travels={travels} isAuthenticated={isAuthenticated} setTravels={setTravels} />}
                  />
                  <Route exact path='/travels/create' element={<FormTravel />} />
                  <Route exact path='/travels/update/:id' element={<FormTravel />} />
                  <Route exact path='/favourites' element={<Favourites />} />
                  <Route exact path='/liked' element={<Liked />} />
                  <Route exact path='/dashboard' element={<Dashboard />} />
                  <Route exact path='/account' element={<Account />} />
                </>
              }
              {isAuthenticated ?
                <Route
                  path="*"
                  element={<Navigate to="/travels" replace />}
                />
                :
                <Route
                  path="*"
                  element={<Navigate to="/discover" replace />}
                />
              }
            </Routes>
          </div>
        </div>

      </BrowserRouter>
    </div>

  );
}

export default App;
