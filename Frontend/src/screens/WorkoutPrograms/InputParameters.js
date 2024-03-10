import { View, Text, StyleSheet, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import CustomDropdown from '../../components/CustomDropdown/CustomDropdown'
import CustomizedInput from '../../components/CustomizedInput/CustomizedInput'
import CustomButton from '../../components/CustomButtons/CustomButton'
import AddItem from '../../components/addItem/AddItem'
import { useNavigation } from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { default_ip_address } from '../../constant/constant'
import { useFocusEffect } from "@react-navigation/native";

const activityLevelItems = [
  { label: 'Little or no exercise', value: 1 },
  { label: 'Light exercise/sports 1-3 days/week', value: 2 },
  { label: 'Moderate exercise/sports 3-5 days/week', value: 3 },
  { label: 'Hard exercise/sports 6-7 days a week', value: 4 },
  { label: 'Very hard exercise/sports & physical job or 2x training', value: 5 },
];
const genderItems = [
  { label: 'Male', value: 0 },
  { label: 'Female', value: 1 }
]

const injuryItems = [
  { label: 'Yes', value: 1 },
  { label: 'No', value: 0 }
]

const goalsItems = [
  { label: 'Maintain', value: 'Maintain' },
  { label: 'Lose Weight', value: 'Weight Loss' },
  { label: 'Gain Muscle', value: 'Weight Gain' },
];

const fitnessLevelItems = [
  { label: 'Beginner', value: 'Beginner' },
  { label: 'Intermediate', value: 'Intermediate' },
  { label: 'Advanced', value: 'Advanced' },
];

const healthLabelsItems = [
  // {label: 'Select Health Labels', value: '' },
  { label: 'Alcohol-Cocktail', value: 'Alcohol-Cocktail' },
  { label: 'Alcohol-Free', value: 'Alcohol-Free' },
  { label: 'Celery-Free', value: 'Celery-Free' },
  { label: 'Crustcean-Free', value: 'Crustacean-Free' },
  { label: 'Dairy-Free', value: 'Dairy-Free' },
  { label: 'Egg-Free', value: 'Egg-Free' },
  { label: 'Fish-Free', value: 'Fish-Free' },
  { label: 'Gluten-Free', value: 'Gluten-Free' },
  { label: 'Keto-Friendly', value: 'Keto-Friendly' },
  { label: 'Low Sugar', value: 'Low-Sugar' },
  { label: 'Lupine-Free', value: 'Lupine-Free' },
  { label: 'Mustard-Free', value: 'Mustard-Free' },
  { label: 'Peanut-Free', value: 'Peanut-Free' },
  { label: 'Pork-Free', value: 'Pork-Free' },
  { label: 'Red-Meat-Free', value: 'Red-Meat-Free' },
  { label: 'Sesame-Free', value: 'Sesame-Free' },
  { label: 'Soy-Free', value: 'Soy-Free' },
  { label: 'Sugar-Conscious', value: 'Sugar-Conscious' },
  { label: 'Vegan', value: 'Vegan' },
  { label: 'Vegetarian', value: 'Vegetarian' },
  { label: 'Wheat-Free', value: 'Wheat-free' },
]
const InputParameters = () => {

  const navigation = useNavigation()
  const [loaded, setLoaded] = useState(false);
  const [age, setAge] = useState('');
  const [gender, setGender] = useState();
  const [height, setHeight] = useState('')
  const [weight, setWeight] = useState('')
  const [bmi, setBmi] = useState('')
  const [bmiClass, setBmiClass] = useState('')
  const [goals, setGoals] = useState('');
  const [injury, setInjury] = useState();
  const [fitnessLevel, setFitnessLevel] = useState('');
  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(false)
  const [activityLevel, setActivityLevel] = useState('');
  const [calculatedCalorie, setCalculatedCalorie] = useState(null);
  const [selectedHealthLabel, setSelectedHealthLabel] = useState([])

  const getMyObject = async () => {
    try {
      return await AsyncStorage.getItem('user')
    } catch (error) {
      throw new Error(error)
    }
  }

  useFocusEffect(
    React.useCallback(() => {
      const checkAndNavigate = async () => {
        try {
          const userdetails = await getMyObject();
          const parsedData = JSON.parse(userdetails);
          console.log("parsed data", parsedData)
          let data = await fetch(`${default_ip_address}/getInformation?id=${parsedData._id}`,
            { method: 'post' })
          data = await data.json()
          if (data.success === true) {
            console.log(data)
            await AsyncStorage.setItem('userInputs', JSON.stringify(data.data));
            // Check if the parsed data has the expected structure or properties
            // navigation.navigate('WorkoutPrograms');
            navigation.navigate('HomeScreen')
          }
          else{
            setLoaded(true)
          }
        } catch (error) {
          console.error('Error parsing data or navigating:', error);
        }
      };
      checkAndNavigate();
    },[])
  )
  // useEffect(() => {
  //   const checkAndNavigate = async () => {
  //     try {
  //       const userdetails = await getMyObject();
  //       const parsedData = JSON.parse(userdetails);
  //       console.log("parsed data", parsedData)
  //       let data = await fetch(`${default_ip_address}/getInformation?id=${parsedData._id}`,
  //         { method: 'post' })
  //         data = await data.json()
  //         if (data.success === true) {
  //           console.log(data)
  //         await AsyncStorage.setItem('userInputs', JSON.stringify(data.data));
  //         // Check if the parsed data has the expected structure or properties
  //         // navigation.navigate('WorkoutPrograms');
  //         navigation.navigate('HomeScreen')
  //       }
  //     } catch (error) {
  //       console.error('Error parsing data or navigating:', error);
  //     }
  //   };
  //   checkAndNavigate();
  // }, [])

  useEffect(() => {
    calculateBmi()
  }, [height, weight])

  useEffect(() => {
    calculateBmiClass()
  }, [bmi])

  const handleGenderChange = (value) => {
    setGender(value)
    console.log('Selected Gender:', value);
  };

  const handleWeightChange = (value) => {
    setWeight(value);
    calculateBmi();
  };

  const handleHeightChange = (value) => {
    setHeight(value);
    calculateBmi();
  };

  const handleGoalsChange = (value) => {
    setGoals(value)
    console.log('Selected Goals:', value);
  };

  const handleFitnessLevelChange = (value) => {
    setFitnessLevel(value)
    console.log('Selected Fitness Level:', value);
  };

  const handleInjuryChange = (value) => {
    setInjury(value)
    console.log('Selected Injury:', value);
  };

  const handleActivityChange = (value) => {
    setActivityLevel(value);
  };
  const calculateBmi = () => {
    if (height && weight) {
      const height_m = parseFloat(height);
      const weight_kg = parseFloat(weight);
      const calculated_bmi = weight_kg / (height_m ** 2);
      setBmi(calculated_bmi.toFixed(2));
    }
  }
  const handleRemove = (type, value) => {
    if (type === 'healthLabel') {
      setSelectedHealthLabel((prevLabels) => prevLabels.filter((label) => label.value !== value));
    } 
  };

  const handleHealthLabel = (value) => {
    if(!selectedHealthLabel.some((item) => item.value === value)) {
      setSelectedHealthLabel([
          ...selectedHealthLabel,
          { label: healthLabelsItems.find(item => item.value === value).label , value: value}
      ])
    }
  }

  const calculateBmiClass = () => {
    if (bmi) {
      if (bmi >= 29.9) {
        setBmiClass('Obese')
      } else if (bmi >= 24.9 && bmi < 29.9) {
        setBmiClass('Overweight')
      } else if (bmi >= 18.5 && bmi < 24.9) {
        setBmiClass('Normal weight')
      } else if (bmi < 18.5) {
        setBmiClass('Underweight')
      }
    }
  }

  const handleUserInput = async (e) => {
    console.log(gender, age, height, weight, bmi, bmiClass, goals, injury, fitnessLevel)
    try {
      if (gender === undefined || age === '' || height === '' || weight === '' || goals === '' || injury === undefined || fitnessLevel === '' || activityLevel === '' || !weight || weight < 20 || weight > 200 || !age || age < 18 || age > 70 || !height || height < 0.6 || height > 2.7) {
        console.log(gender, age, height, weight, bmi, bmiClass, goals, injury, fitnessLevel)
        setError(true)
        console.log(error)
        console.log(gender, age, height, weight, bmi, bmiClass, goals, injury, fitnessLevel)
        return false
      } else {
        setLoading(true)
        let bmr;
        if (gender === 0) {
          bmr = 10 * weight + 6.25 * (height * 100) - 5 * age + 5;
        } else if (gender === 1) {
          bmr = 10 * weight + 6.25 * (height * 100) - 5 * age - 161;
        }
        let calories;
        if (activityLevel === 1) {
          calories = bmr * 1.2;
        } else if (activityLevel === 2) {
          calories = bmr * 1.375;
        } else if (activityLevel === 3) {
          calories = bmr * 1.55;
        } else if (activityLevel === 4) {
          calories = bmr * 1.725;
        } else if (activityLevel === 5) {
          calories = bmr * 1.9;
        }
        setCalculatedCalorie(calories);
        let userObject = {
          "Gender": gender,
          "Age": age,
          "Height": height,
          "Weight": weight,
          "Bmi": bmi,
          "Bmi_class": bmiClass,
          "Goals": goals,
          "Injury": injury,
          "Current_fitness_level": fitnessLevel,
          "Calories": calories,
          'healthLabels': selectedHealthLabel
        }
        let result = await fetch(`${default_ip_address}/userInput`, {
          method: "post",
          body: JSON.stringify(userObject),
          headers: {
            "Content-Type": "application/json"
          }
        })
        result = await result.json()

        if (result) {
          setLoading(false)
          // await AsyncStorage.setItem('isData', 'abc')
          // navigation.navigate('WorkoutPrograms', {result})
          // userObject=Object.assign({},userObject,{ "calories": calculatedCalorie })
          // console.warn(calculatedCalorie)
          await AsyncStorage.setItem('userInputs', JSON.stringify({ userObject }))

          let user_data = await AsyncStorage.getItem('user')
          let parsed_data = JSON.parse(user_data)
          let user_id = parsed_data._id
          let data_result = await fetch(`${default_ip_address}/generate_workout?id=${user_id}&intensity=${result.Intensity}`, {
            method: 'post',
            body: JSON.stringify({
              age, height, weight, injury, gender, bmi, bmi_class: bmiClass, goal: goals, level: fitnessLevel, calories: calories, healthLabels:selectedHealthLabel
            }),
            headers: {
              "Content-Type": "application/json"
            }
          })
          data_result = await data_result.json()
          if (data_result.success === true) {

            navigation.navigate('HomeScreen', { result })

            setGender('');
            setAge('');
            setHeight('');
            setWeight('');
            setBmi('');
            setBmiClass('');
            setGoals('');
            setInjury('');
            setFitnessLevel('');
          }
          else {
            console.error("Error in entry")
          }

        }
      }
    } catch (error) {
      setLoading(false)
    }
  }

  return (
    
    <View style={styles.container}>
      {loaded && loading ? <Text style={{ color: 'white', fontSize: 16 }}>Generating 28 days workout plan...</Text> :loaded===true?(
        <>
          <Text style={styles.title}>Please Enter the following</Text>

          <View style={styles.halfWidthRow}>
            <View style={styles.halfWidthInput}>
              {error && gender === undefined ? (
                <Text style={{ color: 'red' }}>
                  *Select gender
                </Text>
              ) : (
                ''
              )}
              <CustomDropdown
                items={genderItems}
                placeholder="Select gender"
                onValueChange={handleGenderChange}
              />
            </View>
            <View style={styles.halfWidthInput}>
              {error && (!age || age < 18 || age > 80) ? (
                <Text style={{ color: 'red' }}>
                  *Enter age between 18 and 70
                </Text>
              ) : (
                ''
              )}
              <CustomizedInput
                placeholder="Age"
                value={age}
                setValue={(e) => setAge(e)}
                keyboardType='numeric'
              />
            </View>
          </View>

          <View style={styles.halfWidthRow}>
            <View style={styles.halfWidthInput}>
              {error && (!height || height < 0.6 || height > 2.7) ? (
                <Text style={{ color: 'red' }}>
                  *Enter valid height
                </Text>
              ) : (
                ''
              )}
              <CustomizedInput
                placeholder="Height(m)"
                value={height}
                setValue={(e) => handleHeightChange(e)}
                keyboardType='numeric'
              />
            </View>
            <View style={styles.halfWidthInput}>
              {error && (!weight || weight < 20 || weight > 200) ? (
                <Text style={{ color: 'red' }}>
                  *Enter valid weight
                </Text>
              ) : (
                ''
              )}
              <CustomizedInput
                placeholder="Weight(kg)"
                value={weight}
                setValue={(e) => handleWeightChange(e)}
                keyboardType='numeric'
              />
            </View>
          </View>

          <View style={styles.halfWidthRow}>
            <CustomizedInput
              value={bmi}
              placeholder="BMI"
              style={styles.halfWidthInput}
              keyboardType='numeric'
              type='userparameters'
            />
            <CustomizedInput
              value={bmiClass}
              placeholder="BMI Class"
              style={styles.halfWidthInput}
              type='userparameters'
            />
          </View>

          <View style={styles.halfWidthRow}>
            <View style={styles.halfWidthInput}>
              {error && injury === undefined ? (
                <Text style={{ color: 'red' }}>
                  *Select injury
                </Text>
              ) : (
                ''
              )}
              <CustomDropdown
                label="Injury"
                placeholder="Select Injury"
                items={injuryItems}
                onValueChange={handleInjuryChange}
              />
            </View>
            <View style={styles.halfWidthInput}>
              {error && !goals ? (
                <Text style={{ color: 'red' }}>
                  *Select goals
                </Text>
              ) : (
                ''
              )}
              <CustomDropdown
                label="Goals"
                placeholder="Select Goals"
                items={goalsItems}
                onValueChange={handleGoalsChange}
              />
            </View>
          </View>
          <View style={styles.halfWidthRow}>
            <View style={styles.halfWidthInput}>
              {error && !fitnessLevel ? (
                <Text style={{ color: 'red' }}>
                  *Select fitness level
                </Text>
              ) : (
                ''
              )}
              <CustomDropdown
                label="Fitness Level"
                placeholder="Select Fitness Level"
                items={fitnessLevelItems}
                onValueChange={handleFitnessLevelChange}
                style={styles.fullWidthInput}
              />
            </View>
            <View style={styles.halfWidthInput}>
              {error && !activityLevel ? (
                <Text style={{ color: 'red' }}>
                  *Select activity level
                </Text>
              ) : (
                ''
              )}
              <CustomDropdown
                label="Activity Level"
                items={activityLevelItems}
                placeholder="Select Activity Level"
                onValueChange={handleActivityChange}
                style={styles.fullWidthInput}
              />
            </View>
          </View>
          <AddItem name="Health Label" type={selectedHealthLabel || []} onRemove={(value) => handleRemove('healthLabel', value)} />
          {error && selectedHealthLabel.length === 0 ? (
            <Text style={{ color: 'red', left: -122 }}>
              *Select health level
            </Text>
          ) : (
            ''
          )}
          <CustomDropdown
            label="Health Label"
            items={healthLabelsItems}
            placeholder="Select health labels"
            onValueChange={handleHealthLabel}
            style={styles.fullWidthInput}
          />
          <CustomButton text="Submit" type="PRIMARY" onPress={handleUserInput} />
        </>):''}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    backgroundColor: '#181818',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: 'white',
  },
  fullWidthInput: {
    width: '100%',
    marginBottom: 10,
  },
  halfWidthRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 10,
  },
  halfWidthInput: {
    width: '48%'
  },
});

export default InputParameters