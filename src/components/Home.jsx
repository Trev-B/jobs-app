import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Home.css';
// import UserPage from './UserPage';
// import InfoPage from './InfoPage';

const Home = (props) => {
  const { loggedIn } = props;
  const nav = useNavigate();

  useEffect(() => {
    if (loggedIn) {
      nav('/jobs');
    }
  }, []);

  return (
    <div className='home-page'>
      <div className='info-page-ctn'>
        <h1>Jobs App</h1>
        <div className='home-links'>
          <Link className='home-link' to='/login'>
            Login
          </Link>
          <Link className='home-link' to='/register'>
            Register
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
