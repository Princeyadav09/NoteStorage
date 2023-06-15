import React, { useContext, useEffect } from 'react'
import axios from 'axios'
import { useState } from 'react'
import NoteContext from '../Context/notesOperation/NoteContext'
import AlertContext from '../Context/alertContext/alertContext'


const AddNotes = () => {
    const context = useContext(NoteContext);
    const [notes,setNotes] = useState([])
    const {getNotes} = context;
   
    const context1 = useContext(AlertContext);
    const {showAlert} = context1;

    const [credentials,setCredentials] = useState({name:"",title: "",date: "",subject: "",description:""})
    const saveNote = async (e) => {
    let {notesUse}  = context;
      e.preventDefault();
      const name = credentials.name[0]
      const title = credentials.title[0]
      const date = credentials.date[0]
      const subject = credentials.subject[0]
      const description = credentials.description[0]
      // const {name,title,date,subject,description} = credentials;
      console.log(title)
      const response = await axios.post("http://localhost:4000/api/notes/addnote",{
                      name,title,date,subject,description
                  },{"headers":{
                      "Content-Type": 'application/json',
                      "auth-token": localStorage.getItem('token')
                  }})
  
      console.log(response);
      //const note = await response.json();
      setNotes(notes.concat(response.data))
      notesUse=notes;
      showAlert("Added Successfully","success");
  
    }
    useEffect(()=>{
      getNotes()
    },[saveNote])
    
    const onchange = (e) => {
       setCredentials({...credentials,[e.target.name]:[e.target.value]})
    }




  return (
    
        <div className='row my-4' style={{height: "450px"}}>
            <center><h2>Addnote</h2></center>
            <form onSubmit={saveNote}>
                <div className="mb-1 d-flex justify-content-between">
                <label htmlFor="exampleInputEmail1" className="form-label">Name:</label>
                <input type="text" className="form-control" style={{width: "92%"}} name='name' onChange={onchange} id="exampleInputEmail1" aria-describedby="emailHelp"/>
                </div>
                <div className="mb-1 d-flex justify-content-between">
                <label htmlFor="exampleInputPassword1" className="form-label">Title:</label>
                <input type="text" className="form-control" style={{width: "92%"}} name='title' onChange={onchange} id="exampleInputPassword1"/>
                </div>
                <div className="mb-1 d-flex justify-content-between">
                <label htmlFor="exampleInputPassword1" className="form-label" >Date:</label>
                <input type="text" className="form-control" style={{width: "92%"}} name='date' onChange={onchange} id="exampleInputPassword1"/>
                </div>
                <div className="mb-1 d-flex justify-content-between">
                <label htmlFor="exampleInputPassword1" className="form-label">Subject:</label>
                <input type="text" className="form-control" style={{width: "92%"}} name='subject' onChange={onchange} id="exampleInputPassword1"/>
                </div>
                <div className="mb-1 d-flex justify-content-between">
                <label htmlFor="exampleInputPassword1" className="form-label">Description:</label>
                <textarea className="form-control" style={{width: "92%"}} name='description' onChange={onchange} id="desc" rows="5"></textarea>
                </div>
            
                
            <center><button type="submit" className="btn btn-primary my-3">Add</button></center> 
            </form>

        </div>
      
  )
}

export default AddNotes
