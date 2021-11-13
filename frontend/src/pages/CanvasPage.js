import React, { useState } from 'react';
import  { Container } from 'react-bootstrap';

import UserNavi from '../components/UserNavi';
import PriorityList from '../components/PriorityList';
import LoggedInName from '../components/LoggedInName';
import SchedList from '../components/SchedList';

function CanvasPage()
{
    // temp task lists for testing/rendering (list templates)----- 
    function tempData()
    {
        const curr = new Date();
        let today = curr.toISOString();
        let tomorr = "2021-11-04T17:47";
        let later = "2021-12-04T12:30";
        let nextyear = "2022-04-15T21:10";

        const list =
            [
                { 
                    type: "Priority",
                    id: "priority-0", 
                    name: "Eat", 
                    completed: false
                },
                { 
                    type: "Priority",
                    id: "priority-1", 
                    name: "Sleep", 
                    completed: false
                },
                { 
                    type: "Priority",
                    id: "priority-2", 
                    name: "Repeat", 
                    completed: false
                },
                { 
                    type: "Schedule",
                    id: "todo-0", 
                    name: "Eat",
                    date: nextyear
                },
                { 
                    type: "Schedule",
                    id: "todo-1", 
                    name: "Sleep",
                    date: today
                },
                { 
                    type: "Schedule",
                    id: "todo-2", 
                    name: "Repeat", 
                    date: tomorr

                },
                {
                    type: "Schedule",
                    id: "todo-3",
                    name: "Finish calls",
                    date: later
                },
                {
                    type: "Schedule",
                    id: "todo-4",
                    name: "Appointment",
                    date: nextyear
                }
            ];

        return list;
    }
    // --------------------------------------------
    const [state, setState] = useState(
        {
            user: "",
            userId: "",
            lists:splitLists(tempData())
        });

    // Called with the init. of state and setState to pull lists
   function splitLists(userLists)
   {
       let plist = [];
       let slist = [];
        for(let i = 0; i < userLists.length; i++)
        {
            if(userLists[i].type === 'Priority')
            {
                plist.push(userLists[i]);
            } 
            else 
            {
                slist.push(userLists[i]);
            }
        }
        return [plist, slist];
    };

    // LoggedInName name={state.user}
    return(
        <div id="canvas" className="pageSolid app">
            <UserNavi />
            <div className="canvasBlock">
                <LoggedInName name={state.user}/>
            </div>

            <Container className="cardContainer" >
                <PriorityList name="Priority" tasks={state.lists[0]}/>
                <SchedList name="Schedule" tasks={state.lists[1]}/>
            </Container>
        </div>
    );
}

export default CanvasPage;
