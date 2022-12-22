import React, { useState } from 'react';
import { Link, useParams} from 'react-router-dom';
import { deletePost } from './api/';

const Post = (props) => {
  const {posts, user, token} = props;
  const [inquiry, setInquiry] = useState('');
  const [messages, setMessages] = useState([]);
  const id = useParams().id;
  const post = posts.find(post => post._id === id);
  if(!post) {
    return null;
  }
  const sendMessage = (ev) => {
    ev.preventDefault();
    fetch(`https://strangers-things.herokuapp.com/api/2209-FTB-ET-WEB-AM/posts/${id}/messages`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        message: {
          content: inquiry
        }
      })
    })
    .then(response => response.json())
    .then(result => {
      console.log(result);
      setMessages(result.data.message);
    })
    .catch(console.error);
  }
  return (
    <div>
      <div>
        <h1><Link to='/posts'>{post.title}</Link></h1> 
        <span>
          {user._id === post.author._id ? (<button className="edit-button">Edit</button>) : null}
          { user._id === post.author._id ? (<button className="delete-button" onClick={() => deletePost(post._id, token)}>Delete</button>):null}
        </span>
        <p>Listed by: {post.author.username} ({post.location})</p>
        <p>Listing Price: {post.price}</p>
        <p>Description: {post.description}</p> 
        <p>{post.message}</p>
      </div>
      <div>
        <h3>Send seller a message: </h3>
        <form id='message-form' onSubmit = {() => sendMessage }>
          <input 
            className="message-input" 
            placeholder = 'Type message here'
            value = { inquiry }
            onChange = {ev => setInquiry(ev.target.value)}
          />
          <button>Send Message</button>
        </form>
        <ul>
          {
            messages.map(message => {
              return (
                <li>{message}</li>
              )
            })
          }
        </ul>
      </div>    
    </div>
  )
}

export default Post;