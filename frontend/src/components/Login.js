import React, { useRef, useState } from 'react';
import Form from 'react-bootstrap/Form';
import { Link } from 'react-router-dom';
import axios from 'axios';

function Login()
{
    var bp = require('./Path.js');
    var storage = require('../tokenStorage.js');
    var loginName;
    var loginPassword;
    const [message,setMessage] = useState('');
    const usernameMess = useRef(null);
    const userpassMess = useRef(null);

    const doLogin = async event => 
    {
        event.preventDefault();

        var obj = {login:loginName.value,password:loginPassword.value};
        var js = JSON.stringify(obj);
        var config = 
        {
            method: 'post',
            url: bp.buildPath('api/login'),
            headers: 
            {
                'Content-Type': 'application/json'
            },
            data: js
        };
        axios(config)
            .then(function (response) 
        {
            var res = response.data;
            if (res.error) 
            {
                setMessage('User/Password combination incorrect');
            }
            else 
            {
                storage.storeToken(res);
                var jwt = require('jsonwebtoken');

                var ud = jwt.decode(storage.retrieveToken(),{complete:true});
                var userId = ud.payload.userId;
                var firstName = ud.payload.firstName;
                var lastName = ud.payload.lastName;

                var user = {firstName:firstName,lastName:lastName,id:userId}
                localStorage.setItem('user_data', JSON.stringify(user));
                window.location.href = '/canvas';
            }
        })
        .catch(function (error) 
        {
            console.log(error);
        });
    }

    return(
        <div id="loginDiv" className="app">
            <Form id="loginForm" className="form" onSubmit={doLogin}>
                <span id="inner-title">Sign in to your account</span><br />

                <input type="text" id="loginName" className="inFields" placeholder="Username"
                    ref={(c) => loginName = c} />
                <span ref={usernameMess} style={{display: "none", color: "red"}}></span>
                <div id="helpLink">
                    <Link to="/">Forgot password?</Link>
                </div>
                <input type="password" id="loginPassword" className="inFields" 
                    placeholder="Password" ref={(c) => loginPassword = c} /><br />
                <span ref={userpassMess} style={{display: "none", color: "red"}}></span>
                <input type="submit" id="loginButton" className="buttonScheme formBtn" value = "Continue"
                    onClick={doLogin} />
                <span id="loginResult" style={{color: "red"}}>{message}</span><br />
                <p>Don't have an account? <Link to="/signup">Sign Up</Link></p>
            </Form>
        </div>
    );
};

export default Login;
