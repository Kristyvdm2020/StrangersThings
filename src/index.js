import ReactDOM from 'react-dom/client';
import React, { useState, useEffect } from 'react';
import { HashRouter, Routes, Route, Link} from 'react-router-dom';


const App = ()=> {
  return (
    <div>
      <h1>React Client Template</h1>
      <nav>
        <Link to='/'>Home</Link>
      </nav>
      <Routes>
        <Route path='/' element= { <div>Home</div>}/>} />
      </Routes> 
    </div>

  );
};
const root = ReactDOM.createRoot(document.querySelector('#root'));
root.render(<HashRouter><App /></HashRouter>);
