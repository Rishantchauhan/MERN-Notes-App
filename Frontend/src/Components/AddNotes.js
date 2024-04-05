import React, { useState } from "react";
import notecontext from "../Context/Notes/NoteContext";
import { useContext } from "react";

function AddNotes() {
  const context = useContext(notecontext);
  const {addNote } = context;
  const [note, setnote] = useState({
    title: "",
    description: "",
    tag: "",
  });
  const onchange = (e) => {
    setnote({ ...note, [e.target.name]: e.target.value });
  };
  const handleclick = (e) => {
    e.preventDefault();
    addNote(note);
    setnote({ title: "", description: "", tag: "" });
  };
  return (
    <div>
      
      <form className="my-2 mx-3">
      <div id="emailHelp" className="form-text">
          </div>
        <div className="mb-1">
          <label htmlFor="exampleInputEmail1" className="form-label">
            Title
          </label>
          <input
            type="text"
            className="form-control"
            id="title"
            name="title"
            onChange={onchange}
            aria-describedby="emailHelp"
            value={note.title}
          />
          
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">
            Description
          </label>
          <textarea
            type="text"
            className="form-control"
            id="description"
            name="description"
            onChange={onchange}
            value={note.description}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">
            Tag
          </label>
          <input
            type="text"
            className="form-control"
            id="tag"
            name="tag"
            onChange={onchange}
            value={note.tag}
          />
        </div>
        <button disabled={(note.title.length<5 || note.description.length<5)?true:false} type="submit" className="btn btn-primary" onClick={handleclick}>
          Submit
        </button>
      </form>
    </div>
  );
}

export default AddNotes;
