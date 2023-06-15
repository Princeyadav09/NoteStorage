const connectToMongo = require('./db');
const express = require('express')
const cors =require('cors')
const app = express()
const port = 4000

app.use(cors())
app.use(express.json())

connectToMongo();

app.use('/api/login',require('./routes/login'))
app.use('/api/signup',require('./routes/signup'))
app.use('/api/notes',require('./routes/notes'))
app.use('/api/userdetails',require('./routes/userdetails'))

app.listen(port, () => {
  console.log(`Project-Agni app listening on port ${port}`)
})


