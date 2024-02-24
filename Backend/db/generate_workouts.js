const mongoose = require('mongoose')
const generate_workout = new mongoose.Schema({
    bodyPart: String,
    equipment: String,
    gif_path: String,
    id: Number,
    name: String,
    target: String,
    level: String,
    intensity: Number,
    reps: Number,
    time: Number,
    two_sides: Boolean,
    stretching: Boolean,
    calorie:Number,
})
const generate_workout_model = mongoose.model('generate_workout', generate_workout)
module.exports = generate_workout_model