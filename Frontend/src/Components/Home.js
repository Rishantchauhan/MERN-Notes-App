import React from 'react'
import Notes from "./Notes";
import AddNotes from './AddNotes';

function Home() {
   
  return (
    <div className='container my-2'>
      <h1>Add Your Notes</h1>
      <AddNotes/>
      <h1>Your Notes</h1>
      <Notes/>
    </div>
  )
}

export default Home
