import React, { useState } from 'react';
import  { Container } from 'react-bootstrap';

import UserNavi from '../components/UserNavi';
import PriorityList from '../components/PriorityList';
import LoggedInName from '../components/LoggedInName';
import SchedList from '../components/SchedList';

function CanvasPage()
{
    // Priority Task Format:
    // type:"Priority", id:"todo-#", name: "task", completed: T/F
    // Schedule:
    // type:"Schedule", id:"todo-#", name: "task", date: ISO datetime

    // Array of all user tasks
    const list = [];
    
    // state.lists = [[],[]]
    const [state, setState] = useState(
        {
            user: "",
            userId: "",
            lists:splitLists(list)
        });

    // Called with the init. of state and setState to pull + split lists by type
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
