import React, { useRef, useState } from 'react';
import { Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function ForgotForm()
{
    const [email, setEmail] = useState('');
    const [message,setMessage] = useState('');
    const forgotMess = useRef(null);

    const handleChange = (e) => {
        setEmail(e.target.value);
    }

    function handleSubmit(e){
        e.preventDefault();
        if(email === ""){
            setMessage('Please provide an email');
            forgotMess.current.style.display = "inline-block"
        }

    }

    return(
        <div className="app">
            <Form className="form" onSubmit={handleSubmit}>
                <h1>Reset your password</h1>
                <p>We'll send you an email so that you can reset your password.</p>
                <input type="text" id="email" className="inFields" name="email" placeholder="Account email"
                value={email} onChange={handleChange}/><br/>
                <input type="submit" value="Send Email" className="formBtn"/>
            </Form>
            <span ref={forgotMess} style={{display: "none", color: "red"}}>{message}</span><br />
            <Link to="/login">Cancel</Link>
        </div>
    );
}

export default ForgotForm;