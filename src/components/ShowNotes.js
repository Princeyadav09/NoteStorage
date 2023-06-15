import React, { useRef, useState } from 'react'
import { useEffect } from 'react'
import { useContext } from 'react'
import noteContext from "../Context/notesOperation/NoteContext"
import Noteitem from './Noteitem'
import { useNavigate } from 'react-router-dom'


const ShowNotes = () => {
    let navigate = useNavigate();
    const context = useContext(noteContext)
    const {notes,getNotes,editNote} = context
   // console.log(notes);
    const refOpen = useRef(null);
    const refClose = useRef(null);
    useEffect(()=>{
       if(localStorage.getItem('token')){
          getNotes()
       } else {
         navigate("/login")
       } 
    },[])

    const [note,setNote] =useState({id: "",ename:"",etitle:"",edate:"",esubject:"",edescription:""})

    const updateNote = (currentNote)=>{
      refOpen.current.click();
      setNote({id: currentNote._id,ename: currentNote.name,etitle: currentNote.title,edate: currentNote.date,esubject: currentNote.subject,edescription: currentNote.description})
    }

    const handleClick =(e)=>{
       
      editNote(note.id,note.ename,note.etitle,note.edate,note.esubject,note.edescription)
      refClose.current.click();
      // props.showAlert("Updated Successfully","success");
      
  }

  const onChange = (e) =>{
      setNote({...note,[e.target.name]:[e.target.value]})
  }

  return (
    <>

   <button ref={refOpen} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
          Launch demo modal
       </button>

        <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel"  aria-hidden="true">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">Edit Note</h5>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div className="modal-body">
              <form className="my-3">
                   <div className="mb-3">
                        <label htmlFor="name" className="form-label">Name</label>
                        <input type="text" className="form-control" id="ename" name="ename" value={note.ename} aria-describedby="emailHelp" onChange={onChange} minLength={5} required/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="title" className="form-label">Title</label>
                        <input type="text" className="form-control" id="etitle" name="etitle" value={note.etitle} aria-describedby="emailHelp" onChange={onChange} minLength={5} required/>
                    </div>
                    
                    <div className="mb-3">
                        <label htmlFor="date" className="form-label">Date</label>
                        <input type="text" className="form-control" id="edate" name="edate" value={note.edate} onChange={onChange}/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="subject" className="form-label">Subject</label>
                        <input type="text" className="form-control" id="esubject" name="esubject" value={note.esubject} onChange={onChange}/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="description" className="form-label">Description</label>
                        <input type="text" className="form-control" id="edescription" name="edescription" value={note.edescription} onChange={onChange}/>
                    </div>
                   
               </form>
              </div>
              <div className="modal-footer">
                <button ref={refClose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                <button  onClick={handleClick} type="button" className="btn btn-primary">Update Note</button>
              </div>
            </div>
          </div>
        </div>
       
          <div className='row ' style={{height: "300px"}}>
              <center><h2>Your Notes</h2></center>
              <div className="conatiner mx-2">
                  {notes.length===0 && 'No notes to display'}
                  </div>
          
                  {notes.map((notee)=>{
                      return <Noteitem key={notee._id} note={notee} editNote={updateNote}></Noteitem>
                  })}
          </div>
    </>
  )
}

export default ShowNotes
