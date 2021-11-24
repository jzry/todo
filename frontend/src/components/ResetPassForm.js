import React, { useRef, useState } from 'react';
import { Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function ResetPassForm()
{
    const [resetPassword, setResetPassword] = useState(
        {
            newpass: '',
            cnewpass: ''
        }
    );
    const [message,setMessage] = useState('');
    const forgotMess = useRef(null);

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
        } 
        else if (resetPassword.cnewpass !== resetPassword.newpass)
        {
            setMessage('Passwords do not match.');
            forgotMess.current.style.display = "inline-block";
        } 
        else 
        {
            setMessage('');
            forgotMess.current.style.display = "none";
            // submission

        }
    }

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