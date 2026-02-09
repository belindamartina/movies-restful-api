const express = require('express')
const router = express.Router()
const Movie = require('../models/movies')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const User = require('../models/user')

function authenticateToken(req,res,next) {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]

    if (token == null) return res.status(401).json({ message: "No Token Provided" })
    
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) return res.status(403).json({ message: "Token Invalid or Expired" })
        req.user = user
        next()
    })
}


//register
router.post('/register', async (req,res) => {
    try{
        const hashedPassword = await bcrypt.hash(req.body.password, 10)
        const user = new User ({ username: req.body.username, password: hashedPassword })
        await user.save()
        res.status(201).json({ message: "User created" })
    }catch(err){
        res.status(500).json({ message: err.message })
    }
})

//login (earning token)
router.post('/login', async (req,res)=> {
    const user = await User.findOne({ username: req.body.username })
    if (user == null) return res.status(400).send('user not found')
    if (await bcrypt.compare(req.body.password, user.password)) {
        const accessToken = jwt.sign({ id: user._id }, process.env.ACCESS_TOKEN_SECRET)
        res.json({ accessToken: accessToken })
    }else {
        res.send('Not Allowed')
    }
})

//getting all
router.get('/', authenticateToken, async (req, res)=>{
    try{
        const movies = await Movie.find()
        res.send(movies)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

//getting one
router.get('/:id', authenticateToken, getMovie, (req,res)=>{
    res.json(res.movie)
})

//creating one
router.post('/', authenticateToken, async (req,res)=>{
    try{
        const movie = new Movie({
            title: req.body.title,
            year: req.body.year,
            description: req.body.description
        })
        const newMovie = await movie.save()
        res.status(201).json(newMovie)
    }catch (err){
        res.status(400).json({ message: err.message })
    }   
})

//updating one
router.patch('/:id', authenticateToken, getMovie, async (req,res)=>{
  if (req.body.title != null) {
    res.movie.title = req.body.title
  }
  if (req.body.year != null) {
    res.movie.year = req.body.year
  }
  if (req.body.description != null) {
    res.movie.description = req.body.description
  }  
  try {
    const updatedMovie = await res.movie.save()
    res.json(updatedMovie)
  }catch (err){
    res.status(400).json({message: err.message })
  }
})

//deleting one
router.delete('/:id', authenticateToken, getMovie, async (req,res)=>{
    try{
        await res.movie.deleteOne()
        res.json({message: "deleted movie"})
    }catch(err){
        res.status(500).json({message: err.message})
    }
})

async function getMovie(req,res,next) {
    let movie
    try{
        movie = await Movie.findById(req.params.id)
        if (movie == null){
            return res.status(404).json({message: 'movie not found' })
        }
    }catch(err){
        return res.status(404).json({message: 'movie not found' })
    }

    res.movie = movie
    next()
}

module.exports = router