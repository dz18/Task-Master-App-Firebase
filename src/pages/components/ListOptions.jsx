import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { auth, database } from "../../firebase";
import { ref, set, update } from "firebase/database";

export default function ListOptions( {isOpen, closeModal, data, setNewData} ) {

    const [addListValue, setAddListValue] = useState('')
    const [deleteListValue, SetDeleteListValue] = useState('')
    const [editNameID, setEditNameID] = useState('')
    const [newName, setNewName] = useState('')

    useEffect(() => {
        if(data.length !== 0){
            setEditNameID(data[0].listID)
        }
    }, [data])

    const close = () => {
        // Clear inputs
        setAddListValue('')
        setNewName('')
        // Close pop-up
        closeModal()
    }

    const addList = (listName) => {
        if(listName.length === 0){
            alert('List Name cannot be empty')
            return
        }

        console.log(data, listName)
        data.push({listID: uuidv4(), tasks: 0, title: listName})
        setAddListValue('')
        console.log("NEW DATE: " + data)
        
        // Update Firebase
        const user = auth.currentUser
        const dbRef = ref(database, 'users/' + user.uid + '/data')
        set(dbRef, data)
        .then(() => {
            console.log('Data Updated :', data)
            closeModal()
        }) 
        .catch((error) => {
            console.log(error)
        })
    }

    const deleteList = (id) => {
        console.log(id)
        const newData = data.filter((list) => list.listID != id )
        setNewData(newData)

        // Update Firebase
        const user = auth.currentUser
        const dbRef = ref(database, 'users/' + user.uid + '/data')
        set(dbRef, newData)
        .then(() => {
            console.log('Updated List:', newData)
            closeModal()
        })
        .catch((error) => {
            console.log(error)
        })
    }

    const editListName = (id, newName) => {
        var i
        data.map((list, index) => {
            if(list.listID === id){
                list.title = newName
                i = index
            } 
        })
        
        // Update firebase
        const user = auth.currentUser
        const dbRef = ref(database, 'users/' + user.uid + '/data/' + String(i))
        update(dbRef, {title: newName})
        .then(() => {
            console.log('Data updated successfully')
            setNewName('')
            closeModal()
        })
        .catch((error) => {
            console.log(error)
        })
    }

    return(
        <div>
        {isOpen && (
            <div className="modal-container" id="modal-container">
                <div className="modal">
                    <h1>List Options</h1>
                    
                    <section className="add-new-list" id="new-list">
                        <label>Add New List</label>
                        <div>
                            <input type="text" value={addListValue} placeholder="Enter New List Name" onChange={(e) => setAddListValue(e.target.value)}/>  
                            <button onClick={() => addList(addListValue)}>Add New List</button>      
                        </div>
                    </section>

                    <section className="remove-list" id="remove-list">
                        <label>Remove List</label>
                        <div>
                            <select className="remove-select" value={deleteListValue} onChange={(e) => SetDeleteListValue(e.target.value)}>
                            {data.map((list) => (
                                <option className="list-select-option" key={list.listID} value={list.listID}>{list.title}</option>
                            ))}
                            </select>
                            <button onClick={() => deleteList(deleteListValue)}>Delete List</button>
                        </div>
                    </section>

                    <section className="edit-list-name" id="edit-list-name">
                        <label>Edit List Name</label>
                        <div>
                            <select value={editNameID} onChange={(e) => setEditNameID(e.target.value)}>
                            {data.map((list) => (
                                <option className="list-select-option" key={list.listID} value={list.listID}>{list.title}</option>
                            ))}
                            </select>    
                        </div>
                        <div>
                            <input type="text" placeholder="Enter New Name" value={newName} onChange={(e) => setNewName(e.target.value)}/>
                            <button onClick={() => editListName(editNameID, newName)}>Set List Name</button>  
                        </div> 
                    </section>

                    <div className="button-container"><button onClick={close} id="close">Close</button></div>
                
                </div>
            </div>
        )}
        </div>
    )
}