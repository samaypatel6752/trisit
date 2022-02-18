import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Communication from './components/Communication';
import News from './components/News';
import User from './components/User';
import Navigation from './components/Navigation';
import './App.css'
import Team from './components/Team';
const App = () => {
  return <div id="body">
      <Routes> 
          <Route path="/" element={<Communication/>}></Route>
          <Route path="/news" element={<News/>}></Route>
          <Route path="/account" element={<User/>}></Route>
          <Route path="/team" element={<Team/>}></Route>
      </Routes>
      <Navigation/>
  </div>;
};

export default App;
