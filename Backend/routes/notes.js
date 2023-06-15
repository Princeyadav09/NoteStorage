const express = require('express');
const router = express.Router();
const Note = require('../models/notes')
const { body, validationResult } = require('express-validator');
const fetchuser = require('../Middleware/fetchUser');



// Route 1 :  Adding notes 

router.post('/addnote', fetchuser ,[
    body("name").isLength({min:3}),
    body("title").isLength({min:3}),
], async (req,res)=>{
    try {
    let success = false;
    const error = validationResult(req);
    if(!error.isEmpty()){
        console.log("error")
        return res.status(400).json({error: error.array()});
    }
     console.log(req.body)
    const note = new Note({
        name: req.body.name,
        title: req.body.title,
        date: req.body.date,
        subject: req.body.subject,
        description: req.body.description,
        user: req.user.id
    })
    const savedNote = await note.save()

    res.json(savedNote)

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})

// Route 2 : Getting all notes....

router.get('/getnotes', fetchuser ,async (req,res)=>{
    try{

        const notes = await Note.find({user:req.user.id});
        res.json(notes) 
      //  console.log({user:req.user.id})
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})

// Route 3 : Deleting a note...

router.delete('/deletenote/:id', fetchuser , async (req,res)=>{
    try{
          const note = await Note.findById(req.params.id);
          if(!note){return res.status(404).send("Not Found")}

          let notes = await Note.findByIdAndDelete(req.params.id)
           res.json({"Success":"Note has been delete",note:note});
        //   res.send("ok")
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");      
    }
})


// Route 4 : Edit Note ...

router.put('/editnote/:id', fetchuser  , async (req,res)=>{
    const {name,title,date,subject,description} =req.body;
    try {
  
    //create a newNote object

    const newNote = {};
    if(name){newNote.name=name};
    if(title){newNote.title=title};
    if(date){newNote.date=date};
    if(subject){newNote.subject=subject};
    if(description){newNote.description=description};
    console.log("obj created")
                let note = await Note.findById(req.params.id);
              

                if(!note){return res.status(404).send("Not Found")}
                if(note.user.toString()!==req.user.id){
                    return res.status(401).send("Not Allowed");
                }
                console.log(newNote)
                let notes = await Note.findByIdAndUpdate(req.params.id,{$set:newNote},{new:true})
                console.log(notes)
                res.json({notes});

   } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");   
}

    
})

module.exports = router