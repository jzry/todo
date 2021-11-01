import React, { useState } from 'react';
import { Card, ListGroup } from 'react-bootstrap';
import { nanoid } from "nanoid";

import SchedTaskForm from './SchedTaskForm';
import SchedTask from './SchedTask'
import FilterButtons from './FilterButtons';

function SchedList(props)
{
    const [filter, setFilter] = useState('Today');
    const [tasks, setTasks] = useState(props.tasks);

    const curr = new Date();
    const today = curr.toISOString().substring(0, 10);

    // Filter names and conditions
    const FILTER_MAP = 
    {
        All: () => true,
        Unfinished: task => task.completed === false,
        Today: task => task.date === today && task.completed === false,
        Upcoming: task => task.date > today && task.completed === false,
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
        .sort((a, b) => {
            if(a.date > b.date){
                return 1;
             }
             if(a.date < b.date){
                 return -1;
             } else {
                 if(a.time > b.time){
                     return 1;
                 } else if(a.time < b.time){
                     return -1;
                 } else {
                     return 0;
                 }
             }
        })
        .map(task => (
            <SchedTask 
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

    function onTimeChange(time) {
        var timeSplit = time.split(':'),
          hours,
          minutes,
          meridian;
        hours = parseInt(timeSplit[0]);
        minutes = parseInt(timeSplit[1]);
        if (hours > 12) {
          meridian = 'PM';
          hours -= 12;
        } else if (hours < 12) {
          meridian = 'AM';
          if (hours === 0) {
            hours = 12;
          }
        } else {
          meridian = 'PM';
        }
        return meridian;
    }

    // Adds Tasks to date-based list
    function addTask(name, date) 
    {
        if(date === "")
        {
            date = today;
            console.log(today);

        } else{
            date = date.split('T')[0]+ " "+ date.split('T')[1] + " " + onTimeChange(date.split('T')[1]);
        }
        const newTask = 
        { 
            id: "todo-" + nanoid(), 
            name: name, 
            completed: false, 
            date: date
        };
        console.log(date);

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
        <div className="app">
            <Card className="canvasCards cardItem">
                <Card.Body className="cardContent">
                    <h1>{props.name}</h1>
                    <div id="filterBtns" className="filterLimiter">
                            {filterList}
                    </div>
                    <ListGroup variant="flush" className="listAdjust">
                        {taskList}
                    </ListGroup>
                    <SchedTaskForm addTask={addTask}/>
                </Card.Body>
            </Card>
        </div>
      );
};

export default SchedList;