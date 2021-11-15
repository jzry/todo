import React, { useRef, useState } from 'react';
import { Card, ListGroup } from 'react-bootstrap';

import axios from 'axios';
import { nanoid } from 'nanoid';

import SchedTask from './SchedTask';
import FilterButtons from './FilterButtons';
import NewTaskForm from './NewTaskForm';

function SchedList(props)
{
    const [filter, setFilter] = useState('All');
    const [tasks, setTasks] = useState(props.tasks);
    const [message,setMessage] = useState('');
    var bp = require('./Path.js');

    const addRes = useRef(null);

    // TIME HANDLING to get non GMT/UMT date
    const curr = new Date();
    const monthcheck = (curr.getMonth()+1); // January = 0, make it 1 for ISO
    const daycheck = curr.getDate();
    const hourscheck = curr.getHours(); 
    const mincheck = curr.getMinutes(); 

    // Adding the 0 for values 1-9 YYYY-0M-0D 0H:0M
    const month = (monthcheck < 10 ? `0${monthcheck}` : `${monthcheck}`);
    const day = (daycheck < 10 ? `0${daycheck}` : `${daycheck}`)
    const hour = (hourscheck < 10 ? `0${hourscheck}` : `${hourscheck}`);
    const minutes = (mincheck < 10 ? `0${mincheck}` : `${mincheck}`);

    const today =`${curr.getFullYear()}-${month}-${day}`;

    const FILTER_MAP = 
    {
        All: () => true,
        Today: task => (task.date).substring(0, 10) === today,
        Upcoming: task => (task.date).substring(0, 10) > today,
        Past: task => (task.date).substring(0, 10) < today
    };

    const FILTER_NAMES = Object.keys(FILTER_MAP);

    const taskList = tasks
        .filter(FILTER_MAP[filter])
        .sort((a, b) => 
        {
            if(a.date > b.date)
            {
                return 1;
             }
             if(a.date < b.date)
             {
                 return -1;
             } 
             else 
             {
                 if(a.time > b.time)
                 {
                     return 1;
                 } 
                 else if(a.time < b.time)
                 {
                     return -1;
                 } 
                 else 
                 {
                     return 0;
                 }
             }
        })
        .map(task => (
            <SchedTask 
                id = {task.id} 
                name = {task.name}
                date = {task.date}
                key = {task.id}
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

    // todayList && soonList for 'All' schedule filter
    const todayList = tasks
        .filter(FILTER_MAP['Today'])
        .sort((a, b) => 
        {
            if(a.date > b.date)
            {
                return 1;
            }
            if(a.date < b.date)
            {
                return -1;
            } 
            else 
            {
                if(a.time > b.time)
                {
                    return 1;
                } 
                else if(a.time < b.time)
                {
                    return -1;
                } 
                else 
                {
                    return 0;
                }
            }
        })
        .map(task => (
            <SchedTask 
                id = {task.id} 
                name = {task.name}
                date = {task.date}
                key = {task.id}
                deleteTask = {deleteTask}
                editTask={editTask}
            />
        )
    );

    const soonList = tasks
        .filter(FILTER_MAP['Upcoming'])
        .sort((a, b) => 
        {
            if(a.date > b.date)
            {
                return 1;
            }
            if(a.date < b.date)
            {
                return -1;
            } 
            else 
            {
                if(a.time > b.time)
                {
                    return 1;
                } 
                else if(a.time < b.time)
                {
                    return -1;
                } 
                else 
                {
                    return 0;
                }
            }
        })
        .map(task => (
            <SchedTask 
                id = {task.id} 
                name = {task.name}
                date = {task.date}
                key = {task.id}
                deleteTask={deleteTask}
                editTask={editTask}
            />
        )
    );

    const allDisplay = 
    ( 
        <div>
            <ListGroup.Item className="listTask">
                <h3 className="schedDividers">Today</h3>
            </ListGroup.Item>
            {todayList}
            <ListGroup.Item className="listTask">
                <h3 className="schedDividers">Upcoming</h3>
            </ListGroup.Item>
            {soonList}
        </div>
    );

    // Adds Tasks to date-based list
    function addTask(name, date) 
    {
        if(date === "")
        {
            date = `${today}T${hour}:${minutes}`;

        }
        const newTask = 
        { 
            type: "Schedule",
            id: `todo-${nanoid()}`, 
            name: name,
            date: date
        };

        var obj = {type: newTask.type,userId: "",id:newTask.id,name:newTask.name, date:newTask.date};
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
                    setMessage('Error adding task');
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

    // Allows for change of name and date
    function editTask(id, newName, newDate) 
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

            if(!newDate)
            {
                newDate = task.date;
            }
            return {...task, name: newName, date: newDate}
          }
          return task;
        });

        var obj = {userId: "",id:id,name:newName, date:newDate};
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
                    <div id="filterBtns" className="filterLimiter">
                        {filterList}
                    </div>
                    <ListGroup variant="flush" className="listAdjust">
                        {
                            (taskList).length < 1 ? 
                                <p><br/>Add a new task below</p> : ((filter === 'All') ? allDisplay : taskList)
                        }
                    </ListGroup>
                    <NewTaskForm type="Schedule" addTask={addTask}/>
                    <span id="taskResult" ref={addRes} style={{display: "none", color: "red"}}>{message}</span>
                </Card.Body>
            </Card>
        </div>
    );

    return (
        <div className="app">
            { viewTemplate }
        </div>
      );
};

export default SchedList;