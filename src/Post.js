import React, { useState } from 'react';
import { Link, useParams} from 'react-router-dom';

const Post = (props) => {
  const {posts, setPosts, user, token } = props;
  const [inquiry, setInquiry] = useState('');
  const id = useParams().id;
  const post = posts.find(post => post._id === id);

  if(!post) {
    return null;
  }
  const deletePost = (id, token) => {
    fetch(`https://strangers-things.herokuapp.com/api/2209-FTB-ET-WEB-AM/posts/${id}`, {
        method: "DELETE",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    })
        .then(response => response.json())
        .then(result => {
          console.log(result);
          const NewPosts = posts.filter(post => post._id !== id)
          setPosts(NewPosts);
        })
        .catch(console.error);
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
    })
    .catch(console.error);
    setInquiry('');
  }
  return (
    <div className='individual-post'>
      <div>
        <h1><Link to='/posts'>{post.title}</Link></h1> 
        <span>
          { user._id === post.author._id ? 
            (<button className="delete-button" 
              onClick={() => {
                deletePost(post._id, token);
              }
            }>Delete</button>):null}
        </span>
        <p>Listed by: {post.author.username} ({post.location})</p>
        <p>Listing Price: {post.price}</p>
        <p>Description: {post.description}</p> 
      </div>
      { user._id ?
      <div> 
        { user._id !== post.author._id ? (
          <div>
            <h3>Send seller a message:</h3>
            <form id='message-form' onSubmit = { sendMessage }>
              <input 
                className="message-input" 
                placeholder = 'Type message here'
                value = { inquiry }
                onChange = {ev => setInquiry(ev.target.value)}
              />
              <button>Send Message</button>
            </form>
          </div>
          ) : null 
        } 
      </div> : null
      }
      { user._id === post.author._id ? (
        <div>
          <h3><Link to='/profile'>Messages ({post.messages.length})</Link></h3>
          <ul>
            {
              post.messages.map(message => {
                return (
                  <li key={message._id}>{message.fromUser.username}: "{message.content}"</li>
                )
              })
            }
          </ul>
        </div>
      ): null}
    </div>
  )
}

export default Post;