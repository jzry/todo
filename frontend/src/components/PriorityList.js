import React, { useState } from 'react';
import { Card, ListGroup } from 'react-bootstrap';

import { nanoid } from 'nanoid';

import Task from './Task';
import FilterButtons from './FilterButtons';
import NewTaskForm from './NewTaskForm';

function PriorityList(props)
{

    const [tasks, setTasks] = useState(props.tasks);
    const [filter, setFilter] = useState('All');

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
            id: `priority-${nanoid()}`, 
            name: name, 

        };

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

        setTasks(editedTaskList);
    }

    function deleteTask(id) 
    {
        const remainingTasks = tasks.filter(task => id !== task.id);
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