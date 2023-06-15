import NoteContext from "./NoteContext";
import { useState } from "react";
import axios from "axios";

const NoteState = (props) => {

    let [notes,setNote] = useState([]);

    // Getting all notes of a specific user login required uing auth token
    
    const getNotes = async () =>{
           const response =  await fetch("http://localhost:4000/api/notes/getnotes",{
              method: 'GET',
              headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
              }
           })
           const json = await response.json()
          // console.log(json)
           setNote(json)
    }

    // Deleting a note from the list 

    const deleteNote = async (id) => {
            const response = await fetch(`http://localhost:4000/api/notes/deletenote/${id}`,{
                method: 'delete',
                headers: {
                    'Content-Type': 'application/json',
                    'auth-token': localStorage.getItem('token')
                }
            })
           const json = await response.json()
          // console.log(json)
    
           const newNotes = notes.filter((note)=>{return note._id!==id})
           setNote(newNotes)
    }

    // Editing a note from the list 

    const editNote = async (id,name,title,date,subject,description) => {
       
       if(Array.isArray(name))name=name[0];
       if(Array.isArray(title))title=title[0];
       if(Array.isArray(date))date=date[0];
       if(Array.isArray(subject))subject=subject[0];
       if(Array.isArray(description))description=description[0];

        const response = await axios.put(`http://localhost:4000/api/notes/editnote/${id}`,{
                      name,title,date,subject,description
                  },{"headers":{
                      "Content-Type": 'application/json',
                      "auth-token": localStorage.getItem('token')
        }})

        //const json = await response.json();
      //  console.log(json)

        let newNotes = JSON.parse(JSON.stringify(notes))

        // Logic to edit in client
        for (let index = 0; index < newNotes.length; index++) {
            const element = newNotes[index];
            if(element._id === id){
                newNotes[index].name = name;
                newNotes[index].title = title;
                newNotes[index].date = date;
                newNotes[index].subject = subject;
                newNotes[index].description = description;
                break;
            }
       
        }
     //   console.log(notes);
        setNote(newNotes);
    }

    return (
        <NoteContext.Provider value={{notes,getNotes,deleteNote,editNote}} >
         {props.children}
       </NoteContext.Provider>
    )
}
export default NoteState;


// value={{notes,addNote,deleteNote,editNote,getNotes}}