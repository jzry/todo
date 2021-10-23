import React, { useState } from 'react';
import { Card, ListGroup } from 'react-bootstrap';
import { nanoid } from "nanoid";

import SchedTaskForm from './SchedTaskForm';
import EventTask from './EventTask'
import FilterButtons from './FilterButtons';

function SchedList(props)
{
    const [filter, setFilter] = useState('Today');
    const [tasks, setTasks] = useState(props.tasks);

    const curr = new Date();
    const today = curr.toISOString().substr(0, 10);

    // Filter names and conditions
    const FILTER_MAP = 
    {
        All: () => true,
        Today: task => task.date === today,
        Upcoming: task => task.date > today,
        Completed: task => task.completed
    };

    const FILTER_NAMES = Object.keys(FILTER_MAP);

    function toggleTaskCompleted(id) 
    {
        const updatedTasks = tasks.map(task => 
        {
            
            if (id === task.id) 
            {
                return {...task, completed: !task.completed}
            }
            return task;
        });

        setTasks(updatedTasks);
    }

    // Allows rendering of different tasks with different names, dates, and completion marks
    const taskList = tasks
        .filter(FILTER_MAP[filter])
        .map(task => (
            <EventTask 
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

    // Adds Tasks to date-based list
    function addTask(name, date) 
    {
        const newTask = 
        { 
            id: "todo-" + nanoid(), 
            name: name, 
            completed: false, 
            date: date 
        };

        setTasks([...tasks, newTask]);
    }

    // Allows for change of name and date
    function editTask(id, newName, newDate) 
    {
        console.log(today);
        const editedTaskList = tasks.map(task => 
        {
        // if this task has the same ID as the edited task
          if (id === task.id) {
            //
            if(!newName)
            {
                newName = task.name;
            }

            if(!newDate)
            {
                newDate = task.date;
            }

            return {...task, name: newName, date: newDate}
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

    return (
        <div className="app toDoList">
            <Card className="canvasCards cardItem">
                <Card.Body>
                    <h1>To Do List</h1>
                    <ListGroup variant="flush">
                        <div id="filterBtns">
                            {filterList}
                        </div>
                        {taskList}
                        <SchedTaskForm addTask={addTask}/>
                    </ListGroup>
                </Card.Body>
            </Card>
        </div>
      );
};

export default SchedList;