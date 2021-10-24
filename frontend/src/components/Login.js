import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import {Link} from 'react-router-dom';

function Login()
{
  var loginName;
  var loginPassword;

  const app_name = 'cop4331-test123'
  function buildPath(route)
  {
    if (process.env.NODE_ENV === 'production') 
    {
        return 'https://' + app_name +  '.herokuapp.com/' + route;
    }
    else
    {        
        return 'http://localhost:5000/' + route;
    }
}

  const [message,setMessage] = useState('');

  const doLogin = async event =>
  {
    event.preventDefault();

    var obj = {login:loginName.value,password:loginPassword.value};
    var js = JSON.stringify(obj);
    try        
    {                
      const response = await fetch(buildPath('api/login'),                
      {method:'POST',body:js,headers:{'Content-Type': 'application/json'}});            
      var res = JSON.parse(await response.text());            
      if( res.id <= 0 )            
      {                
        setMessage('User/Password combination incorrect');            
      }            
      else            
      {                
        var user = {firstName:res.firstName,lastName:res.lastName,id:res.id}                
        localStorage.setItem('user_data', JSON.stringify(user));                
        setMessage('');                
        window.location.href = '/cards';            
      }        
    }        
    catch(e)        
    {            
      alert(e.toString());            
      return;        
    }        
  };

    return(
      <div id="loginDiv" className="app">
        <Form id="loginForm" className="form" onSubmit={doLogin}>
          <span id="inner-title">Sign in to your account</span><br />
          <input type="text" id="loginName" className="inFields" placeholder="Username"
            ref={(c) => loginName = c} /><br/>
          <input type="password" id="loginPassword" className="inFields" placeholder="Password"
            ref={(c) => loginPassword = c} /><br/>
          <input type="submit" id="loginButton" className="formBtn" value = "Continue"
            onClick={doLogin} />
          <span id="loginResult">{message}</span>
          <p>Don't have an account? <Link to="/signup">Sign Up</Link></p>
        </Form>
     </div>
    );
};

export default Login;
