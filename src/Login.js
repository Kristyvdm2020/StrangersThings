import React, { useState } from 'react';

const Login = (props) => {
    const { exchangeTokenForUser } = props;
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    const login = (ev) => {
        ev.preventDefault();
        fetch('https://strangers-things.herokuapp.com/api/2209-FTB-ET-WEB-AM/users/login', {
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
                //Verifying successful login & message to user
                if (result.success) {
                    setMessage(result.data.message);
                } else {
                    setMessage(result.error.message);
                    throw result.error;
                }
                //Get the token
                const token = result.data.token;
                window.localStorage.setItem('token', token);
                exchangeTokenForUser();
            })
            .catch(err => console.log(err));
    }


    return (
        <form onSubmit={login}>
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
            <button>Login</button>
            <p>{message}</p>
        </form>
    );
};

export default Login;