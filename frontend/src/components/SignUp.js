import React from 'react';
import Form from 'react-bootstrap/Form';
import {Link} from 'react-router-dom';

function SignUp()
{
    return(
          <div id="signUpDiv" className="App">
            <Form id="signUpForm" className="form">
                <p id="inner-title">Sign up and create a new account</p><br />
                <input type="text" id="firstName" className="inFields" placeholder="First Name" /><br/>
                <input type="text" id="lastName" className="inFields" placeholder="Last Name" /><br/>
                <input type="text" id="email" className="inFields" placeholder="Email" /><br/>
                <input type="text" id="userName" className="inFields" placeholder="Username" /><br/>
                <input type="password" id="password" className="inFields" placeholder="Password" /><br/>
                <input type="submit" id="signUpButton"  className="formBtn" value = "Sign Up"/>
                <span id="signUpResult"></span><br />
                <p>Already have an account? <Link to="/login">Sign In</Link></p>
            </Form>
         </div>
    );
};

export default SignUp;