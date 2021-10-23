import React, { useState } from 'react';
import { ListGroup } from 'react-bootstrap';
import { nanoid } from "nanoid";

import NewTaskForm from './NewTaskForm.js';
import Task from './Task.js'
import FilterButtons from './FilterButtons.js';

function ToDoList(props)
{
    const [filter, setFilter] = useState('All');
    const [tasks, setTasks] = useState(props.tasks);

    var curr = new Date();
    var today = curr.toISOString().substr(0,10);

    const FILTER_MAP = {
        All: () => true,
        Today: task => task.date === today,
        Upcoming: task => task.date > today,
        Completed: task => task.completed
    };

    const FILTER_NAMES = Object.keys(FILTER_MAP);

    function toggleTaskCompleted(id) 
    {
        const updatedTasks = tasks.map(task => {
            
            if (id === task.id) {
                return {...task, completed: !task.completed}
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
                date = {task.date} 
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

    function addTask(name, date) {
        const newTask = 
        { 
            id: "todo-" + nanoid(), 
            name: name, 
            completed: false, 
            date: date 
        };

        setTasks([...tasks, newTask]);
    }

    function editTask(id, newName, newDate) {
        const editedTaskList = tasks.map(task => {
        // if this task has the same ID as the edited task
          if (id === task.id) {
            //
            if(!newName){
                newName = task.name;
            }

            if(!newDate){
                newDate = task.date;
            }

            return {...task, name: newName, date: newDate}
          }

          return task;
        });

        setTasks(editedTaskList);
    }

    function deleteTask(id) {
        const remainingTasks = tasks.filter(task => id !== task.id);
        setTasks(remainingTasks);
    }

    return (
        <div className="app toDoList stack-large">
            <h1>To Do List</h1>
                <ListGroup variant="flush">
                    <div id="filterBtns">
                        {filterList}
                    </div>
                    {taskList}
                    <NewTaskForm addTask={addTask}/>
                </ListGroup>
        </div>
      );
};

export default ToDoList;