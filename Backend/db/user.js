const mongoose=require('mongoose')
const usersch= new mongoose.Schema({
    name:String,
    email:String,
    phonenumber:String,
    password:String,
    age:Number,
    isUserVerified:{type:Boolean,default:false},
    otp:String,
    diet:[{
        time:String,
        breakfast:Object,
        lunch:Object,
        snacks:Object,
        dinner:Object,
    }],
    workout:{
        age:Number,
        height:Number,
        weight:Number,
        injury:Boolean,
        gender:Number,
        bmi:Number,
        bmi_class:String,
        goal:String,
        level:String,
        workout:[{
        day:Number,
        intensity:Number,
        workout:Object
    }]},
})
const usermodel=mongoose.model('user',usersch)
module.exports=usermodel