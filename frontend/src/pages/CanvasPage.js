import React, { useState, useEffect } from 'react';
import  { Container, Button } from 'react-bootstrap';
import {CgAdd} from 'react-icons/cg'
import axios from 'axios';

import PriorityList from '../components/PriorityList';
import LoggedInName from '../components/LoggedInName';
import NewListForm from '../components/NewListForm';

import bp from "../components/Path.js";

function readLists() {
    return new Promise((resolve, reject) => {
        let pulledLists = [];

        const obj = {
            search: "",
            token: localStorage.getItem("token_data")
        };

        const config = {
            method: "post",
            url: bp.buildPath("api/lists/read"),
            headers: {
                "Content-Type": "application/json"
            },
            data: obj
        };
        axios(config)
            .then(function (response) {
                const res = response.data;
                if (res.error)  {
                    // setMessage('Error adding list');
                    // addRes.current.style.display = "inline-block";
                    console.error(res.error);
                    return;
                }


                for (const list of response.data) {
                    pulledLists.push({
                        id: list.id,
                        key: list.id,
                        title: list.title,
                        body: list.list
                    });
                }
                resolve(pulledLists);
            })
            .catch(function (error)  {
                if (error.response) {
                    // setMessage(error.response.data?.error);
                    // .current.style.display = "inline-block";
                    
                    console.error(error.response);
                    return;
                }
            });
    });
}

// Force Update Page when called
function useForceUpdate() {
    const [value, setValue] = useState(0);
    return () => setValue(value => value + 1); 
}

function CanvasPage(props) {

    // Lists 
    // userId: ####
    // title: list name
    // body: array of tasks
    const user = JSON.parse(localStorage.getItem('user_data'));
    const firstName = user.firstName;
    const lastName = user.lastName;

    const forceUpdate = useForceUpdate();
    const [state, setState] = useState(`${firstName} ${lastName}`);
    const  [lists, setLists] = useState([]);
    const [showForm, setShowForm] = useState(false);

    useEffect(() => {
        readLists().then(setLists)
     }, []);
    // readLists().then(setLists);

    // Called with the init. of state and setState to pull + split lists by type
    const listArr = lists.map(list => (
            <PriorityList 
                name={list.title}
                id={list.id}
                key={list.key}
                tasks={list.body}
                editList={editList}
                deleteList={deleteList}
            />
        ));

    function addList(title) {
        const obj = {
            title: title,
            list: [],
            token: localStorage.getItem("token_data")
        };

        const config = {
            method: "post",
            url: bp.buildPath("api/lists/create"),
            headers: {
                "Content-Type": "application/json"
            },
            data: JSON.stringify(obj)
        };

        axios(config)
            .then(function (response) 
            {
                const res = response.data;
                if (res.error)  {
                    // setMessage('Error adding list');
                    // addRes.current.style.display = "inline-block";
                    console.error(res.error);
                }

                else {
                    const listCard = {
                        title: title,
                        id: res.id,
                        body: []
                    };

                    setShowForm(!showForm);
                    return setLists([...lists, listCard]);
                }
            })
            .catch(function (error)  {
                if (error.response) {
                    // setMessage(error.response.data?.error);
                    // .current.style.display = "inline-block";
                    console.error(error.response);
                }
            });
    }

    function editList(id, title) {

        let updatedList = lists;

        for(let i = 0; i < updatedList.length; i++) {
            if(updatedList[i].id === id) {
                if(!title) {
                    title = updatedList[i].title;
                }
                updatedList[i].title = title;
            }
        }

        setLists(updatedList);
        forceUpdate();
    }

    function deleteList(id) {
        const config = {
            method: "post",
            url: bp.buildPath("api/lists/delete"),
            headers: {
                "Content-Type": "application/json"
            },
            data: {
                token: localStorage.getItem("token_data"),
                id: id
            }
        };

        axios(config)
            .then(function (response) 
            {
                const res = response.data;
                if (res.error)  {
                    // setMessage('Error adding list');
                    // addRes.current.style.display = "inline-block";
                    console.error(res.error);
                    return;
                }

                setLists(lists.filter(list => list.id !== id));
                forceUpdate();
            })
            .catch(function (error)  {
                if (error.response) {
                    // setMessage(error.response.data?.error);
                    // .current.style.display = "inline-block";
                    console.error(error.response);
                }
            });
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
