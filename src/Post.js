import React from 'react';
import { Link, useParams} from 'react-router-dom';


const Post = (props) => {
  const {posts} = props;
  const id = useParams().id;
  const post = posts.find(post => post._id === id);
  console.log(post);
  if(!post) {
    return null;
  }
  return (
    <div>
      <h1><Link to='/posts'>{post.title}</Link></h1>
      <p>Listed by: {post.author.username}</p>
      <p>Location: {post.location}</p>
      <p>Listing Price: {post.price}</p>
      <p>Description: {post.description}</p>
      
      
    </div>
  )
}

export default Post;