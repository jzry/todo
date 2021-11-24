import React, { useRef, useState } from 'react';
import { Form } from 'react-bootstrap';
import { Link, Redirect } from 'react-router-dom';
import bp from "./Path.js";
import axios from 'axios';

function ResetPassForm()
{
    const params = new URLSearchParams(window.location.search);
    const q = params.get("q");

    const [resetPassword, setResetPassword] = useState(
        {
            newpass: '',
            cnewpass: '',
            success: false
        }
    );
    const [message,setMessage] = useState('');
    const forgotMess = useRef(null);


    if (!q)
        return <Redirect to="/" />

    const handleChange = (e) =>
    {
        setResetPassword(
            {
                ...resetPassword, 
                [e.target.name]: e.target.value
            }
        )
    }

    function handleSubmit(e)
    {
        e.preventDefault();

        if(resetPassword.newpass === "")
        {
            setMessage('Please provide a password.');
            forgotMess.current.style.display = "inline-block";
            return;
        } 
        else if (resetPassword.cnewpass !== resetPassword.newpass)
        {
            setMessage('Passwords do not match.');
            forgotMess.current.style.display = "inline-block";
            return;
        }

        setMessage('');
        forgotMess.current.style.display = "none";
        // submission

        const config = 
        {
            method: 'post',
            url: bp.buildPath('api/users/resetpassword'),
            headers: 
            {
                'Content-Type': 'application/json'
            },
            data: JSON.stringify({ new_password: resetPassword.newpass, reset_link: q })
        };

        axios(config)
            .then((response) => {
                const res = response.data;
                if (!res) {
                    setMessage('No response from the server');
                    forgotMess.current.style.display = "inline-block";
                    return;
                }

                setResetPassword({success: true});
            })
            .catch(function (error)  {
                if (error.response) {
                    setMessage(error.response.data?.error);
                    forgotMess.current.style.display = "inline-block";
                }
            });
    }

    if (resetPassword.success)
        return(
        <div className="app">
            <h1>Password Reset Success</h1>

            <div className="groupSection">
                <span style={{color: "green"}}>Password reset successfully!</span>
                <Link to="/login">Return to login.</Link>
            </div>
        </div>);

    return(
        <div className="app">
            <h1>Reset Password</h1>
            <p>Please enter your new password.</p>
            <Form className="form" onSubmit={handleSubmit}>
                <input type="password" id="newpass" className="inFields" name="newpass" placeholder="New password"
                value={resetPassword.newpass} onChange={handleChange}/>
                <input type="password" id="cnewpass" className="inFields" name="cnewpass" placeholder="Confirm new password"
                value={resetPassword.cnewpass} onChange={handleChange}/>
                <input id="resetButton" type="submit" value="Set password" className="buttonScheme formBtn"/>
            </Form>
            <div className="groupSection">
                <span ref={forgotMess} style={{display: "none", color: "red"}}>{message}</span>
                <Link to="/login">Cancel</Link>
            </div>
        </div>
    );
}

export default ResetPassForm;