import React, { useState } from 'react';
import  { Button, Container } from 'react-bootstrap'
import { CgAdd } from 'react-icons/cg';

import { nanoid } from 'nanoid';

import UserNavi from '../components/UserNavi';
import LoggedInName from '../components/LoggedInName';
import NewListForm from '../components/NewListForm';
import SchedList from '../components/SchedList';
import PriorityList from '../components/PriorityList';

function CanvasPage()
{
    // var user = JSON.parse(window.localStorage.getItem('user_data'));

    // temp task lists for testing/rendering ----- 
    function tempData(){
        var today = "2021-10-23";
        var tomorr = "2021-10-30";
        var later = "2021-12-17";
        var nextyear = "2022-04-15";

        const list3 = {
            name: "Vacation",
            type: "Schedule",
            id: "slist-2",
            tasks:
            [
                { 
                    id: "todo-99", 
                    name: "Eat", 
                    completed: true, 
                    date: nextyear
                },
                { 
                    id: "todo-100", 
                    name: "Sleep", 
                    completed: false, 
                    date: today
                },
                { 
                    id: "todo-101", 
                    name: "Pack", 
                    completed: false, 
                    date: tomorr

                },
                {
                    id: "todo-102",
                    name: "Weekend Trip",
                    completed: false,
                    date: later
                },
                {
                    id: "todo-103",
                    name: "Return Flight",
                    completed: false,
                    date: nextyear
                }
            ]
        }

        const list2 = 
        {   
            name: "Schedule",
            type: "Schedule",
            id: "slist-1",
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
                    name: "Finish calls",
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
            name: "Priority",
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

        const temp = [list1, list2, list3];
        return temp;
    }
    // --------------------------------------------


    const [showForm, setShowForm] = useState(false);
    
    // Array of listComponents (Schedule and Priority)
    var cardArray = [];

    // Called with the init. of state and setState to pull lists
    function renderLists(lists){
        for(let i = 0; i < lists.length; i++)
        {
            if(lists[i].type === 'Priority')
            {
                cardArray.push(
                    <PriorityList 
                        key={lists[i].id} 
                        id={lists[i].id}
                        name={lists[i].name} 
                        tasks={lists[i].tasks}
                    />);
            } 
            else 
            {
                cardArray.push(
                    <SchedList 
                        key={lists[i].id} 
                        id={lists[i].id}
                        name={lists[i].name} 
                        tasks={lists[i].tasks}
                    />);
            }
        }
        return cardArray;
    }

    const [state, setState] = useState(renderLists(tempData()));

    function addList(name, type)
    {
        var str;
        var listCard;
        if(type === "Priority")
        {
            str = "plist-"+ nanoid();
            listCard = (
                <PriorityList 
                    key={str} 
                    id={str}
                    type={type}
                    name={name}
                    tasks={[]}
                />
            );
        }
        else
        {
            str = "slist-" + nanoid();
            listCard = (
                <SchedList 
                    key={str} 
                    id={str}
                    type={type}
                    name={name}
                    tasks={[]}
                />
            );
        }
        return setState([...state, listCard]);
    }

    // LoggedInName name={user.firstName}
    return(
        <div id="canvas" className="pageSolid app">
            <UserNavi />
            <h1 id="title" className="app">Canvas</h1>
            <LoggedInName name={""}/>
            <Button className="addCard" onClick={() => setShowForm(!showForm)}><CgAdd /></Button>
            <Container className="cardContainer">
                {showForm ? <NewListForm addList={addList}/> : null}
                {state}
            </Container>
        </div>
    );
}

export default CanvasPage;
