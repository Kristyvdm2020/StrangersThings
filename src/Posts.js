import React from 'react';
import { Link } from 'react-router-dom';

const Posts = (props)=> {
  const {posts, user} = props;
  return (
    <div>
      <h1>Posts</h1>
      <ul>
        {
          posts.map(post => {
            return (
              <li key={post._id}>
                <Link to={`/posts/${post._id}`}>{post.title}</Link>
                { user._id === post.author._id ? (<button>Delete</button>):null}
              </li>
            )
          })
        }
      </ul>
    </div>
  )
}

export default Posts;