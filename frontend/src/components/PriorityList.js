import React, { useRef, useState } from 'react';
import { Card, ListGroup } from 'react-bootstrap';

import axios from 'axios';
import { nanoid } from 'nanoid';

import Task from './Task';
import FilterButtons from './FilterButtons';
import NewTaskForm from './NewTaskForm';

function PriorityList(props)
{

    const [tasks, setTasks] = useState(props.tasks);
    const [filter, setFilter] = useState('All');
    const [message,setMessage] = useState('');
    var bp = require('./Path.js');
    const addRes = useRef(null);

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

    const viewTemplate = (
        <div>
            <Card className="canvasCards">
                <Card.Body className="cardContent">
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
        </div>
    );

    return(
        <div className="app">
            { viewTemplate }
        </div>
    );
}

export default PriorityList;