const express = require('express')
const app = express()
const dotenv = require('dotenv')
dotenv.config();
const port = process.env.PORT
const cors = require('cors')
// const { chats } = require('./data/data');
const connectionDB = require('./config/db');
const userRoutes = require('./routes/userRoutes')
const { notFound,errorHandler } = require('./middleware/errorMiddleware')
app.use(cors())
app.use(express.json())
connectionDB();

app.get("/",(req,res)=>{
    res.json("message is clear")
})

app.use('/api/user',userRoutes)

app.use(notFound)
app.use(errorHandler)

app.listen(port,()=>{console.log("api server is running")})
