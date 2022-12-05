import { useEffect, useState } from 'react';
import Home from './components/Home.jsx';
import { Route, Routes, useNavigate } from 'react-router-dom';
import Register from './components/Register';
import Login from './components/Login';
import './App.css';
import NavBar from './components/NavBar';
import UserPage from './components/UserPage';

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const nav = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setLoggedIn(true);
      nav('/jobs');
    }
  }, [loggedIn]);

  const signout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setLoggedIn(false);
    nav('/');
  };

  return (
    <div className='app'>
      <NavBar signedIn={loggedIn} signout={signout}></NavBar>

      <Routes>
        <Route path='/' element={<Home loggedIn={loggedIn} />} />
        <Route
          path='/register'
          element={<Register setLoggedIn={setLoggedIn} />}
        />
        <Route path='/login' element={<Login setLoggedIn={setLoggedIn} />} />
        <Route path='/jobs' element={<UserPage loggedIn={loggedIn} />} />
      </Routes>
    </div>
  );
}

export default App;
