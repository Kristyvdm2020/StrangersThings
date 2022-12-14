import React from 'react';
import { Link, useParams} from 'react-router-dom';


const Post = (props) => {
  const {posts} = props;
  const id = useParams().id;
  const post = posts.find(post => post._id === id);
  if(!post) {
    return null;
  }
  return (
    <div>
      <h1><Link to='/posts'>{post.title}</Link></h1>
      <p>{post.description}</p>
      <p>{post.location}</p>
      <p>{post.price}</p>
    </div>
  )
}

export default Post;