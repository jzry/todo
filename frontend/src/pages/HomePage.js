import React from 'react';
import Front from '../components/Front';
import Navigation from '../components/Navigation';


const HomePage = () => 
{
    return(
        <div id='home' className="pageSolid">
            <Navigation id="frontnav"/>
            <Front id="landing"/>
        </div>
    );
}

export default HomePage;