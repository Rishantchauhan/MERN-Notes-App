import React, { useEffect } from 'react'
import notecontext from './NoteContext'
import { useState } from 'react';


const NoteState=(props)=>{
     const host="https://mern-notes-app-delta.vercel.app/";
     const token=localStorage.getItem('token');
    const ini_notes = [];
    const [notes, setnotes]=useState(ini_notes);
    //const [alert, setAlert] = useState(null);
   
    const getallnotes=async()=>{
      const response = await fetch(`${host}/api/notes/fetchallnotes`, {
        method: "GET", 
        headers: {
          "Content-Type": "application/json",
          "auth-token": token
        }
      });
      const json=await response.json();
      //console.log(json);
      setnotes(ini_notes.concat(json));
    }

    const addNote=async(note)=>{
        
      const note1={
        "_id": "6607c7794e3c7456f9e61a43",
        "user": "66069d7f1090830ba6c63275",
        "title":note.title,
        "description": note.description,
        "tag":note.tag,
        "__v": 0
      }
      const response = await fetch(`${host}/api/notes/addnotes`, {
        method: "POST", 
        headers: {
          "Content-Type": "application/json",
          "auth-token": token
        },
        body: JSON.stringify(note), 
      });
      setnotes(notes.concat(note1));
    }
    const deletenote=async(id)=>{
      const c=notes.filter((note)=>{return id!==note._id});
      setnotes(c);
      const response = await fetch(`${host}/api/notes/deletenotes/${id}`, {
        method: "DELETE", 
        headers: {
          "Content-Type": "application/json",
          "auth-token": token
        }
      });
     // const json=await response.json();
      //console.log(json);
     
    }
    const editnote=async(id,title,description,tag)=>{
      const response = await fetch(`${host}/api/notes/updatenotes/${id}`, {
        method: "PUT", 
        headers: {
          "Content-Type": "application/json",
          "auth-token": token
        },
        body: JSON.stringify({title,description,tag}), 
      });
      const newNote=JSON.parse(JSON.stringify(notes));
      //console.log(tag);
      for(let index=0;index<newNote.length;index++)
        {
           if(newNote[index]._id===id)
             {
                newNote[index].title=title;
                newNote[index].description=description;
                newNote[index].tag=tag;
                break;

             }
        }
        //console.log(newNote);  
      setnotes(newNote);  
      //return response.json();
    }  
    
    return (
        <notecontext.Provider value={{notes,addNote,setnotes,deletenote,getallnotes,editnote}}>
            {props.children}
        </notecontext.Provider>
    )
}

export default NoteState;
