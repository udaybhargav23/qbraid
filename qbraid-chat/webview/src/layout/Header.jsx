import React from 'react';
import { useNavigate } from 'react-router-dom';
import qbraidLogo from "../images/qbraid_logo.jpeg";
import { motion } from 'framer-motion';

const Header = () => {
  const navigate = useNavigate();

  return (
    <motion.nav 
      className="navbar navbar-dark bg-dark p-3"
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container-fluid">
        <div className="d-flex align-items-center">
          <img src={qbraidLogo} alt="qBraid Logo" className="logo me-2" />
          <span className="navbar-brand">Qbraid Chat</span>
        </div>
        <div>
          <button className="btn btn-outline-light mx-2" onClick={() => navigate('/')}>Chat</button>
          <button className="btn btn-outline-light" onClick={() => navigate('/devices')}>Devices</button>
        </div>
      </div>
    </motion.nav>
  );
};

export default Header;
