require('./db/config')
const user = require('./db/user')
const workout = require('./db/workouts')
const edamam2Modal = require('./db/edamam2')
const generate_workout = require('./db/generate_workouts')
const otpsend = require('./sendotp/otpsend')
const otpGenerator = require('otp-generator')
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const path = require('path')
const sendverifymail = require('./mail/verifymail')
const spawner = require('child_process').spawn

const IntensityLevel = require('./db/intensity_input')

const app = express()
const port = 4000
app.use(express.json())
app.use(bodyParser.json())
app.use(cors())
app.use('/path/to/gifs', express.static(path.join(__dirname, 'path', 'to', 'gifs')));
app.use('/path/to/exercise', express.static(path.join(__dirname, 'path', 'to', 'exercise')));

const OTPgenerate = () => {
    const otp = otpGenerator.generate(4, {
        upperCaseAlphabets: false,
        specialChars: false,
        lowerCaseAlphabets: false
    })
    return otp
}

app.post('/register', async (req, res) => {
    let repeat = await user.findOne({ "phonenumber": req.body.phonenumber } || { "email": req.body.email })
    if (repeat) {
        res.status(400)
            .json({ success: false, error: "Account with the information already exists" })
    }
    else {
        let data = new user({
            name: req.body.name,
            email: req.body.email,
            phonenumber: req.body.phonenumber,
            age: req.body.age,
            password: req.body.password,
            otp: OTPgenerate(),
        })
        let result = await data.save()
        result = result.toObject()
        delete result.password
        res.status(200).json({ success: true, result: result })
        // sending OTP method
        const subject = "For Mail Verification "
        // sending OTP method
        sendverifymail(result.name, result.email, result.otp, subject)
        // otpsend(result.phonenumber, result.otp)
    }
})

app.post('/login', async (req, res) => {
    if (req.body.email && req.body.password) {
        let data = await user.findOne(req.body).select("-password -workout -diet")
        if (data && data.isUserVerified === false)
            return res.status(400)
                .json({ success: false, error: "Please verify your phone number first!" })
        if (data && data.isUserVerified === true) {
            res.status(200)
                .json({ success: true, result: data })
        }
        else {
            res.status(400).json({ success: false, error: "Enter Valid Information" })
        }
    }
    else {
        res.status(400).json({ success: false, error: "Enter all informations" })
    }
})

app.post('/getInformation', async (req, res) => {
    if (req.query.id) {
        let data = await user.findOne({ _id: req.query.id }).select("-workout.workout")
        if (data) {
            let datas = data.workout
            if (datas.age && datas.height && datas.weight && datas.bmi && datas.bmi_class && datas.goal && datas.level && datas.calories) {
                res.status(200).json({ success: true, data: datas })
            }
            else {
                res.status(400).json({ success: false, error: "Details Not Found" })
            }
        }
        else {
            res.status(400).json({ success: false, error: "User not found" })
        }
    }
    else {
        res.status(400).json({ success: false, error: "Id needed" })
    }
})


app.post('/otpverify', async (req, res) => {
    let data = await user.findOne({ _id: req.query.id })
    if (data) {
        if (req.body.otp === data.otp) {
            let result = await user.updateOne({ _id: req.query.id }, { $set: { isUserVerified: true, otp: '' } })
            res.status(200).json({ success: true, result: "Successfully verified" })
        }
        else {
            res.status(400).json({ success: false, result: "Incorrect OTP" })
        }
    }
})

app.post('/resendotp', async (req, res) => {
    let updateinfo = await user.updateOne({ _id: req.query.id }, { $set: { otp: OTPgenerate() } })
    let data = await user.findOne({ _id: req.query.id })
    // Sending OTP method
    const subject = "For Mail Verification "
    // sending OTP method
    sendverifymail(data.name, data.email, data.otp, subject)
    // otpsend(data.phonenumber,data.otp)
    res.status(200).json({ success: true, result: "OTP sent" })

})

app.post('/forgetpassword', async (req, res) => {
    if (req.body.email) {
        let data = await user.findOne(req.body)
        if (data) {
            let result = await user.updateOne({ email: req.body.email }, { $set: { otp: OTPgenerate() } })
            let data2 = await user.findOne(req.body)
            const subject = "For Password Reset"
            // sending OTP method
            sendverifymail(data2.name, data2.email, data2.otp, subject)
            // otpsend(data2.phonenumber, data2.otp)
            res.status(200).json({ success: true, result: data2 })
        }
        else {
            return res.status(400)
                .json({ success: false, error: "You do not have an account with this number" })
        }
    }
})

