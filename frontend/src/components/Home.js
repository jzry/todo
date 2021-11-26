import React from 'react';

import img1 from '../images/sampleimg1.png';
import img2 from '../images/sampleimg2.png';

const Home = () => 
(
    <div id="front">
        <div id="homeText">
            <h1 id="tagline1" className="tagline">Organize Yourself </h1>
            <h1 id="tagline2" className="tagline">Better.</h1>
            <h4 className="desc">
                Set up reminders, goals, tasks and more. Quick and easy.
            </h4>
            <img className="taskImg" id="taskImg1" src={img1} alt="All tasks" width="30%"/>
            <img className="taskImg" id="taskImg2" src={img2} alt="Incomplete tasks" width="30%"/>
        </div>
    </div>
)

export default Home;