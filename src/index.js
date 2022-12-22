import ReactDOM from 'react-dom/client';
import React, { useState, useEffect } from 'react';
import { HashRouter, Routes, Route, Link, useParams, useLocation } from 'react-router-dom';
import Posts from './Posts';
import Post from './Post';
import Nav from './Nav';
import Login from './Login';
import Register from './Register';
import NewPost from './NewPost';

const App = () => {
  //https://strangers-things.herokuapp.com/api/
  //https://strangers-things.herokuapp.com/api/2209-FTB-ET-WEB-AM/posts
  const [posts, setPosts] = useState([]);
  const [user, setUser] = useState([]);
  const [token, setToken] = useState(null);

  const exchangeTokenForUser = () => {
    const token = window.localStorage.getItem('token');
    setToken(token);
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
    fetch('https://strangers-things.herokuapp.com/api/2209-FTB-ET-WEB-AM/posts')
      .then(response => response.json())
      .then(json => setPosts(json.data.posts));

    exchangeTokenForUser();
  }, [posts]);

  
  const logout = () => {
    window.localStorage.removeItem('token');
    setToken(null);
    setUser({});
  }

 
  return (
    <div>
      <h1>Stranger's Things</h1>
      <Nav posts={posts} user={user} logout={logout}/>
      {
        user._id ?
        <h2>Welcome, {user.username}! </h2> : null
      }
      <div id='container'>
        <div id='signIn'>
        {
          !user._id ? (
            <div>
              <Register />
              <Login exchangeTokenForUser={exchangeTokenForUser} setToken={setToken}/>
            </div>
          ) : <NewPost token={token}/>
        }
        </div>
        <div id='pages'>
          <Routes>
            <Route path='/posts/:id' element={
              <Post posts={posts} user={user} token={token}/>
            } />
            <Route path='/posts' element={
              <Posts posts={posts} user={user} token={token}/>
            } />
            <Route path='/' element={<h1>Home</h1>} />
          </Routes>
        </div>
      </div>
    </div>

  );
};
const root = ReactDOM.createRoot(document.querySelector('#root'));
root.render(<HashRouter><App /></HashRouter>);
