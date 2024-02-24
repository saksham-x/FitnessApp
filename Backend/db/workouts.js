const mongoose=require('mongoose')
const workout_schema= new mongoose.Schema({
    type:String,
    name:String,
    reps:Number,
    time:Number,
    level:String,
    gifUrl:String,
    calorie:Number
})
const workout_model=mongoose.model('workout',workout_schema)
module.exports=workout_model