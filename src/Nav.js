import React from 'react';
import { Link, useLocation } from 'react-router-dom';


const Nav = (props) => {
  const { posts, user, logout } = props;
  const location = useLocation();
  const pathname = location.pathname;
  
  return  (
    <nav>
        <Link to='/' className={pathname === '/' ? 'selected' : ''}>Home</Link>
        <Link to='/posts'className={pathname.startsWith('/posts') ? 'selected' : ''}>Posts ({posts.length})</Link>
        { user._id ? <button onClick={ logout }>Logout</button> : null }
        {/* { user._id ? <Link to='/logout'><button onClick={ logout }>Logout</button></Link>: null }*/}
        
    </nav>
  );
}

export default Nav;