import React from 'react';
import Container from 'react-bootstrap/Container'

import UserNavi from '../components/UserNavi';
import PageTitle from '../components/PageTitle';
import LoggedInName from '../components/LoggedInName';
import CardUI from '../components/CardUI';
import SchedList from '../components/SchedList';

import add from '../addButton.svg'
import PriorityList from '../components/PriorityList';

const CanvasPage = () =>
{
    // temp time handling
    var today = "2021-10-23"
    var tomorr = "2021-10-24"
    
    const sched = [
        { 
            id: "todo-0", 
            name: "Eat", 
            completed: true, 
            date: today 
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
        }
    ];

    const tasks = [
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
    ];

    return(
        <div id="canvas" className="pageSolid">
            <UserNavi />
            <PageTitle />
            <LoggedInName />
            <img id="addButton" src={add} alt="addButton" />
            <Container fluid className="cardContainer">
                <CardUI />
                <PriorityList tasks={tasks} />
                <SchedList tasks={sched} />
            </Container>
        </div>
    );
}

export default CanvasPage;
