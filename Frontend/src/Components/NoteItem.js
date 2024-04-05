import React from "react";
import notecontext from "../Context/Notes/NoteContext"
import { useContext} from "react"

function NoteItem(props) {
  const { notes ,updatenote} = props;
  const context=useContext(notecontext);
  const {deletenote}=context;
  return (
    <div className="col-md-3">
      <div className="card my-3">
        <div className="card-body">
          <div className="d-flex align-items-center" >
            <h5 className="card-title">{notes.title}</h5>
            <i className="fa-solid fa-trash mx-2" onClick={()=>deletenote(notes._id)}></i>
            <i className="fa-solid fa-pen-to-square" onClick={()=>{updatenote(notes)}}></i>
          </div>
          <p className="card-text">{notes.description}</p>
        </div>
      </div>
    </div>
  );
}

export default NoteItem;
