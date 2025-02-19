import React from 'react';
import { MemoryRouter as Router, Routes, Route } from 'react-router-dom'; //Use MemoryRouter
import Header from './layout/Header';
import ChatBox from './components/ChatBox';
import DeviceList from './components/DeviceList';
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
  return (
    <Router>
      <Header />
      <div className="container mt-4">
        <Routes>
          <Route path="/" element={<ChatBox />} />
          <Route path="/devices" element={<DeviceList />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
