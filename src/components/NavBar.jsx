import React from 'react';
import { Link } from 'react-router-dom';
import './NavBar.css';

const NavBar = (props) => {
  const { signout, signedIn } = props;

  return (
    <nav className='navbar'>
      <Link to='/'>
        <h1>Job Tracer</h1>
      </Link>
      {signedIn ? (
        <div className='user-info'>
          <h3>Hello, {localStorage.getItem('user')}</h3>
          <button onClick={signout}>Logout</button>
        </div>
      ) : (
        <div className='nav-links'>
          <Link to='/login'>Login</Link>
          <Link to='/register'>Register</Link>
        </div>
      )}
    </nav>
  );
};

export default NavBar;
