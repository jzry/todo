import React, { useState } from 'react';
import Container from 'react-bootstrap/Container'

import UserNavi from '../components/UserNavi';
import LoggedInName from '../components/LoggedInName';
import SchedList from '../components/SchedList';
import PriorityList from '../components/PriorityList';

function CanvasPage()
{
    // var user = JSON.parse(window.localStorage.getItem('user_data'));

    // temp task lists for testing/rendering ----- 
    var today = "2021-10-23";
    var tomorr = "2021-10-26";
    var later = "2021-12-17";
    var nextyear = "2022-04-15";

    const list2 = 
    {   
        name: "",
        type: "SchedList",
        id: "schedlist-1",
        tasks:
        [
            { 
                id: "todo-0", 
                name: "Eat", 
                completed: true, 
                date: nextyear
            },
            { 
                id: "todo-1", 
                name: "Sleep", 
                completed: false, 
                date: today
            },
            { 
                id: "todo-2", 
                name: "Repeat", 
                completed: false, 
                date: tomorr

            },
            {
                id: "todo-3",
                name: "Weekend Trip",
                completed: false,
                date: later
            },
            {
                id: "todo-4",
                name: "Appointment",
                completed: false,
                date: nextyear
            }
        ]
    };

    const list1 =
    {
        name: "",
        type: "PriorityList",
        id: "priorlist-1",
        tasks:
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
    };
    // --------------------------------------------

    // Array of priority and schedule list objects
    const temp = [list1, list2];

    // Array for rendering List Components
    var cardArray = [];

    function renderLists(lists){
        for(let i = 0; i < lists.length; i++){
            if(lists[i].type === 'PriorityList'){
                cardArray.push(<PriorityList key={lists[i].id} name={lists[i].name} tasks={lists[i].tasks}/>);
            } else {
                cardArray.push(<SchedList key={lists[i].id} name={lists[i].name} tasks={lists[i].tasks}/>);
            }
        }
        return cardArray;
    }

    // LoggedInName name={user.firstName}
    return(
        <div id="canvas" className="pageSolid">
            <UserNavi />
            <h1 id="title" className="app">Canvas</h1>
            <LoggedInName name={""}/> 
            <Container className="cardContainer">
                {renderLists(temp)}
            </Container>
        </div>
    );
}

export default CanvasPage;