app.post('/resetpassword', async (req, res) => {
    if (req.body.password) {
        let result = await user.findOne({ _id: req.query.id })
        if (result) {
            try {
                let data = await user.updateOne({ _id: req.query.id }, { $set: { password: req.body.password, otp: '' } })
                res.status(200).json({ success: true, result: data })
            } catch (error) {
                return res.status(400)
                    .json({ success: false, error: "Internal Error" })
            }
        }
        else {
            return res.status(400)
                .json({ success: false, error: "Error in verification" })
        }
    }
})


app.post('/userInput', async (req, res) => {
    let intensityInputs = new IntensityLevel(req.body)
    let result = await intensityInputs.save()

    let responseSent = false

    // const python_process = spawner('python', ['./pythonscript/myfile.py', JSON.stringify(result)])
    const python_process = spawner('python', ['./pythonscript/myfile.py']);
    python_process.stdin.write(JSON.stringify(result));
    python_process.stdin.end();

    python_process.stdout.on('data', async (data) => {
        try {
            const jsonData = JSON.parse(data.toString());

            result.Intensity = jsonData.Intensity

            let updatedResult = await result.save()

            if (!responseSent) {
                responseSent = true
                res.send(updatedResult)
            }
        } catch (error) {
            console.error('Error parsing JSON:', error);
            if (!responseSent) {
                responseSent = true;
                res.status(500).send({ error: 'Internal Server Error' });
            }
        }
    });
    python_process.stderr.on('data', (data) => {
        console.error('Error from python:', data.toString());
        if (!responseSent) {
            responseSent = true;
            res.status(500).send({ error: 'Internal Server Error' });
        }
    });
})

app.get('/workouts', async (req, res) => {
    let data = await workout.find()
    if (data) {
        res.status(200).json({ success: true, result: data })
    }
    else {
        res.status(404).json({ success: false, result: 'No workouts found' })
    }
})

app.post('/add_daily_diets', async (req, res) => {
    let data = await user.findOne({ _id: req.query.id })
    if (data) {
        if (req.body.breakfast && req.body.lunch && req.body.snacks && req.body.dinner) {
            let getDiet = await user.findOne({ _id: req.query.id, 'diet.time': new Date().toDateString() })
            if (getDiet) {
                let result = await user.updateOne({ _id: req.query.id, 'diet.time': new Date().toDateString() }, { $set: { "diet.$.breakfast": req.body.breakfast, "diet.$.lunch": req.body.lunch, "diet.$.snacks": req.body.snacks, "diet.$.dinner": req.body.dinner } })
                res.status(200).json({ success: true, result: "Successfully updated" })
            }
            else {
                let result = await user.updateOne({ _id: req.query.id }, { $push: { diet: { time: new Date().toDateString(), breakfast: req.body.breakfast, lunch: req.body.lunch, snacks: req.body.snacks, dinner: req.body.dinner } } })
                res.status(200).json({ success: true, result: "Successfully pushed" })
            }
        }
        else {
            res.status(400).json({ success: false, result: "Internal Server Error" })
        }
    }
    else {
        res.status(400).json({ success: false, result: "User not found" })
    }
})

app.get('/get_todays_diet', async (req, res) => {
    let data = await user.findOne({ _id: req.query.id })
    if (data) {
        const diet = data.diet
        const filtered_diet = diet.filter((data) => {
            return data.time === new Date().toDateString()
        })
        if (filtered_diet.length > 0) {
            res.status(200).json({ success: true, result: filtered_diet })
        }
        else {
            res.json({ success: false, result: "Today's Diet Not Found" })
        }
    }
    else {
        res.status(400).json({ success: false, result: "User Not Found" })

    }
})

