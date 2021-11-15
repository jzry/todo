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
            fn: "",
            ln: "",
            email: "",
            un: "",
            pw: "",
            cpw: ""
        }
    );
    const [message,setMessage] = useState('');
    const signUpResult = useRef(null);
    const fnMess = useRef(null);
    const lnMess = useRef(null);
    const emailMess = useRef(null);
    const unMess = useRef(null);
    const pwMess = useRef(null);
    const cpwMess = useRef(null);

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

        if(state.fn === "")
        {
            lnMess.current.style.display = "none";
            emailMess.current.style.display = "none";
            unMess.current.style.display = "none";
            pwMess.current.style.display = "none";
            cpwMess.current.style.display = "none";

            setMessage('Please provide your first name.');
            fnMess.current.style.display = "inline-block";
            return;

        } 
        else if(state.ln === "")
        {
            fnMess.current.style.display = "none";
            emailMess.current.style.display = "none";
            unMess.current.style.display = "none";
            pwMess.current.style.display = "none";
            cpwMess.current.style.display = "none";

            setMessage('Please provide your last name.');
            lnMess.current.style.display = "inline-block";
            return;
        }
        else if(state.email === "")
        {
            fnMess.current.style.display = "none";
            lnMess.current.style.display = "none";
            unMess.current.style.display = "none";
            pwMess.current.style.display = "none";
            cpwMess.current.style.display = "none";

            setMessage('Please provide an email.');
            emailMess.current.style.display = "inline-block";
            return;
        }
        else if(state.un === "")
        {
            fnMess.current.style.display = "none";
            lnMess.current.style.display = "none";
            emailMess.current.style.display = "none";
            pwMess.current.style.display = "none";
            cpwMess.current.style.display = "none";

            setMessage('Please provide a username.');
            unMess.current.style.display = "inline-block";
            return;
        }
        else if(state.pw === "")
        {
            fnMess.current.style.display = "none";
            lnMess.current.style.display = "none";
            emailMess.current.style.display = "none";
            unMess.current.style.display = "none";
            cpwMess.current.style.display = "none";

            setMessage('Please provide a password.');
            pwMess.current.style.display = "inline-block";
            return;
        }
        else if(state.cpw === "" || state.cpw !== state.pw)
        {
            fnMess.current.style.display = "none";
            lnMess.current.style.display = "none";
            emailMess.current.style.display = "none";
            unMess.current.style.display = "none";
            pwMess.current.style.display = "none";

            setMessage('Passwords do not match.');
            cpwMess.current.style.display = "inline-block";
            return;
        }
        else 
        {
            fnMess.current.style.display = "none";
            lnMess.current.style.display = "none";
            emailMess.current.style.display = "none";
            unMess.current.style.display = "none";
            pwMess.current.style.display = "none";
            cpwMess.current.style.display = "none";
            doSignUp(e);
        }

    }

    const doSignUp = async event => 
    {
        var obj = {first: state.fn,last: state.ln, email: state.email, username: state.un, password: state.pw};
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

                }
            })
            .catch(function (error) 
            {
                console.log(error);
            });
    }
    return(
        <div id="signUpDiv" className="app">
            <Form id="signUpForm" className="form" onSubmit={handleSubmit}>
                <p id="inner-title">Sign up and create a new account</p>
                <input type="text" id="firstName" name="fn" className="inFields" placeholder="First Name" value={state.fn} onChange={handleChange}/>
                <span ref={fnMess} style={{display: "none", color: "red"}}>{message}</span><br/>
                <input type="text" id="lastName" name="ln" className="inFields" placeholder="Last Name" value={state.ln} onChange={handleChange}/>
                <span ref={lnMess} style={{display: "none", color: "red"}}>{message}</span><br/>
                <input type="text" id="email" name="email" className="inFields" placeholder="Email" value={state.email} onChange={handleChange}/>
                <span ref={emailMess} style={{display: "none", color: "red"}}>{message}</span><br/>
                <input type="text" id="userName" name="un" className="inFields" placeholder="Username" value={state.un} onChange={handleChange}/>
                <span ref={unMess} style={{display: "none", color: "red"}}>{message}</span><br/>
                <input type="password" id="password" name="pw" className="inFields" placeholder="Password" value={state.pw} onChange={handleChange}/>
                <span ref={pwMess} style={{display: "none", color: "red"}}>{message}</span><br/>
                <input type="password" id="cpassword" name="cpw" className="inFields" placeholder="Confirm password" value={state.cpw} onChange={handleChange}/>
                <span ref={cpwMess} style={{display: "none", color: "red"}}>{message}</span><br/>
                <input type="submit" id="signUpButton"  className="formBtn" value = "Sign Up"/>
                <span id="signUpResult" ref={signUpResult} style={{display: "none", color: "red"}}></span><br />
                <p>Already have an account? <Link to="/login">Sign In</Link></p>
            </Form>
        </div>
    );
};

export default SignUp;