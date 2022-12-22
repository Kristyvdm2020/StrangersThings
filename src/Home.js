import React from 'react';
import { Link } from 'react-router-dom';


const Home = (props) => {
    const { user, messages, myPosts } = props;

    return (
        <div>
            {user._id ?
                (<div>
                    <h1>Messages ({messages.length})</h1>
                    <ul>
                        {
                            messages.map((message, idx) => {
                                return (
                                    <li key={idx}>{message.content}</li>
                                )
                            })
                        }
                    </ul>
                    <h1>My Posts ({myPosts.length})</h1>
                    <ul>
                        {
                            myPosts.map(post => {
                                return (post.active ? (
                                    <li key={post._id}><Link to={`/posts/${post._id}`}>{post.title}</Link></li>) : null
                                )
                            })
                        }
                    </ul>
                </div>
                ) : 
                (<div>
                    <h1>Welcome to Stranger's Things!</h1>
                    <p>Please login to start your journey.</p>
                </div>)}
        </div>
    )
};

export default Home;