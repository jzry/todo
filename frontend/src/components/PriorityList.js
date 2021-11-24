import React, { useEffect, useRef, useState } from 'react';
import { Button, Card, ListGroup } from 'react-bootstrap';

import axios from 'axios';
import { nanoid } from 'nanoid';

import Task from './Task';
import FilterButtons from './FilterButtons';
import NewTaskForm from './NewTaskForm';
import ButtonIcons from './ButtonIcons';

function usePrevious(value) 
{
    const ref = useRef();
    useEffect(() => 
    {
      ref.current = value;
    });
    return ref.current;
};

function PriorityList(props)
{

    const [tasks, setTasks] = useState(props.tasks);
    const [filter, setFilter] = useState('All');
    const [message,setMessage] = useState('');

    const [name, setName] = useState(props.name);
    const [isEditing, setEditing] = useState(false);
    const editFieldRef = useRef(null);
    const editButtonRef = useRef(null);
    const wasEditing = usePrevious(isEditing);

    var bp = require('./Path.js');
    const addRes = useRef(null);

    const handleChange = (e) =>
    {
        setName(e.target.value);
    }

    // Filter names and conditions
    const FILTER_MAP = 
    {
        All: () => true,
        Unfinished: task => task.completed === false,
        Completed: task => task.completed
    };

    const FILTER_NAMES = Object.keys(FILTER_MAP);


    // Toggle for filter/browser to unify state
    function toggleTaskCompleted(id) 
    {
        const updatedTasks = tasks.map(task => 
        {
            
            if (id === task.id) 
            {
                return{...task, completed: !task.completed}
            }
            return task;
        });

        setTasks(updatedTasks);
    }

    // For rendering desired number of tasks based on task props
    const taskList = tasks
        .filter(FILTER_MAP[filter])
        .map(task => (
            <Task 
                id = {task.id} 
                name = {task.name} 
                completed ={ task.completed } 
                key = {task.id} 
                toggleTaskCompleted = {toggleTaskCompleted}
                deleteTask = {deleteTask}
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

    function addTask(name) 
    {
        const newTask = 
        { 
            type: "Priority",
            id: `todo-${nanoid()}`, 
            name: name, 
            completed: false
        };
        var obj = {type: newTask.type,userId: "",id:newTask.id,name:newTask.name};
        var js = JSON.stringify(obj);
        var config = 
        {
            method: 'post',
            url: bp.buildPath('api/createNote'),
            headers: 
            {
                'Content-Type': 'application/json'
            },
            data: js
        };
        axios(config)
            .then(function (response) 
            {
                var res = response.data;
                if (res.error) 
                {
                    setMessage('Error adding list');
                    addRes.current.style.display = "inline-block";
                }
                else 
                {
                    setTasks([...tasks, newTask]);
                }
            })
            .catch(function (error) 
            {
                console.log(error);
            });

        setTasks([...tasks, newTask]);
    }

    function editTask(id, newName) 
    {
        const editedTaskList = tasks.map(task => 
        {
        // if this task has the same ID as the edited task
          if (id === task.id) 
          {
            //
            if(!newName)
            {
                newName = task.name;
            }

            return {...task, name: newName}
          }

          return task;
        });

        var obj = {userId: "",id:id,name:newName};
        var js = JSON.stringify(obj);
        var config = 
        {
            method: 'post',
            url: bp.buildPath('api/updateNote'),
            headers: 
            {
                'Content-Type': 'application/json'
            },
            data: js
        };
        axios(config)
            .then(function (response) 
            {
                var res = response.data;
                if (res.error) 
                {
                    setMessage('Error editing task');
                    addRes.current.style.display = "inline-block";
                }
                else 
                {
                    setTasks(editedTaskList);
                }
            })
            .catch(function (error) 
            {
                console.log(error);
            });

        setTasks(editedTaskList);
    }

    function deleteTask(id) 
    {
        const remainingTasks = tasks.filter(task => id !== task.id);

        var obj = {userId: "",id:id};
        var js = JSON.stringify(obj);
        var config = 
        {
            method: 'post',
            url: bp.buildPath('api/deleteNote'),
            headers: 
            {
                'Content-Type': 'application/json'
            },
            data: js
        };
        axios(config)
            .then(function (response) 
            {
                var res = response.data;
                if (res.error) 
                {
                    setMessage('Error deleting task');
                    addRes.current.style.display = "inline-block";
                }
                else 
                {
                    setTasks(remainingTasks);
                }
            })
            .catch(function (error) 
            {
                console.log(error);
            });

        setTasks(remainingTasks);
    }

    function handleSubmit(e)
    {
        e.preventDefault();
        props.editList(props.id, name);
        setName(name);
        // re-init. date and setting editing state to false
        setEditing(false);
    }

    const editingTemplate = (
        <Card className="canvasCards">
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
                <NewTaskForm addTask={addTask}/>
            </Card.Body>
        </Card>
    );

    const viewTemplate = (
        <div>
            <Card className="canvasCards">
                <Card.Body className="cardContent">
                    <h1>{props.name}</h1>
                    <button 
                        type="button" 
                        className="btn delListView" 
                        onClick={() => props.deleteList(props.id)}
                    >
                        <ButtonIcons type="Delete"/>
                    </button>
                    <div className="filterBtns priority">
                        {filterList}
                    </div>
                    <ListGroup variant="flush" className="listAdjust">
                        {taskList.length < 1 ? <p><br/>Add a new task below</p> : taskList}
                    </ListGroup>
                    <NewTaskForm type="Priority" addTask={addTask}/>
                    <span id="taskResult" ref={addRes} style={{display: "none", color: "red"}}>{message}</span>
                </Card.Body>
            </Card>
            <button 
                type="button" 
                className="btn listCtrl" 
                onClick={ () => setEditing(true) } 
                ref={editButtonRef}
            >
                Edit <span className="visually-hidden">{name}</span>
            </button>
        </div>
    );

    useEffect(() => 
    {
      if (!wasEditing && isEditing) 
      {
        editFieldRef.current.focus();
      }
      if (wasEditing && !isEditing) 
      {
        editButtonRef.current.focus();
      }
    }, [wasEditing, isEditing]);

    return(
        <div className="app">
            { isEditing ? editingTemplate : viewTemplate }
        </div>
    );
}

export default PriorityList;