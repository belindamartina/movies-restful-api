const { setServers } = require('node:dns/promises');
setServers(['8.8.8.8', '8.8.4.4']); // Force Node to use Google DNS


require('dotenv').config()

const express = require('express')
const app = express()
const mongoose = require('mongoose')

mongoose.connect(process.env.DATABASE_URL)
const db = mongoose.connection
db.on('error', (error)=> console.error(error))
db.once('open', ()=> console.log('connected to database'))

app.use(express.json())

const moviesRouter = require('./routes/movies')
app.use('/movies', moviesRouter)
app.use('/auth', moviesRouter)

const PORT = process.env.PORT || 3000
app.listen(PORT,()=>console.log(`listening to port ${PORT}...`));

app.get('/movies', (req,res) => {

})