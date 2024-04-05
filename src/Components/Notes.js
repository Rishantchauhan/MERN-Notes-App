import { useContext, useEffect, useRef, useState } from "react";
import React from "react";
import notecontext from "../Context/Notes/NoteContext";
import NoteItem from "./NoteItem";

function Notes() {
  var val="d-none";
  const a = useContext(notecontext);
  const {notes,getallnotes,editnote} = a;
  useEffect(() => {
    //console.log(localStorage.getItem('token'));
    if(localStorage.getItem('token'))
        getallnotes();
       
  }, []);
  const [note, setnote] = useState({
    eid: "",
    etitle: "",
    edescription: "",
    etag: "default",
  });
  const ref = useRef("");
  const ref1 = useRef("");
  const ref2 = useRef("");
  const updatenote = (currentnote) => {
    ref.current.click();
    setnote({
      eid: currentnote._id,
      etitle: currentnote.title,
      edescription: currentnote.description,
      etag: currentnote.tag,
    });
  };

  const onchange = (e) => {
    setnote({ ...note, [e.target.name]: e.target.value });
  };
  const handleclick = (e) => {
    e.preventDefault();
    console.log(note);
    editnote(note.eid, note.etitle, note.edescription, note.etag);
    ref1.current.click();
  };
  return (
    <>
      <button
        type="button"
        ref={ref}
        className="btn btn-primary d-none"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
      >
        Launch demo modal
      </button>

      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                Edit Note
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form className="my-2 mx-3">
                <div className="mb-1">
                  <label htmlFor="exampleInputEmail1" className="form-label">
                    Title
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="etitle"
                    name="etitle"
                    onChange={onchange}
                    aria-describedby="emailHelp"
                    value={note.etitle}
                  />
                  <div id="emailHelp" className="form-text">
                    We'll never share your Data with anyone else.
                  </div>
                </div>
                <div className="mb-3">
                  <label htmlFor="exampleInputPassword1" className="form-label">
                    Description
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="edescription"
                    name="edescription"
                    onChange={onchange}
                    value={note.edescription}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="exampleInputPassword1" className="form-label">
                    Tag
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="etag"
                    name="etag"
                    onChange={onchange}
                    value={note.etag}
                  />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                ref={ref1}
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleclick}
              >
                Save changes
              </button>
            </div>
          </div>
        </div>
      </div>
      { localStorage.getItem('token') ?
      <div className="row my-3" id="container">
        {localStorage.getItem('token') && !notes.length && <div className="container mx-2">No Notes To Display</div>}
        {notes.map((note) => {
          return (
            <NoteItem key={note._id} notes={note} updatenote={updatenote} />
          );
        })}
      </div> :<div className="container mx-2">Please Login To See Your Notes</div>}
    </>
  );
}

export default Notes;
