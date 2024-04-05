import { useContext} from "react"
import React from 'react'
import notecontext from "../Context/Notes/NoteContext"

function About() {
    const a=useContext(notecontext);
    const val=a.notes;
  return (
    <div>
      <h1>This is about</h1>
    </div>
  )
}

export default About
