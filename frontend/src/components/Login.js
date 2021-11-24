import React, { useRef, useState } from 'react';
import Form from 'react-bootstrap/Form';
import { Link } from 'react-router-dom';
import axios from 'axios';
import bp from "./Path.js";
import storage from "../tokenStorage.js";

function Login(props)
{
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
            url: bp.buildPath('api/users/login'),
            headers: 
            {
                'Content-Type': 'application/json'
            },
            data: js
        };
        axios(config)
            .then((response) => {
                const res = response.data;
                if (!res) {
                    setMessage('No response from the server');
                    loginRes.current.style.display = "inline-block";
                    return;
                }

                storage.storeToken(res.token);

                const firstName = res.first_name;
                const lastName = res.last_name;

                const user = {firstName:firstName,lastName:lastName}
                localStorage.setItem('user_data', JSON.stringify(user));
                props.onLogin(true);
                window.location.href = '/canvas';
            })
            .catch(function (error)  {
                if (error.response) {
                    setMessage(error.response.data?.error);
                    loginRes.current.style.display = "inline-block";
                }
            });
    }


    return(
        <div id="loginDiv" className="app">
            <p id="inner-title">Sign in to your account</p>
            <Form id="loginForm" className="form iconBox" onSubmit={handleSubmit}>
                <div className="groupSection">
                    <input type="text" id="loginName" className="inFields" name="loginName" placeholder="Username"
                        value={state.loginName} ref={un} onChange={handleChange}/>
                    <span ref={usernameMess} style={{display: "none", color: "red"}}>{message}</span>
                </div>
                <div className="groupSection">
                    <div id="helpLink">
                        <Link to="/forgot">Forgot password?</Link>
                    </div>
                    <input type="password" id="loginPassword" name="loginPassword" className="inFields" 
                        placeholder="Password" value={state.loginPassword} ref={pw} onChange={handleChange}/>
                    <span ref={userpassMess} style={{display: "none", color: "red"}}>{message}</span>
                </div>
                <div className="groupSection">
                    <input type="submit" id="loginButton" className="buttonScheme formBtn" value = "Continue" />
                    <span id="loginResult" ref={loginRes} style={{display: "none", color: "red"}}>{message}</span>
                </div>
                <p>Don't have an account? <Link to="/signup">Sign Up</Link></p>

            </Form>
        </div>
    );
}

export default Login;
