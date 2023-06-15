import React, { useContext } from 'react'
import NoteContext from '../Context/notesOperation/NoteContext';

const Noteitem = (props) => {

    const context = useContext(NoteContext);
    const {deleteNote} = context;
    const {note,editNote} = props;

  return (
        <div className="col-md-3">
          <div className="card my-3">
            <div className="card-body">
                <div className="d-flex align-items-center">
                <h4 className="card-title">Title: {note.title}</h4> 
                <i className="fa-solid fa-trash mx-2" onClick={()=>{deleteNote(note._id)}}></i>
                <i className="fa-solid fa-pen-to-square mx-2" onClick={()=>{editNote(note)}}></i>
                </div>
                
                <h5 className="card-text">Date: {note.date}</h5>
                <h6 className="card-text">Subject: {note.subject}</h6>
                <p className="card-text">Description: {note.description}</p>
            </div>
          </div>           
        </div>
  )
}

export default Noteitem
