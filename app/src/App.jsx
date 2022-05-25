import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from "./app/pages/home/Home";
import Sidebar from "./app/layout/sidebar/Sidebar";
import Discover from './app/pages/discover/Discover';
import { useState } from 'react';
import Forms from './app/modules/auth/Forms';

function App() {
  const [travels, setTravels] = useState([]);

  return (
    <div className="app">
      <BrowserRouter>
        <Sidebar />
        <div className="content">
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/signin' element={<Forms />} />
            <Route path='/discover' element={<Discover travels={travels} setTravels={setTravels} />} />
            {/* Ranking instead essentials */}
            <Route path='/ranking' element='' />
            <Route path='/discover' element='' />
            <Route path='/discover' element='' />
            <Route path='/discover' element='' />
          </Routes>
        </div>
      </BrowserRouter>
    </div>

  );
}

export default App;
