import React from 'react';
import Home from '../components/Home';
import Navigation from '../components/Navigation';

const HomePage = () => 
(
    <div id='home' className="pageSolid">
        <Navigation id="frontnav"/>
        <Home id="landing"/>
    </div>
)

export default HomePage;