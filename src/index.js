import ReactDOM from 'react-dom/client';
import React, { useState, useEffect } from 'react';
import { HashRouter, Routes, Route, Link, useParams, useLocation } from 'react-router-dom';
import Posts from './Posts';
import Post from './Post';
import Nav from './Nav';
import Login from './Login';

const App = () => {
  //https://strangers-things.herokuapp.com/api/
  //https://strangers-things.herokuapp.com/api/2209-FTB-WEB-PT_AM/posts
  const [posts, setPosts] = useState([]);
  const [registerUsername, setRegisterUsername] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');
  const [registerMessage, setRegisterMessage] = useState('');
  const [loginUsername, setLoginUsername] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginMessage, setLoginMessage] = useState('');
  const [user, setUser] = useState([]);

  const exchangeTokenForUser = () => {
    const token = window.localStorage.getItem('token');
    if(token) {
      fetch('https://strangers-things.herokuapp.com/api/2209-FTB-ET-WEB-AM/users/me', {
        headers: {
          'Content-Type' : 'application/json',
          'Authorization' : `Bearer ${token}`
        },
      })
      .then(response => response.json())
      .then(result => {
        const user = result.data;
        setUser(user);
      })
      .catch(err => console.log(err));
    }
  }

  useEffect(() => {
    fetch('https://strangers-things.herokuapp.com/api/2209-FTB-WEB-PT_AM/posts')
      .then(response => response.json())
      .then(json => setPosts(json.data.posts));

    exchangeTokenForUser();
  }, []);

  const register = (ev) => {
    ev.preventDefault();
    fetch('https://strangers-things.herokuapp.com/api/2209-FTB-ET-WEB-AM/users/register', {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        user: {
          username: registerUsername,
          password: registerPassword
        }
      })
    })
    .then(response => response.json())
    .then(result => {
      //Verifying successful registration & message to user
      if(result.success) {
        setRegisterMessage(result.data.message);
      } else {
        setRegisterMessage(result.error.message);
        throw result.error;
      }
    })
    .catch(err => console.log(err));
  }

  const logout = () => {
    window.localStorage.removeItem('token');
    setUser({});
    setRegisterMessage('');
    setLoginMessage('');
  }

  return (
    <div>
      <h1>Stranger's Things</h1>
      <Nav posts={posts} user={user} logout={logout}/>
      {
        user._id ?
        <div>Welcome, {user.username} </div> : null
      }
      {
        !user._id ? (
          <div>
            <form onSubmit = { register }>
              <input
                placeholder='username'
                value={registerUsername}
                onChange={ev => setRegisterUsername(ev.target.value)}
              />
              <input
                placeholder='password'
                value={registerPassword}
                onChange={ev => setRegisterPassword(ev.target.value)}
              />
              <button>Register</button>
              <p>{registerMessage}</p>
            </form>
            <Login exchangeTokenForUser={exchangeTokenForUser}/>
          </div>
        ) : null
      }
      
      <Routes>
        <Route path='/posts/:id' element={
          <Post posts={posts} />
        } />
        <Route path='/posts' element={
          <Posts posts={posts} />
        } />
        {/* <Route path='/logout' element= {
          <div>Thank you for logging out.</div>
        } /> */}
        <Route path='/' element={<div>Home</div>} />
      </Routes>
    </div>

  );
};
const root = ReactDOM.createRoot(document.querySelector('#root'));
root.render(<HashRouter><App /></HashRouter>);
