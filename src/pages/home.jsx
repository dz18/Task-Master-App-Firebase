import React, { useEffect, useState } from "react";
import './styling/styling.css'
import NavBar from "./components/NavBar";
import { v4 as uuidv4 } from "uuid";
import ToDo from "./components/ToDo";
import { onAuthStateChanged } from "firebase/auth";
import { auth, database } from "../firebase";
import { ref, onValue, set, update } from "firebase/database";

export default function Home() {
    const [select, setSelect] = useState('')        // list ID
    const [TaskList, setTaskList] = useState([])    // list data
    const [taskValue, setTaskValue] = useState('')  // Input Value

    // Load User Data
    const [data, setData] = useState('')
    useEffect(() => {
        const listenAuth = onAuthStateChanged(auth, (user) => {
            if(user) {
                // Set Data
                var dbRef = ref(database, 'users/' + user.uid + '/data')
                onValue(dbRef, (snapshot) => { setData(snapshot.val()) })
                // Set Current List
                dbRef = ref(database, 'users/' + user.uid + '/data/0/tasks')
                onValue(dbRef, (snapshot) => { setTaskList(snapshot.val()) })
                // Set Current List ID
                dbRef = ref(database, 'users/' + user.uid + '/data/0/listID')
                onValue(dbRef, (snapshot) => { setSelect(snapshot.val()) })
            } else {
                setData(null)
            }
        })

        return () => {
            listenAuth()
        }
    }, [])
    
    const addItem = (task, ) => {
        // Add Item to list
        const newTask = { id: uuidv4(), task: task, completed: false }
        const updatedTaskList = [...TaskList, newTask]
        setTaskList(updatedTaskList);

        // Update Firebase server-side data
        var user = auth.currentUser
        var dbRef
        for(var i = 0; i < data.length; ++i){
            if(select === data[i].listID){
                dbRef = ref(database, 'users/' + user.uid + '/data/' + String(i) + '/tasks')    
                break;
            }
        }
        if (dbRef) {
            set(dbRef, updatedTaskList)
            .then(() => {
                console.log('Data updated successfully');
            })
            .catch((error) => {
                console.error('Error updating data:', error);
            });
        } 
    }

    const deleteItem = (id) => {
        const newList = TaskList.filter((item) => item.id != id )
        setTaskList(newList)
        
        // Update Firebase data
        const user = auth.currentUser
        for(var i = 0; i < data.length; ++i){
            if(data[i].listID === select){
                const dbRef = ref(database, '/users/' + user.uid + '/data/' + String(i) + '/tasks')
                set(dbRef, newList)
                .then(() => {
                    console.log('Data updated successfully');
                })
                .catch((error) => {
                    console.error('Error updating data:', error);
                });        
            }
        }
        
    }

    const toggleComplete = (id) => {
        var updatedItem
        setTaskList(TaskList.map((item) => { 
            if(item.id === id){
                updatedItem = {...item, completed: !item.completed}
                return updatedItem
            } else {
                return item
            }
        }))

        const user = auth.currentUser
        var dbRef
        for (var i = 0; i < data.length; i++) {
            if (data[i].listID === select) {
                for (var j = 0; j < data[i].tasks.length; ++j) {
                    if (data[i].tasks[j].id === id) {
                        dbRef = ref(database, '/users/' + user.uid + '/data/' + String(i) + '/tasks/' + String(j))
                        update(dbRef,{ completed: updatedItem.completed })
                        break; 
                    }
                }
            } 
        }
        
    }
        
    const handleSubmit = (e) => { 
        e.preventDefault()

        addItem(taskValue)
        setTaskValue('')
    }

    const handleSelectChange = (e) => {
        setSelect(e.target.value) // List ID

        for(var i = 0; i < data.length; ++i){
            if(data[i].listID == e.target.value){
                setTaskList(data[i].tasks)
            }
        }
    }

    return(
        <div className="home">
            <NavBar/>
            <div className="mainContent">
                <div className="container">
                    <form onSubmit={handleSubmit}>
                        <section className="title">
                            <select value={select} onChange={handleSelectChange}>
                            {Array.isArray(data) ? (
                                <>
                                    {data.map((list) => (
                                        <option key={list.listID} value={list.listID}>{list.title}</option>
                                    ))}
                                </>
                            ) : (
                                <option>...</option>
                            )}
                            </select>
                        </section>
                        <section className="form">
                            <input type="text" placeholder="Enter Task" value={taskValue} onChange={(e) => setTaskValue(e.target.value)}/>
                            <button className="button" type="submit">Add Task</button>
                        </section>
                    </form>
                    {TaskList.map((item, index) => (
                        <ToDo item={item} key={index} toggleComplete={toggleComplete} deleteItem={deleteItem}/>
                    ))}    
                </div>
                
                
            </div>
        </div>
    )
}