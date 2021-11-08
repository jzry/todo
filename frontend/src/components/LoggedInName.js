import React from 'react';

function LoggedInName(props)
{
    
    return(
        <div id="loggedInDiv" className="app">
            <span id="userWelcome">Welcome, {props.name} </span><br />
        </div>
    );
};

export default LoggedInName;
