import React from 'react';

function LoggedInName(props)
{
    
    return(
        <div id="loggedInDiv" className="app">
            <span id="userName">Logged In As {props.name} </span><br />
        </div>
    );
};

export default LoggedInName;