app.post('/generate_workout', async (req, res) => {
    let data = await user.findOne({ _id: req.query.id })
    if (data) {
        console.log(req.body.healthLabels)
        let intensity = req.query.intensity
        intensity = Number(intensity)
        let number_of_middle_workouts = 0
        if (intensity <= 0) {
            intensity = 1
            number_of_middle_workouts = 4
        }
        else if (intensity === 1) {
            number_of_middle_workouts = 5
        }
        else if (intensity === 2) {
            number_of_middle_workouts = 6
        }
        else if (intensity === 3) {
            number_of_middle_workouts = 7
        }
        else if (intensity === 4) {
            number_of_middle_workouts = 8
        }
        else if (intensity === 5) {
            number_of_middle_workouts = 10
        }
        else if (intensity === 6) {
            number_of_middle_workouts = 12
        }
        else if (intensity === 7) {
            number_of_middle_workouts = 13
        }
        else if (intensity === 8) {
            number_of_middle_workouts = 15
        }
        else if (intensity === 9) {
            number_of_middle_workouts = 17
        }
        else if (intensity >= 10) {
            intensity = 9
            number_of_middle_workouts = 20
        }
        let workouts = data.workout.workout
        let length = workouts.length
        if (length > 0) {
            let domain = {}
            let last_workout = workouts[length - 1]
            let last_day = last_workout.day
            if (last_day > 30) {
                res.status(200).json({ success: true, result: "30 days workout plan completed successfully" })
            }
            else {
                let todays_day = last_day + 1
                let bodypart = []
                if (todays_day % 4 === 1) {
                    bodypart = ['chest', 'upper arms', 'lower arms']
                }
                else if (todays_day % 4 === 2) {
                    bodypart = ['back', 'shoulder', 'neck', 'lower arms', 'upper arms']

                }
                else if (todays_day % 4 === 3) {
                    bodypart = ['waist']
                }
                else if (todays_day % 4 === 0) {
                    bodypart = ['upper legs', 'lower legs']
                }
                domain.intensity = intensity
                domain.bodyPart = bodypart
                domain.stretching = null
                let get_all_workouts = await generate_workout.find(domain)
                let get_cardio = await generate_workout.find({ intensity: intensity, bodyPart: ['cardio'] })
                let get_stretching = await generate_workout.find({ intensity: intensity, bodyPart: domain.bodyPart, stretching: true })
                let suffled_workouts = shuffleWorkouts(get_all_workouts)
                let suffled_cardio = shuffleWorkouts(get_cardio)
                let suffled_stretching = shuffleWorkouts(get_stretching)
                let middle_workouts = [...suffled_workouts.slice(0, number_of_middle_workouts)]
                number_of_start_workout = 1
                if (intensity > 3) {
                    number_of_start_workout = 2
                }
                let start_workout = [...suffled_cardio.slice(0, number_of_start_workout)]
                let ending_workout = [...suffled_stretching.slice(0, 2)]
                let final_workout = [...start_workout, ...middle_workouts, ...ending_workout]
                let workout_data_push = await user.updateOne({ _id: req.query.id }, {
                    $push: {
                        'workout.workout': {
                            day: todays_day,
                            intensity: intensity,
                            workout: final_workout
                        }
                    }
                })
                res.status(200).json({
                    success: true,
                    workout: final_workout
                })
            }
        }
        else {
            let domain = {}
            domain.intensity = intensity
            let bodypart = ['chest', 'upper arms', 'lower arms']
            domain.bodyPart = bodypart
            domain.stretching = null
            let get_all_workouts = await generate_workout.find(domain)
            let get_cardio = await generate_workout.find({ intensity: intensity, bodyPart: ['cardio'] })
            let get_stretching = await generate_workout.find({ intensity: intensity, bodyPart: domain.bodyPart, stretching: true })
            let suffled_workouts = shuffleWorkouts(get_all_workouts)
            let suffled_cardio = shuffleWorkouts(get_cardio)
            let suffled_stretching = shuffleWorkouts(get_stretching)
            let middle_workouts = [...suffled_workouts.slice(0, number_of_middle_workouts)]
            number_of_start_workout = 1
            if (intensity > 3) {
                number_of_start_workout = 2
            }
            let start_workout = [...suffled_cardio.slice(0, number_of_start_workout)]
            let ending_workout = [...suffled_stretching.slice(0, 2)]
            let final_workout = [...start_workout, ...middle_workouts, ...ending_workout]
            let user_data = await user.updateOne({ _id: req.query.id }, {
                $set: {
                    workout: {
                        age: req.body.age,
                        height: req.body.height,
                        weight: req.body.weight,
                        injury: req.body.injury,
                        gender: req.body.gender,
                        bmi: req.body.bmi,
                        bmi_class: req.body.bmi_class,
                        goal: req.body.goal,
                        level: req.body.level,
                        calories: req.body.calories,
                        healthLabel:req.body.healthLabels
                    }
                }
            })
            let workout_data_push = await user.updateOne({ _id: req.query.id }, {
                $push: {
                    'workout.workout': {
                        day: 1,
                        intensity: intensity,
                        workout: final_workout
                    }
                }
            })
            res.status(200).json({
                success: true,
                workout: final_workout
            })
        }
    }
    else {
        res.status(400).json({ success: false, result: "User Not Found" })
    }
})

