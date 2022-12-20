import React, { useState } from 'react';

const Register = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    const register = (ev) => {
        ev.preventDefault();
        fetch('https://strangers-things.herokuapp.com/api/2209-FTB-ET-WEB-AM/users/register', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                user: {
                    username: username,
                    password: password
                }
            })
        })
            .then(response => response.json())
            .then(result => {
                //Verifying successful registration & message to user
                if (result.success) {
                    setMessage(result.data.message);
                } else {
                    setMessage(result.error.message);
                    throw result.error;
                }
            })
            .catch(err => console.log(err));
    }


    return (

        <form onSubmit={register}>
            <input
                placeholder=' username'
                value={username}
                onChange={ev => setUsername(ev.target.value)}
            />
            <input
                placeholder=' password'
                value={password}
                onChange={ev => setPassword(ev.target.value)}
            />
            <button>Register</button>
            <p>{message}</p>
        </form>


    );
};

export default Register;