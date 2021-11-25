import React, { useEffect, useRef, useState } from 'react';
import { Button, Card, ListGroup } from 'react-bootstrap';

import axios from 'axios';

import Task from './Task';
import FilterButtons from './FilterButtons';
import NewTaskForm from './NewTaskForm';
import ButtonIcons from './ButtonIcons';
import bp from "./Path.js";

function usePrevious(value) {
    const ref = useRef();
    useEffect(() => {
        ref.current = value;
    });
    return ref.current;
};

function ToDoList(props) {

    const [tasks, setTasks] = useState(props.tasks);
    const [filter, setFilter] = useState('All');
    const [message, setMessage] = useState('');

    const [name, setName] = useState(props.name);
    const [isEditing, setEditing] = useState(false);
    const editFieldRef = useRef(null);
    const editButtonRef = useRef(null);
    const wasEditing = usePrevious(isEditing);

    const addRes = useRef(null);

    const handleChange = (e) => {
        setName(e.target.value);
    }

    // Filter names and conditions
    const FILTER_MAP = {
        All: () => true,
        Unfinished: task => task.completed === false,
        Completed: task => task.completed
    };

    const FILTER_NAMES = Object.keys(FILTER_MAP);


    // Toggle for filter/browser to unify state
    function toggleTaskCompleted(id) {
        let completed = false;
        const updatedTasks = tasks.map(task => {

            if (id === task.id) {
                completed = !task.completed;
                return { ...task, completed: !task.completed }
            }

            return task;
        });
        
        const config = {
            method: 'post',
            url: bp.buildPath(`api/lists/${props.id}/update/${id}`),
            headers:
            {
                'Content-Type': 'application/json'
            },
            data: {
                token: localStorage.getItem("token_data"),
                completed: completed
            }
        };

        axios(config)
            .then(function (response) {
                var res = response.data;
                if (res.error) {
                    setMessage('Error editing task');
                    addRes.current.style.display = "inline-block";
                    return;
                }

                setTasks(updatedTasks);
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    // For rendering desired number of tasks based on task props
    const taskList = tasks
        .filter(FILTER_MAP[filter])
        .map(task => (
            <Task
                id={task.id}
                name={task.text}
                completed={task.completed}
                key={task.id}
                toggleTaskCompleted={toggleTaskCompleted}
                deleteTask={deleteTask}
                editTask={editTask}
            />
        ));

    // For rendering desired number of filter buttons by name and condition
    const filterList = FILTER_NAMES.map(name => (
        <FilterButtons
            key={name}
            name={name}
            isPressed={name === filter}
            setFilter={setFilter}
        />
    ));

    function addTask(name) {
        const config = {
            method: 'post',
            url: bp.buildPath(`api/lists/${props.id}/create`),
            headers: {
                'Content-Type': 'application/json'
            },
            data: {
                token: localStorage.getItem("token_data"),
                completed: false,
                text: name
            }
        };

        axios(config)
            .then(function (response) {
                const res = response.data;
                if (res.error) {
                    setMessage('Error adding list');
                    addRes.current.style.display = "inline-block";
                    return;
                }

                const newTask = {
                    type: "Priority",
                    id: res.id,
                    text: name,
                    completed: false
                };

                setTasks([...tasks, newTask]);
            })
            .catch((error) => {
                console.log(error);
            });
    }

    function editTask(id, newName) {

        const config = {
            method: 'post',
            url: bp.buildPath(`api/lists/${props.id}/update/${id}`),
            headers:
            {
                'Content-Type': 'application/json'
            },
            data: {
                token: localStorage.getItem("token_data"),
                text: newName
            }
        };

        axios(config)
            .then(function (response) {
                var res = response.data;
                if (res.error) {
                    setMessage('Error editing task');
                    addRes.current.style.display = "inline-block";
                    return;
                }

                const editedTaskList = tasks.map(task => {
                    // if this task has the same ID as the edited task
                    if (id === task.id)
                        return { ...task, text: newName }
        
                    return task;
                });

                setTasks(editedTaskList);
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    function deleteTask(id) {
        const remainingTasks = tasks.filter(task => id !== task.id);
        const config = {
            method: 'post',
            url: bp.buildPath(`api/lists/${props.id}/delete/${id}`),
            headers: {
                'Content-Type': 'application/json'
            },
            data: {
                "token": localStorage.getItem("token_data")
            }
        };

        axios(config)
            .then(function (response) {

                const res = response.data;
                if (res.error) {
                    setMessage('Error deleting task');
                    addRes.current.style.display = "inline-block";
                    return;
                }

                setTasks(remainingTasks);
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    function handleSubmit(e) {
        e.preventDefault();
        props.editList(props.id, name, props.tasks);
        setName(name);
        // re-init. date and setting editing state to false
        setEditing(false);
    }

    const editingTemplate = (
        <Card.Body className="cardContent">
            <form className="form editTask" onSubmit={handleSubmit}>
                <div className="editFields splitFields">
                    <input
                        id={props.id}
                        name="name"
                        className="todo-text inFields"
                        type="text"
                        value={name}
                        onChange={handleChange}
                        ref={editFieldRef}
                    />
                    <div className="editBtns editRow">
                        <Button
                            type="button"
                            className="buttonScheme schedButton"
                            onClick={() => setEditing(false)}
                        >
                            Cancel
                        </Button>
                        <Button type="submit" className="buttonScheme schedButton">
                            Save
                        </Button>
                    </div>
                </div>
            </form>
            <div className="filterBtns priority">
                {filterList}
            </div>
            <ListGroup variant="flush" className="listAdjust">
                {taskList}
            </ListGroup>
            <NewTaskForm addTask={addTask} />
        </Card.Body>
    );

    const viewTemplate = (
        <Card.Body className="cardContent">
            <h1>{props.name}</h1>

            <button 
                type="button" 
                className="btn listCtrl" 
                onClick={ () => setEditing(true) } 
                ref={editButtonRef}
            >
                <ButtonIcons type="Edit" />
            </button>
            <button 
                type="button" 
                className="btn delListView" 
                onClick={() => props.deleteList(props.id)}
            >
                <ButtonIcons type="Delete" />
            </button>
            <div className="filterBtns priority">
                {filterList}
            </div>
            <ListGroup variant="flush" className="listAdjust">
                {taskList.length < 1 ? <p><br />Add a new task below</p> : taskList}
            </ListGroup>
            <NewTaskForm type="Priority" addTask={addTask} />
            <span id="taskResult" ref={addRes} style={{ display: "none", color: "red" }}>{message}</span>
        </Card.Body>
    );

    useEffect(() => {
        if (!wasEditing && isEditing) {
            editFieldRef.current.focus();
        }
        if (wasEditing && !isEditing) {
            editButtonRef.current.focus();
        }
    }, [wasEditing, isEditing]);

    return (
        <Card className="app canvasCards">
            {isEditing ? editingTemplate : viewTemplate}
        </Card>
    );
}

export default ToDoList;