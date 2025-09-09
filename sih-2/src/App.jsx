import React from 'react';
import Home from './Pages/Home/Home';
import Destination from './Pages/Destination/Destination';
import Map from './Pages/Map/Map';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/destination" element={<Destination />} />
          <Route path='/maps' element={<Map />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;