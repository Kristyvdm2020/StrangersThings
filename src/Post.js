import React from 'react';
import { Link, useParams} from 'react-router-dom';


const Post = (props) => {
  const {posts, user, token} = props;
  const id = useParams().id;
  const post = posts.find(post => post._id === id);
  if(!post) {
    return null;
  }
  const deletePost = () => {
    fetch(`https://strangers-things.herokuapp.com/api/2209-FTB-ET-WEB-AM/posts/${post._id}`, {
      method: "DELETE",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    })
    .then(response => response.json())
    .then(result => {
      console.log(result);
    })
    .catch(console.error);
  }

  return (
    <div>
      <h1><Link to='/posts'>{post.title}</Link></h1> 
      <span>
        {user._id === post.author._id ? (<button className="edit-button">Edit</button>) : null}
        { user._id === post.author._id ? (<button className="delete-button" onClick={deletePost}>Delete</button>):null}
      </span>
      <p>Listed by: {post.author.username} ({post.location})</p>
      <p>Listing Price: {post.price}</p>
      <p>Description: {post.description}</p>      
    </div>
  )
}

export default Post;