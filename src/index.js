import ReactDOM from 'react-dom/client';
import React, { useState, useEffect } from 'react';
import { HashRouter, Routes, Route, Link, useParams, useLocation } from 'react-router-dom';
import Posts from './Posts';
import Post from './Post';
import Nav from './Nav';
import Login from './Login';
import Register from './Register';

const App = () => {
  //https://strangers-things.herokuapp.com/api/
  //https://strangers-things.herokuapp.com/api/2209-FTB-WEB-PT_AM/posts
  const [posts, setPosts] = useState([]);
  const [user, setUser] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [price, setPrice] = useState('');

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
    fetch('https://strangers-things.herokuapp.com/api/2209-FTB-ET-WEB-AM/posts')
      .then(response => response.json())
      .then(json => setPosts(json.data.posts));

    exchangeTokenForUser();
  }, []);

  
  const logout = () => {
    window.localStorage.removeItem('token');
    setUser({});
    //setRegisterMessage('');
    //setLoginMessage('');
  }

  const createPost = (ev) => {
    ev.preventDefault();
    const token = window.localStorage.getItem('token');
    console.log(token);
    if(token) {
      fetch('https://strangers-things.herokuapp.com/api/2209-FTB-ET-WEB-AM/posts', {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          post: {
            title: title,
            description: description,
            price: price,
            location: location
          }
        })
      })
      .then(response => response.json())
      .then(result => {
        console.log(result);
      })
      .catch(err => console.log(err));
    }
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
              <Login exchangeTokenForUser={exchangeTokenForUser}/>
            </div>
          ) : null
        }
        {
          user._id ? (
          <form onSubmit={ createPost }>
            <input 
              placeholder=' Listing Title'
              value={ title }
              onChange={ev => setTitle(ev.target.value)}
            />
            <input 
              placeholder=' Description'
              value={ description }
              onChange={ev => setDescription(ev.target.value)}
            />
            <input 
              placeholder=' Location'
              value={ location }
              onChange={ev => setLocation(ev.target.value)}
            />
            <input 
              placeholder=' Price'
              value={ price }
              onChange={ev => setPrice(ev.target.value)}
            />
            <button>Create Post</button>
          </form>
          ) : null
        }
        </div>
        <div id='pages'>
          <Routes>
            <Route path='/posts/:id' element={
              <Post posts={posts} />
            } />
            <Route path='/posts' element={
              <Posts posts={posts} user={user}/>
            } />
            {/* <Route path='/logout' element= {
              <div>Thank you for logging out.</div>
            } /> */}
            <Route path='/' element={<h1>Home</h1>} />
          </Routes>
        </div>
      </div>
    </div>

  );
};
const root = ReactDOM.createRoot(document.querySelector('#root'));
root.render(<HashRouter><App /></HashRouter>);