app.get('/get_all_workouts', async (req, res) => {
    let user_id = req.query.id
    // let day = parseInt(req.query.day, 10)
    let day = req.query.day
    let data = await user.findOne(
        { _id: user_id, 'workout.workout': { $elemMatch: { day: day } } }
    );
    if (data) {
        let workouts = data.workout.workout
        res.status(200).json({ success: true, workouts: workouts })
    }
    else {
        res.status(400).json({ success: false, result: "User Not Found" })
    }
})

app.get("/get_completed_workout_days", async (req, res) => {

    let data = await user.findOne({ _id: req.query.id })
    if (data) {
        let workouts = data.workout.workout
        let workout_length = workouts.length
        res.status(200).json({ success: true, workout_length: workout_length })
    }
    else {
        res.status(400).json({ success: false, result: "User Not Found" })
    }
})

function shuffleWorkouts(workouts) {
    for (let i = workouts.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [workouts[i], workouts[j]] = [workouts[j], workouts[i]];
    }
    return workouts
}

app.get('/edamam', async (req, res) => {
    try {

        const { dietLabels, healthLabels, mealType, cuisineType, dishType, calories, tags } = req.query
        const filter = {};
        if (dietLabels) {
            filter.dietLabels = dietLabels
        }
        if (healthLabels) {
            filter.healthLabels = healthLabels.split(',')
        }
        if (mealType) {
            filter.$or = mealType.split(',').map(type => ({ mealType: type }));
        }
        if (cuisineType) {
            filter.cuisineType = [cuisineType]
        }
        if (dishType) {
            filter.dishType = dishType
        }
        if (calories) {
            const calorieValue = parseFloat(calories);

            if (!isNaN(calorieValue)) {
                filter.calories = { $gte: calorieValue - 100, $lte: calorieValue + 100 };
            } else {
                return res.status(400).json({ success: false, result: 'Invalid calories value' });
            }
        }
        if (tags) {
            filter.tags = tags
        }
        let data = await edamam2Modal.find(filter)
        if (data.length > 0) {
            res.status(200).json({ success: true, result: data })
        }
        else {
            res.status(404).json({ success: false, result: 'No edamam found' })
        }
    }
    catch (error) {
        res.status(500).json({ success: false, result: 'Internal Server Error' })
    }
})

app.get('/getTodaysCalorieAndTime', async (req, res) => {
    console.log("called")
    let data = await user.findOne({ _id: req.query.id })
    if (data) {
        const progress = data.progress
        console.log(progress)
        const filtered_progress = progress.filter((data) => {
            return data.date === new Date().toDateString()
        })
        if (filtered_progress.length > 0) {
            res.status(200).json({ success: true, result: filtered_progress })
        }
        else {
            res.json({ success: false, result: "No any progress Today" })
        }
    }
    else {
        res.status(400).json({ success: false, result: "User Not Found" })
    }
})
app.get('/getWeeklyCalorieAndTime', async (req, res) => {
    console.log("called")
    let data = await user.findOne({ _id: req.query.id })
    if (data) {
        const progress = data.progress
        console.log(progress)
        const filtered_progress = progress.filter((data) => {
            const today = new Date()
            const obtained_date = new Date(data.date)
            console.log(obtained_date)
            const interval = (today - obtained_date) / (1000 * 60 * 60 * 24 * 7)
            console.log(interval)
            return data.date && interval <= 7
        })
        if (filtered_progress.length > 0) {
            res.status(200).json({ success: true, result: filtered_progress })
        }
        else {
            res.json({ success: false, result: "No any progress this week" })
        }
    }
    else {
        res.status(400).json({ success: false, result: "User Not Found" })
    }
})

app.post('/updateTodaysCalorieAndTime', async (req, res) => {
    console.log(req.query.id)
    let data = await user.findOne({ _id: req.query.id })
    console.log(data)
    console.log(req.body)
    if (data) {
        if (req.body.calorie && req.body.time) {
            let getProgress = await user.findOne({ _id: req.query.id, 'progress.date': new Date().toDateString() })
            if (getProgress) {
                let result = await user.updateOne({ _id: req.query.id, 'progress.date': new Date().toDateString() }, { $inc: { "progress.$.calorieBurnt": req.body.calorie, "progress.$.workout_interval": req.body.time } })
                res.status(200).json({ success: true, result: "Successfully updated" })
            }
            else {
                let result = await user.updateOne({ _id: req.query.id }, { $push: { progress: { date: new Date().toDateString(), calorieBurnt: req.body.calorie, workout_interval: req.body.time, } } })
                res.status(200).json({ success: true, result: "Successfully pushed" })
            }
        }
        else {
            res.status(400).json({ success: false, result: "Provide calorie burnt and time interval" })
        }
    }
    else {
        res.status(400).json({ success: false, result: "User Not Found" })
    }
})

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
