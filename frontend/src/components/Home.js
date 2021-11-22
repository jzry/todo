import React from 'react';

import scheduledtasks from '../images/scheduleTasks.png';
import selectedtasks from '../images/selectedTasks.png';

const Home = () => 
(
    <div id="front">
        <div id="homeText">
            <h1 id="tagline1" className="tagline">Organize Yourself </h1>
            <h1 id="tagline2" className="tagline">Better.</h1>
            <h4 className="desc">Set up your schedule, personal reminders, 
                and even customize your calendar; quick and easy.
            </h4>
            <img className="taskImg" id="taskImg1" src={scheduledtasks} alt="Scheduled Tasks" width="30%"/>
            <img className="taskImg" id="taskImg2" src={selectedtasks} alt="Selected Tasks" width="30%"/>
        </div>
    </div>
)

export default Home;