import React, { useRef, useState } from 'react';
import Form from 'react-bootstrap/Form';
import { Link } from 'react-router-dom';
import axios from 'axios';

function Login()
{
    var bp = require('./Path.js');
    var storage = require('../tokenStorage.js');
    const [state, setState] = useState(
        {
            loginName: "",
            loginPassword: ""
        }
    );
    const [message,setMessage] = useState('');
    const un = useRef(null);
    const pw = useRef(null);
    const loginRes = useRef(null);
    const usernameMess = useRef(null);
    const userpassMess = useRef(null);

    const handleChange = (e) =>
    {
        setState(
            {
                ...state, 
                [e.target.name]: e.target.value
            }
        )
    }

    function handleSubmit(e)
    {
        e.preventDefault();

        if(state.loginName === "")
        {
            userpassMess.current.style.display = "none";
            setMessage('Please provide a username');
            usernameMess.current.style.display = "inline-block";
            un.current.focus();
            return;

        } else if(state.loginPassword === "")
        {
            usernameMess.current.style.display = "none";

            setMessage('Please provide a password');
            userpassMess.current.style.display = "inline-block";
            pw.current.focus();
            return;
        }
        else 
        {
            usernameMess.current.style.display = "none";
            userpassMess.current.style.display = "none";
            doLogin(e);
        }

    }

    const doLogin = async event => 
    {
        var obj = {login:state.loginName,password:state.loginPassword};
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
                    loginRes.current.style.display = "inline-block";
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
            <Form id="loginForm" className="form" onSubmit={handleSubmit}>
                <span id="inner-title">Sign in to your account</span><br />
                <input type="text" id="loginName" className="inFields" name="loginName" placeholder="Username"
                    value={state.loginName} ref={un} onChange={handleChange}/>
                <span ref={usernameMess} style={{display: "none", color: "red"}}>{message}</span>
                <div id="helpLink">
                    <Link to="/forgot">Forgot password?</Link>
                </div>
                <input type="password" id="loginPassword" name="loginPassword" className="inFields" 
                    placeholder="Password" value={state.loginPassword} ref={pw} onChange={handleChange}/><br />
                <span ref={userpassMess} style={{display: "none", color: "red"}}>{message}</span>
                <input type="submit" id="loginButton" className="buttonScheme formBtn" value = "Continue" />
                <span id="loginResult" ref={loginRes} style={{display: "none", color: "red"}}>{message}</span><br />
                <p>Don't have an account? <Link to="/signup">Sign Up</Link></p>
            </Form>
        </div>
    );
}

export default Login;
