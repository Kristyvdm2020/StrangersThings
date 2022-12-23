import React from 'react';
import { Link } from 'react-router-dom';
import { deletePost } from './api/';

const Posts = (props)=> {
  const {posts, user, token } = props;
  

  return (
    <div id='posts-collection'>
      <h1>Posts</h1>
      <ul id='posts'>
        {
          posts.map(post => {
              
            return (
              <li key={post._id}>
                <Link to={`/posts/${post._id}`}>{post.title} ({post.price})</Link>
                { user._id === post.author._id ? (<button className="delete-button" onClick={() => {deletePost(post._id, token)}}>Delete</button>):null}
              </li>
            )
          })
        }
      </ul>
    </div>
  )
}

export default Posts;