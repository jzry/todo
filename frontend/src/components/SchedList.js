import React, { useEffect, useState, useRef } from 'react';
import { Button, Card, ListGroup } from 'react-bootstrap';
import { nanoid } from 'nanoid';

import ButtonIcons from './ButtonIcons';
import SchedTaskForm from './SchedTaskForm';
import SchedTask from './SchedTask'
import FilterButtons from './FilterButtons';

function usePrevious(value) 
{
    const ref = useRef();
    useEffect(() => 
    {
      ref.current = value;
    });
    return ref.current;
};

function SchedList(props)
{
    const [filter, setFilter] = useState('All');
    const [tasks, setTasks] = useState(props.tasks);


    const [name, setName] = useState(props.name);
    const [isEditing, setEditing] = useState(false);

    const editFieldRef = useRef(null);
    const editButtonRef = useRef(null);
    const wasEditing = usePrevious(isEditing);

    const handleChange = (e) =>
    {
        setName(e.target.value);
    }


    const curr = new Date();
    const today = curr.toISOString();

    // Filter names and conditions
    const FILTER_MAP = 
    {
        All: () => true,
        Today: task => (task.date).substring(0, 10) === today.substring(0, 10),
        Upcoming: task => task.date > today,
        Past: task => task.date < today 
    };

    const FILTER_NAMES = Object.keys(FILTER_MAP);


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

    const todayList = tasks
        .filter(FILTER_MAP['Today'])
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
                date = {task.date}
                key = {task.id}
                deleteTask = {deleteTask}
                editTask={editTask}
            />
        )
    );

    const soonList = tasks
        .filter(FILTER_MAP['Upcoming'])
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
                <h4 className="schedDividers">Today</h4>
            </ListGroup.Item>
            {todayList}
            <ListGroup.Item className="listTask">
                <h4 className="schedDividers">Upcoming</h4>
            </ListGroup.Item>
            {soonList}
        </div>
    );

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
        return hours+":"+minutes+" "+meridian;
    }

    // Adds Tasks to date-based list
    function addTask(name, date) 
    {
        if(date === "")
        {
            date = today.split('T')[0]+ " "+ onTimeChange(today.split('T')[1]);

        } else{
            date = date.split('T')[0]+ " "+ onTimeChange(date.split('T')[1]);
        }
        const newTask = 
        { 
            id: "todo-" + nanoid(), 
            name: name,
            date: date
        };

        setTasks([...tasks, newTask]);
    }

    // Allows for change of name and date
    function editTask(id, newName, newDate) 
    {
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

    function handleSubmit(e)
    {
        e.preventDefault();
        props.editList(props.id, name);
        setName(name);
        // re-init. date and setting editing state to false
        setEditing(false);
    }

    const editingTemplate = (
        <Card className="canvasCards cardItem">
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
                <div id="filterBtns" className="filterLimiter">
                    {filterList}
                </div>
                <ListGroup variant="flush" className="listAdjust">
                    {(filter === 'All')? allDisplay: taskList}
                </ListGroup>
                <SchedTaskForm addTask={addTask}/>
            </Card.Body>
        </Card>
    );

    const viewTemplate = (
        <Card className="canvasCards cardItem">
            <Card.Body className="cardContent">
                <h1>
                    {props.name}          
                    <button 
                        type="button" 
                        className="btn listCtrl buttonScheme" 
                        onClick={ () => setEditing(true) } 
                        ref={editButtonRef}
                    >
                        <ButtonIcons type="Edit"/> <span className="visually-hidden">{name}</span>
                    </button>
                </h1> 
                <button 
                    type="button" 
                    className="btn delListView" 
                    onClick={() => props.deleteList(props.id)}
                >
                    <ButtonIcons type="Delete"/>
                </button>
                <div id="filterBtns" className="filterLimiter">
                    {filterList}
                </div>
                <ListGroup variant="flush" className="listAdjust">
                    {(filter === 'All')? allDisplay: taskList}
                </ListGroup>
                <SchedTaskForm addTask={addTask}/>
            </Card.Body>
        </Card>
    );

    useEffect(() => 
    {
      if (!wasEditing && isEditing) {
        editFieldRef.current.focus();
      }
      if (wasEditing && !isEditing) {
        editButtonRef.current.focus();
      }
    }, [wasEditing, isEditing]);

    return (
        <div className="app">
            { isEditing ? editingTemplate : viewTemplate }
        </div>
      );
};

export default SchedList;