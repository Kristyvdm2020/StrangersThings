import ReactDOM from 'react-dom/client';
import React, { useState, useEffect } from 'react';
import { HashRouter, Routes, Route, Link, useParams} from 'react-router-dom';
import Posts from './Posts';
import Post from './Post';

const App = ()=> {
  //https://strangers-things.herokuapp.com/api/
  //https://strangers-things.herokuapp.com/api/2209-FTB-WEB-PT_AM/posts
  const [posts, setPosts] = useState([]);

  useEffect(()=>{
    fetch('https://strangers-things.herokuapp.com/api/2209-FTB-WEB-PT_AM/posts')
      .then(response => response.json())
      .then(json => setPosts(json.data.posts));
  }, []);

  return (
    <div>
      <h1>Stranger's Things</h1>
      <nav>
        <Link to='/'>Home</Link>
        <Link to='/posts'>Posts ({posts.length})</Link>
      </nav>
      <Routes>
        <Route path='/posts/:id' element={
          <Post posts={posts} />
        } />
        <Route path='/posts' element= {
          <Posts posts={posts}/>
        } />
        <Route path='/' element= { <div>Home</div>}/>
      </Routes> 
    </div>

  );
};
const root = ReactDOM.createRoot(document.querySelector('#root'));
root.render(<HashRouter><App /></HashRouter>);
