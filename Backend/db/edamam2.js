const mongoose=require('mongoose')
const edamam2Sch= new mongoose.Schema({
    uri: String,
    label: String,
    image: Object,
    source: String,
    url: String,
    shareAs: String,
    yield: Number,
    dietLabels:Array,
    healthLabels: Array,
    cautions: Array,
    ingredientLines: Array,
    ingredients:[Object],
    calories: Number,
    totalCO2Emissions: Number,
    co2EmissionsClass: String,
    totalWeight: Number,
    totalTime: Number,
    cuisineType:Array,
    mealType: Array,
    dishType:Array,
    totalNutrients: {Object},
    totalDaily:{Object},
    digest:[Object],
    instructionLines: Array,
    summary: String,
    tags:Array
  }
  )
const edamam2Modal=mongoose.model('edamam2',edamam2Sch)
module.exports=edamam2Modal