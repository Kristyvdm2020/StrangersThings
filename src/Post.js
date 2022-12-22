import React from 'react';
import { Link, useParams} from 'react-router-dom';
import { deletePost } from './api/';


const Post = (props) => {
  const {posts, user, token} = props;
  const id = useParams().id;
  const post = posts.find(post => post._id === id);
  if(!post) {
    return null;
  }
  
  return (
    <div>
      <h1><Link to='/posts'>{post.title}</Link></h1> 
      <span>
        {user._id === post.author._id ? (<button className="edit-button">Edit</button>) : null}
        { user._id === post.author._id ? (<button className="delete-button" onClick={() => deletePost(post._id, token)}>Delete</button>):null}
      </span>
      <p>Listed by: {post.author.username} ({post.location})</p>
      <p>Listing Price: {post.price}</p>
      <p>Description: {post.description}</p>      
    </div>
  )
}

export default Post;