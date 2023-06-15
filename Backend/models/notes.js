const mongoose = require('mongoose')
const { Schema } = mongoose

const NoteSchema = new Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    name:{
        type: String,
    },
    title:{
        type: String,
        required: true,
    },
    date:{
        type: String,
    },
    subject:{
        type: String,
    },
    description:{
        type: String,
    }
})
module.exports = mongoose.model('notes',NoteSchema);