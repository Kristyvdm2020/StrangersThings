import ReactDOM from 'react-dom/client';
import React, { useState, useEffect } from 'react';
import { HashRouter, Routes, Route, Link, useParams, useLocation } from 'react-router-dom';
import Posts from './Posts';
import Post from './Post';
import Nav from './Nav';

const App = ()=> {
  //https://strangers-things.herokuapp.com/api/
  //https://strangers-things.herokuapp.com/api/2209-FTB-WEB-PT_AM/posts
  const [posts, setPosts] = useState([]);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  useEffect(()=>{
    fetch('https://strangers-things.herokuapp.com/api/2209-FTB-WEB-PT_AM/posts')
      .then(response => response.json())
      .then(json => setPosts(json.data.posts));
  }, []);

  const loginRegister = (ev) => {
    ev.preventDefault();
    
  }

  return (
    <div>
      <h1>Stranger's Things</h1>
      <Nav posts={posts}/>
      <Routes>
        <Route path='/posts/:id' element={
          <Post posts={posts} />
        } />
        <Route path='/posts' element= {
          <Posts posts={posts}/>
        } />
        <Route path='/' element= { 
          <form onSubmit = { loginRegister }>
            <input 
              placeholder='username'
              value = {username} 
              onChange = {ev => setUsername(ev.target.value)}
              />
            <input 
              placeholder='password'
              value = {password}
              onChange= {ev => setPassword(ev.target.value)}
              />
            <span><button>Register</button>
            <button>Login</button></span>
          </form>
        }/>
      </Routes> 
    </div>

  );
};
const root = ReactDOM.createRoot(document.querySelector('#root'));
root.render(<HashRouter><App /></HashRouter>);
