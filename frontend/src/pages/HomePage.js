import React from 'react';
import Front from '../components/Front';
import Navigation from '../components/Navigation';


const HomePage = () => 
{
    return(
        <div id='home' className="page">
            <Navigation id="frontnav"/>
            <Front />
        </div>
    );
}

export default HomePage;