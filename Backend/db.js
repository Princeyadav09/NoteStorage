const mongoose = require('mongoose');
const mongoURI = "mongodb://localhost:27017/Project-agni";

const connectToMongo = ()=>{
    mongoose.connect(mongoURI)
    .then(()=>{
        console.log('Connected Successfully')
    })
    .catch((error)=>{
        console.error(error);
    })
}

module.exports = connectToMongo;