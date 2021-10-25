import React from 'react';

function LoggedInName()
{

    // var user = {}

    // const doLogout = event =>
    // {
        // event.preventDefault();

        // alert('doLogout');
        // window.location.href = "/";
    // };
    
    return(
    <div id="loggedInDiv" className="app">
        <span id="userName">Logged In As John Doe </span><br />
    </div>
    );
};

export default LoggedInName;
