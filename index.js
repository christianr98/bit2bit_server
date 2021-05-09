const express = require('express')
const cors = require('cors');
const app = express()
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const authRoute = require('./src/routes/auth')
const questionRoute = require('./src/routes/question')
const answerRoute = require('./src/routes/answer')
dotenv.config()

mongoose.connect(process.env.DB_CONNECT,
    { useNewUrlParser: true, useUnifiedTopology: true },
    () => console.log('connected to db')
)

// Middleware
app.use(cors())
app.use(express.json())

// Route Middleware
app.use('/api/user', authRoute)
app.use('/api/question', questionRoute)
app.use('/api/answer', answerRoute)

app.listen(3030, () => console.log('Server up and running!'))