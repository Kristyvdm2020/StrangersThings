import React from 'react';
import { Link } from 'react-router-dom';

const Posts = (props)=> {
  const {posts, user, token} = props;
  

  return (
    <div>
      <h1>Posts</h1>
      <ul>
        {
          posts.map(post => {
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
              <li key={post._id}>
                <Link to={`/posts/${post._id}`}>{post.title}</Link>
                { user._id === post.author._id ? (<button onClick={deletePost}>Delete</button>):null}
              </li>
            )
          })
        }
      </ul>
    </div>
  )
}

export default Posts;