import React, {useRef, useState} from 'react';
import Form from 'react-bootstrap/Form';
import { Link } from 'react-router-dom';
import axios from 'axios';

// fill in completed sign up/add user api path in doSignUp
// complete action for successful user sign up

function SignUp()
{
    var bp = require('./Path.js');
    const [state, setState] = useState(
        {
            first_name: "",
            last_name: "",
            email: "",
            login: "",
            password: "",
            cpassword: ""
        }
    );
    const [message,setMessage] = useState('');
    const signUpResult = useRef(null);
    const first_nameMess = useRef(null);
    const last_nameMess = useRef(null);
    const emailMess = useRef(null);
    const loginMess = useRef(null);
    const passwordMess = useRef(null);
    const cpasswordMess = useRef(null);
    const signup = useRef(null);
    const confirm = useRef(null);

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

        if(state.first_name === "")
        {
            last_nameMess.current.style.display = "none";
            emailMess.current.style.display = "none";
            loginMess.current.style.display = "none";
            passwordMess.current.style.display = "none";
            cpasswordMess.current.style.display = "none";

            setMessage('Please provide your first name.');
            first_nameMess.current.style.display = "inline-block";
            return;

        } 
        else if(state.last_name === "")
        {
            first_nameMess.current.style.display = "none";
            emailMess.current.style.display = "none";
            loginMess.current.style.display = "none";
            passwordMess.current.style.display = "none";
            cpasswordMess.current.style.display = "none";

            setMessage('Please provide your last name.');
            last_nameMess.current.style.display = "inline-block";
            return;
        }
        else if(state.email === "")
        {
            first_nameMess.current.style.display = "none";
            last_nameMess.current.style.display = "none";
            loginMess.current.style.display = "none";
            passwordMess.current.style.display = "none";
            cpasswordMess.current.style.display = "none";

            setMessage('Please provide an email.');
            emailMess.current.style.display = "inline-block";
            return;
        } 
        else if(!(state.email).includes('@') || 
            (state.email[(state.email).length - 4] !== '.' && state.email[(state.email).length - 3] !== '.'))
        {
            first_nameMess.current.style.display = "none";
            last_nameMess.current.style.display = "none";
            loginMess.current.style.display = "none";
            passwordMess.current.style.display = "none";
            cpasswordMess.current.style.display = "none";

            setMessage('Email format is invalid.');
            emailMess.current.style.display = "inline-block";
            return;
        }
        else if(state.login === "")
        {
            first_nameMess.current.style.display = "none";
            last_nameMess.current.style.display = "none";
            emailMess.current.style.display = "none";
            passwordMess.current.style.display = "none";
            cpasswordMess.current.style.display = "none";

            setMessage('Please provide a username with at least 7 characters.');
            loginMess.current.style.display = "inline-block";
            return;
        }
        else if(state.password === "" || (state.password).length < 7)
        {
            first_nameMess.current.style.display = "none";
            last_nameMess.current.style.display = "none";
            emailMess.current.style.display = "none";
            loginMess.current.style.display = "none";
            cpasswordMess.current.style.display = "none";

            setMessage('Please provide a password.');
            passwordMess.current.style.display = "inline-block";
            return;
        }
        else if(state.cpassword === "" || state.cpassword !== state.password)
        {
            first_nameMess.current.style.display = "none";
            last_nameMess.current.style.display = "none";
            emailMess.current.style.display = "none";
            loginMess.current.style.display = "none";
            passwordMess.current.style.display = "none";

            setMessage('Passwords do not match.');
            cpasswordMess.current.style.display = "inline-block";
            return;
        }
        else 
        {
            first_nameMess.current.style.display = "none";
            last_nameMess.current.style.display = "none";
            emailMess.current.style.display = "none";
            loginMess.current.style.display = "none";
            passwordMess.current.style.display = "none";
            cpasswordMess.current.style.display = "none";
            doSignUp(e);
        }

    }

    const doSignUp = async event => 
    {
        var obj = {first: state.first_name,last: state.last_name, email: state.email, username: state.login, password: state.password};
        var js = JSON.stringify(obj);
        var config = 
        {
            method: 'post',
            url: bp.buildPath('api/'),
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
                    setMessage('Error adding user');
                    signUpResult.current.style.display = "inline-block";
                }
                else 
                {
                    signup.current.style.display = "none";
                    setMessage('Check your email for a message to confirm your account.');
                    confirm.current.style.display = "block";


                }
            })
            .catch(function (error) 
            {
                console.log(error);
            });
    }
    return(
        <div id="signUpDiv" className="app">
            <Form ref={signup} id="signUpForm" className="form" onSubmit={handleSubmit}>
                <p id="inner-title">Complete all the fields below to create an account</p>
                <input type="text" id="firstName" name="first_name" className="inFields" placeholder="First Name" value={state.first_name} onChange={handleChange}/>
                <span ref={first_nameMess} style={{display: "none", color: "red"}}>{message}</span>
                <input type="text" id="lastName" name="last_name" className="inFields" placeholder="Last Name" value={state.last_name} onChange={handleChange}/>
                <span ref={last_nameMess} style={{display: "none", color: "red"}}>{message}</span>
                <input type="text" id="email" name="email" className="inFields" placeholder="Email" value={state.email} onChange={handleChange}/>
                <span ref={emailMess} style={{display: "none", color: "red"}}>{message}</span>
                <input type="text" id="login" name="login" className="inFields" placeholder="Username" value={state.login} onChange={handleChange}/>
                <span ref={loginMess} style={{display: "none", color: "red"}}>{message}</span>
                <input type="password" id="password" name="password" className="inFields" placeholder="Password" value={state.password} onChange={handleChange}/>
                <span ref={passwordMess} style={{display: "none", color: "red"}}>{message}</span>
                <input type="password" id="cpassword" name="cpassword" className="inFields" placeholder="Confirm password" value={state.cpassword} onChange={handleChange}/>
                <span ref={cpasswordMess} style={{display: "none", color: "red"}}>{message}</span><br />
                <input type="submit" id="signUpButton"  className="formBtn buttonScheme" value = "Sign Up"/>
                <span id="signUpResult" ref={signUpResult} style={{display: "none", color: "red"}}></span>
                <p>Already have an account? <Link to="/login">Sign In</Link></p>
            </Form>
            <div id="successBlock" ref={confirm}>
                    {message}
            </div>
        </div>
    );
};

export default SignUp;