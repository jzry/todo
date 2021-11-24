import React, { useState } from 'react';
import  { Container, Button } from 'react-bootstrap';
import { nanoid } from 'nanoid';
import {CgAdd} from 'react-icons/cg'

import PriorityList from '../components/PriorityList';
import LoggedInName from '../components/LoggedInName';
import NewListForm from '../components/NewListForm';

// Force Update Page when called
function useForceUpdate()
{
    const [value, setValue] = useState(0);
    return () => setValue(value => value + 1); 
}


function CanvasPage(props)
{
    // Lists 
    // userId: ####
    // title: list name
    // body: array of tasks

    const l1 = [
        {
            title: 'Priority List',
            id: `list-${nanoid()}`,
            body: 
            [
                
                { 
                    id: "todo-0", 
                    name: "Eat", 
                    completed: false
                },
                { 
                    id: "todo-1", 
                    name: "Sleep", 
                    completed: false
                },
                { 
                    id: "todo-2", 
                    name: "Repeat", 
                    completed: false
                }
            ]
        }, 
        {
            title: 'Groceries',
            id: `list-${nanoid()}`,
            body: 
            [
                
                { 
                    id: "todo-3", 
                    name: "Bananas", 
                    completed: false
                },
                { 
                    id: "todo-4", 
                    name: "Tea", 
                    completed: false
                },
                { 
                    id: "todo-5", 
                    name: "Beef", 
                    completed: false
                }
            ]
        }
    ];

    const forceUpdate = useForceUpdate();
    const [state, setState] = useState("");
    const  [lists, setLists] = useState(l1);

    const [showForm, setShowForm] = useState(false);

    // Called with the init. of state and setState to pull + split lists by type
    const listArr = lists
        .map(list => (
            <PriorityList 
                name={list.title}
                id={list.id}
                key={list.id}
                tasks={list.body}
                editList={editList}
                deleteList={deleteList}
            />
        ));

    function addList(title)
    {
        let str;
        let listCard;

        str = `todo-${nanoid()}`;
        listCard = 
        {
            title: title,
            id: str,
            body: []
        }
        setShowForm(!showForm);
        return setLists([...lists, listCard]);
    }

    function editList(id, title)
    {
        let updatedList = lists;

        for(let i = 0; i < updatedList.length; i++)
        {
            if(updatedList[i].id === id)
            {
                if(!title)
                {
                    title = updatedList[i].title;
                }
                updatedList[i].title = title;
            }
        }
        setLists(updatedList);
        forceUpdate();
    }

    function deleteList(id)
    {
        let remainingLists = lists;
        let index = -1;

        for(let i = 0; i < lists.length; i++)
        {
            if(lists[i].id === id)
            {  
                index = i;
                break;
            }
        }

        if(index > -1)
        {
            remainingLists.splice(index, 1);
        }

        setLists(remainingLists);
        forceUpdate();
    }

    // LoggedInName name={state.user}
    return(
        <div id="canvas" className="pageSolid app">
            <div className="canvasBlock">
                <Button className="addCard" onClick={() => setShowForm(!showForm)}>
                    <CgAdd className="addicon"/>
                </Button>
                <LoggedInName name={state}/>
            </div>
            <Container className="cardContainer" >
                {showForm ? <NewListForm addList={addList}/> : null}
                {listArr}
            </Container>
        </div>
    );
}

export default CanvasPage;
