import React, { useState } from 'react';
import { Card, ListGroup } from 'react-bootstrap';
import { nanoid } from 'nanoid';

import Task from './Task';
import FilterButtons from './FilterButtons';
import PriorityTaskForm from './PriorityTaskForm';

function PriorityList(props){

    const [tasks, setTasks] = useState(props.tasks);
    const [filter, setFilter] = useState('All');

    const FILTER_MAP = 
    {
        All: () => true,
        Completed: task => task.completed
    };

    const FILTER_NAMES = Object.keys(FILTER_MAP);


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
        )
    );

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
            id: "priority-" + nanoid(), 
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

    return(
        <div className="app">
            <Card className="canvasCards cardItem">
                <Card.Body>
                    <h1>Priority</h1>
                    <ListGroup variant="flush">
                        <div id="filterBtns priority">
                            {filterList}
                        </div>
                        {taskList}
                        <PriorityTaskForm addTask={addTask}/>
                    </ListGroup>
                </Card.Body>
            </Card>
        </div>
    );

}
 export default PriorityList;