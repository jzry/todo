import React, { useRef, useState } from 'react';
import { Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function ForgotForm()
{
    const [email, setEmail] = useState('');
    const [message,setMessage] = useState('');
    const forgotMess = useRef(null);
    const confirm = useRef(null);

    const handleChange = (e) => 
    {
        setEmail(e.target.value);
    }

    function handleSubmit(e)
    {
        e.preventDefault();
        if(email === "")
        {
            setMessage('Please provide an email.');
            forgotMess.current.style.display = "inline-block";
        } 
        else if (!email.includes('@') || (email[(email).length - 4] !== '.' && email[(email).length - 3] !== '.'))
        {
            setMessage('Email format is incorrect.');
            forgotMess.current.style.display = "inline-block";
        }
        else 
        {
            forgotMess.current.style.display = "none";
            confirm.current.style.display = "inline-block";
            setMessage('If we have that email in our records, a message containing a reset link will be sent to that address.');
            // Submit email to update/reset password info.

            //
            setEmail('');
        }
    }

    return(
        <div className="app">
            <Form id="forgotForm" className="form" onSubmit={handleSubmit}>
                <div id="successBlock" ref={confirm}>
                    {message}
                </div>
                <input type="text" id="email" className="inFields" name="email" placeholder="Account email"
                value={email} onChange={handleChange}/>
                <input id="forgotButton" type="submit" value="Send Email" className="buttonScheme formBtn"/>
            </Form>
            <div className="groupSection">
                <span ref={forgotMess} style={{display: "none", color: "red"}}>{message}</span>
                <Link to="/login">Cancel</Link>
            </div>
        </div>
    );
}

export default ForgotForm;