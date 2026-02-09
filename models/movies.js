const mongoose = require('mongoose')

const moviesSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    year: {
        type: Number,
        required: true
    },
    description : {
        type: String
    }

})

module.exports = mongoose.model('movies', moviesSchema)