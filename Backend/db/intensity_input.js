const mongoose = require('mongoose')

const intensityInputSchema = new mongoose.Schema({
    Age: Number,
    Gender: Number,
    Height: Number,
    Weight: Number,
    Bmi: Number,
    Bmi_class: String,
    Goals: String,
    Injury: Number,
    Current_fitness_level: String,
    Intensity: Number
})

module.exports = mongoose.model('intensity_input', intensityInputSchema)