import React, { useState } from 'react';
import Container from 'react-bootstrap/Container'

import UserNavi from '../components/UserNavi';
import PageTitle from '../components/PageTitle';
import LoggedInName from '../components/LoggedInName';
import SchedList from '../components/SchedList';
import PriorityList from '../components/PriorityList';

// After user login fetch lists based on user id and list number/order
function CanvasPage(props)
{
     // temp time handling
    var today = "2021-10-23";
    var tomorr = "2021-10-26";
    var later = "2021-12-17";
    var nextyear = "2022-4-15";
    
    // Scheduling Tasks
    // may need list id (in the case of multiples) 
    // and user id to associate lists with users
    const sched = 
    [
        { 
            id: "todo-0", 
            name: "Eat", 
            completed: true, 
            date: today, 
            time: "0:00" 
        },
        { 
            id: "todo-1", 
            name: "Sleep", 
            completed: false, 
            date: today, 
            time: "21:00" 
        },
        { 
            id: "todo-2", 
            name: "Repeat", 
            completed: false, 
            date: tomorr, 
            time: "00:00"

        },
        {
            id: "todo-3",
            name: "Weekend Trip",
            completed: false,
            date: later, 
            time: "6:45"
        },
        {
            id: "todo-4",
            name: "Appointment",
            completed: false,
            date: nextyear,
            time: "16:15"
        }
    ];

    const tasks =
    [
        
        { 
            id: "priority-0", 
            name: "Eat", 
            completed: false
        },
        { 
            id: "priority-1", 
            name: "Sleep", 
            completed: false
        },
        { 
            id: "priority-2", 
            name: "Repeat", 
            completed: false
        }
    ]

    
    // Scheduling Tasks
    // may need list id (in the case of multiples) 
    // and user id to associate lists with users


    return(
        <div id="canvas" className="pageSolid">
            <UserNavi />
            <h1 id="title" className="app">Canvas</h1>
            <LoggedInName name={(props.firstName + " "+ props.lastName)}/>
            <Container className="cardContainer">
                <PriorityList tasks={tasks}/>
                <SchedList tasks={sched}/>
            </Container>
        </div>
    );
}

export default CanvasPage;
