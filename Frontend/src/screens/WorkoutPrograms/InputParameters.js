import { View, Text, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import CustomDropdown from '../../components/CustomDropdown/CustomDropdown'
import CustomizedInput from '../../components/CustomizedInput/CustomizedInput'
import CustomButton from '../../components/CustomButtons/CustomButton'
import { useNavigation } from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { default_ip_address } from '../../constant/constant'
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

const InputParameters = () => {

  const navigation = useNavigation()

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


  const getMyObject = async () => {
    try {
      return await AsyncStorage.getItem('userInputs')
    } catch (error) {
      throw new Error(error)
    }
  }
  useEffect(() => {
    const checkAndNavigate = async () => {
      try {
        const data = await getMyObject();
        if (data) {
          const parsedData = JSON.parse(data);
          console.log("from here", parsedData);

          // Check if the parsed data has the expected structure or properties
          if (parsedData) {
            // navigation.navigate('WorkoutPrograms');
            navigation.navigate('HomeScreen')
          }
        }
      } catch (error) {
        console.error('Error parsing data or navigating:', error);
      }
    };

    checkAndNavigate();
  }, [])

  useEffect(() => {
    calculateBmi()
    console.warn(bmi)
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
    console.warn('pressed submit')
    console.log(gender, age, height, weight, bmi, bmiClass, goals, injury, fitnessLevel)
    try {
      if (gender === undefined || age === '' || height === '' || weight === '' || goals === '' || injury === undefined || fitnessLevel === '' || activityLevel === '') {
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
          "Current_fitness_level": fitnessLevel
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
          console.warn(userObject)
          userObject=Object.assign({},userObject,{ "calories": calculatedCalorie })
          console.warn(calculatedCalorie)
          await AsyncStorage.setItem('userInputs', JSON.stringify({ userObject }))

          let user_data = await AsyncStorage.getItem('user')
          let parsed_data = JSON.parse(user_data)
          let user_id = parsed_data._id
          console.warn(user_id)
          console.warn(result.Intensity)
          let data_result = await fetch(`${default_ip_address}/generate_workout?id=${user_id}&intensity=${result.Intensity}`, {
            method: 'post',
            body: JSON.stringify({
              age, height, weight, injury, gender, bmi, bmi_class: bmiClass, goal: goals, level: fitnessLevel
            }),
            headers: {
              "Content-Type": "application/json"
            }
          })
          data_result = await data_result.json()
          if (data_result.success === true) {
            console.log("till here")
            console.log("till here")
            console.log("till here")
            console.log("till here")
            console.log("till here")

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
      console.warn('Error: ', error)
      setLoading(false)
    }
  }

  return (
    <View style={styles.container}>
      {loading ? <Text style={{ color: 'white', fontSize: 16 }}>Generating 30 days workout plan...</Text> : (
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
              {error && !age ? (
                <Text style={{ color: 'red' }}>
                  *Enter age
                </Text>
              ) : (
                ''
              )}
              <CustomizedInput
                placeholder="Age"
                value={age}
                setValue={(e) => setAge(e)}
                keyboardType='Numeric'
              />
            </View>
          </View>

          <View style={styles.halfWidthRow}>
            <View style={styles.halfWidthInput}>
              {error && !height ? (
                <Text style={{ color: 'red' }}>
                  *Enter height
                </Text>
              ) : (
                ''
              )}
              <CustomizedInput
                placeholder="Height(m)"
                value={height}
                setValue={(e) => handleHeightChange(e)}
                keyboardType='Numeric'
              />
            </View>
            <View style={styles.halfWidthInput}>
              {error && !weight ? (
                <Text style={{ color: 'red' }}>
                  *Enter weight
                </Text>
              ) : (
                ''
              )}
              <CustomizedInput
                placeholder="Weight(kg)"
                value={weight}
                setValue={(e) => handleWeightChange(e)}
                keyboardType='Numeric'
              />
            </View>
          </View>

          <View style={styles.halfWidthRow}>
            <CustomizedInput
              value={bmi}
              placeholder="BMI"
              style={styles.halfWidthInput}
              keyboardType='Numeric'
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
          <CustomButton text="Submit" type="PRIMARY" onPress={handleUserInput} />
        </>)}
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