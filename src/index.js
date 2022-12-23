import ReactDOM from 'react-dom/client';
import React, { useState, useEffect } from 'react';
import { HashRouter, Routes, Route, Link, useParams, useLocation } from 'react-router-dom';
import Home from './Home';
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
  const [messages, setMessages] = useState([]);
  const [myPosts, setMyPosts] = useState([]);
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
        setMessages(user.messages);
        setMyPosts(user.posts.filter(post => {
          return post.active;
        }))
      })
      .catch(err => console.log(err));
    }
  }

  const getAllPosts = () => {
    fetch('https://strangers-things.herokuapp.com/api/2209-FTB-ET-WEB-AM/posts', {
      headers: {
        'Content-Type' : 'application/json',
        'Authorization' : `Bearer ${token}`
      },
    })
    .then(response => response.json())
    .then(json => setPosts(json.data.posts));
  }

  useEffect(() => {
    getAllPosts();
    exchangeTokenForUser();
  }, [token]);

  
  const logout = () => {
    window.localStorage.removeItem('token');
    setToken(null);
    setUser({});
    setMessages([]);
    setMyPosts([]);
  }

 
  return (
    <div>
      <h1>Stranger's Things</h1>
      <Nav posts={posts} user={user} logout={logout}/>
      <div id='container'>
        <div id='forms'>
          {
            user._id ?
            <h2>Welcome, {user.username}! </h2> : null
          }
          {
            !user._id ? (
              <div>
                <Register />
                <Login exchangeTokenForUser={exchangeTokenForUser} setToken={setToken}/>
              </div>
            ) : <NewPost token={token} getAllPosts={getAllPosts}/>
          }
        </div>
        <div id='pages'>
          <Routes>
            <Route path='/posts/:id' element={
              <Post posts={posts} user={user} token={token} getAllPosts={getAllPosts}/>
            } />
            <Route path='/posts' element={
              <Posts posts={posts} user={user} token={token} getAllPosts={getAllPosts}/>
            } />
            <Route path='/' element={
              <Home user={user} messages={messages} myPosts={myPosts}/>
            } />
          </Routes>
        </div>
      </div>
    </div>

  );
};
const root = ReactDOM.createRoot(document.querySelector('#root'));
root.render(<HashRouter><App /></HashRouter>);
