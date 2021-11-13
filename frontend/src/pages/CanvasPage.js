import React, { useState } from 'react';
import  { Button, Container } from 'react-bootstrap';
import { CgAdd } from 'react-icons/cg';

import { nanoid } from 'nanoid';

import UserNavi from '../components/UserNavi';
import LoggedInName from '../components/LoggedInName';
import NewListForm from '../components/NewListForm';
import SchedList from '../components/SchedList';
import PriorityList from '../components/PriorityList';

// Force Update Page when called
function useForceUpdate()
{
    const [value, setValue] = useState(0);
    return () => setValue(value => value + 1); 
}

function CanvasPage()
{
    const forceUpdate = useForceUpdate();

    // temp task lists for testing/rendering (list templates)----- 
    function tempData()
    {
        const curr = new Date();
        let today = curr.toISOString();
        let tomorr = "2021-11-04T17:47";
        let later = "2021-12-04T12:30";
        let nextyear = "2022-04-15T21:10";

        const list2 = 
        {   
            name: "Schedule Name",
            type: "Schedule",
            id: "slist-1",
            tasks:
            [
                { 
                    id: "todo-0", 
                    name: "Eat",
                    date: nextyear
                },
                { 
                    id: "todo-1", 
                    name: "Sleep",
                    date: today
                },
                { 
                    id: "todo-2", 
                    name: "Repeat", 
                    date: tomorr

                },
                {
                    id: "todo-3",
                    name: "Finish calls",
                    date: later
                },
                {
                    id: "todo-4",
                    name: "Appointment",
                    date: nextyear
                }
            ]
        };

        const list1 =
        {
            name: "Priority Name",
            type: "Priority",
            id: "plist-1",
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

        const temp = [list1, list2];
        return temp;
    }
    // --------------------------------------------


    const [showForm, setShowForm] = useState(false);
    const [state, setState] = useState(tempData());
    
    // Array of listComponents (Schedule and Priority)
    let cardArray = [];

    // Called with the init. of state and setState to pull lists
   function renderLists(state)
   {
        for(let i = 0; i < state.length; i++)
        {
            if(state[i].type === 'Priority')
            {
                cardArray.push(
                    <PriorityList 
                        key={state[i].id}
                        id={state[i].id}
                        name={state[i].name}
                        editList={editList}
                        tasks={state[i].tasks}
                        deleteList={deleteList}
                    />
                );
            } 
            else 
            {
                cardArray.push(
                    <SchedList 
                        key={state[i].id} 
                        id={state[i].id}
                        name={state[i].name}
                        editList={editList}
                        tasks={state[i].tasks}
                        deleteList={deleteList}
                    />
                );
            }
        }
        return cardArray;
    };

    function addList(name, type)
    {
        let str;
        let listCard;

        console.log(type);
        
        if(type === "Priority")
        {
            str = `plist-${nanoid()}`;
            listCard = 
            {
                key: str,
                id: str,
                type: type,
                name: name,
                tasks: []
            }
        }
        else
        {
            str = `slist-${nanoid()}`;
            listCard = 
            {
                key: str,
                id: str,
                type: type,
                name: name,
                tasks: []
            }
        }
        return setState([...state, listCard]);
    }

    function editList(id, name)
    {
        let updatedList = state;

        for(let i = 0; i < updatedList.length; i++)
        {
            if(updatedList[i].id === id)
            {
                if(!name)
                {
                    name = updatedList[i].name;
                }
                updatedList[i].name = name;
            }
        }
        setState(updatedList);
        forceUpdate();
    }

    function deleteList(id)
    {
        let remainingLists = state;
        let index;

        for(let i = 0; i < state.length; i++)
        {
            if(state[i].id === id)
            {  
                index = i;
                break;
            }
        }

        if(index > -1)
        {
            remainingLists.splice(index, 1);
        }

        setState(remainingLists);
        forceUpdate();
    }

    // LoggedInName name={user.firstName}
    return(
        <div id="canvas" className="pageSolid app">
            <UserNavi />
            <div className="canvasBlock">
                <LoggedInName name={"Name"}/>
                <Button className="addCard" onClick={() => setShowForm(!showForm)}>
                    <CgAdd />
                </Button>
            </div>

            <Container className="cardContainer" >
                {showForm ? <NewListForm addList={addList}/> : null}
                {renderLists(state)}
            </Container>
        </div>
    );
}

export default CanvasPage;
