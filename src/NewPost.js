import React, { useState } from 'react';

const NewPost = (props) => {
    const { token } = props;

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [location, setLocation] = useState('');
    const [price, setPrice] = useState('');

    const createPost = (ev) => {
        ev.preventDefault();
        if (token) {
            fetch('https://strangers-things.herokuapp.com/api/2209-FTB-ET-WEB-AM/posts', {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    post: {
                        title: title,
                        description: description,
                        price: price,
                        location: !location ? '[On Request]' : location,
                    }
                })
            })
                .then(response => response.json())
                .then(result => {
                    console.log(result);
                })
                .catch(err => console.log(err));
            clearForm();
        }
    }
    
    const clearForm = () => {
        setTitle('');
        setDescription('');
        setLocation('');
        setPrice('');
    }
    

    return (
        <form onSubmit={ createPost }>
            <input 
              placeholder=' Listing Title (required)'
              value={ title }
              onChange={ev => setTitle(ev.target.value)}
            />
            <input 
              placeholder=' Description (required)'
              value={ description }
              onChange={ev => setDescription(ev.target.value)}
            />
            <input 
              placeholder=' Price (required)'
              value={ price }
              onChange={ev => setPrice(ev.target.value)}
            />
            <input 
              placeholder=' Location'
              value={ location }
              onChange={ev => setLocation(ev.target.value)}
            />
            <button>Create Post</button>
        </form>
    )
}

export default NewPost;