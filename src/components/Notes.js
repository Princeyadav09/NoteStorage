import React from 'react'
import AddNotes from './AddNotes'
import ShowNotes from './ShowNotes'
const Notes = () => {

 
  
  return (
    <div className='container' style={{height: "770px"}}>
         
           <AddNotes></AddNotes>

           <ShowNotes></ShowNotes>
  
    </div> 
  )
}

export default Notes
