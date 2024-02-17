import { View, Text, StyleSheet } from 'react-native';
import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CustomizedInput from '../CustomizedInput/CustomizedInput';
import CustomDropdown from '../CustomDropdown/CustomDropdown';
import CustomButton from '../CustomButtons/CustomButton';
import { useNavigation } from '@react-navigation/native';

const activityLevelItems = [
  { label: 'Little or no exercise', value: 1 },
  { label: 'Light exercise/sports 1-3 days/week', value: 2 },
  { label: 'Moderate exercise/sports 3-5 days/week', value: 3 },
  { label: 'Hard exercise/sports 6-7 days a week', value: 4 },
  { label: 'Very hard exercise/sports & physical job or 2x training', value: 5 },
];

const MaintainCalorie = () => {
  const navigation = useNavigation();

  const [dataFromAsyncStorage, setDataFromAsyncStorage] = useState([]);
  const [activityLevel, setActivityLevel] = useState();
  const [calculatedCalorie, setCalculatedCalorie] = useState(null);

  useEffect(() => {
    getDataFromAsyncStorage();
  }, []);

  const getDataFromAsyncStorage = async () => {
    let data = await AsyncStorage.getItem('userInputs');
    console.log('From here',data)
    if(data) {
        setDataFromAsyncStorage([JSON.parse(data)]);
    }else {
        setDataFromAsyncStorage([])
    }
    console.log('Data',dataFromAsyncStorage)
  };

  const calculateBMR = () => {
    let bmr;
    dataFromAsyncStorage.forEach((data) => {
      if (data.Gender === 0) {
        bmr = 10 * data.Weight + 6.25 * (data.Height*100) - 5 * data.Age + 5;
      } else if (data.Gender === 1) {
        bmr = 10 * data.Weight + 6.25 * (data.Height*100) - 5 * data.Age - 161;
      }
    });
    return bmr;
  };

  const calculateCalorie = () => {
    let bmr = calculateBMR();
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
  };

  const handleActivityChange = (value) => {
    setActivityLevel(value);
  };

  const navigateToRecipePage = async () => {
    // navigation.navigate('DietPlan', { calculatedCalorie });
    await AsyncStorage.setItem('userInputs', JSON.stringify(calculatedCalorie))
    navigation.navigate('HomeScreen')
  };

  return (
    <View style={styles.container}>
      {dataFromAsyncStorage.map((item) => (
        <View id={item._id}>
          <Text style={{color: 'white', fontSize: 20}}>Weight: {item.Weight}kg</Text>
          <Text style={{color: 'white', fontSize: 20}}>Height: {item.Height}m</Text>
          <Text style={{color: 'white', fontSize: 20}}>Gender: {item.Gender === 1 ? 'Female' : 'Male'}</Text>
          <Text style={{color: 'white', fontSize: 20}}>Age: {item.Age}</Text>
        </View>
      ))}

      {activityLevel ? <Text style={{color: 'white', fontSize: 20}}>Activity Level: {activityLevel}</Text> : 
      <CustomDropdown
        items={activityLevelItems}
        placeholder="Select your activity level"
        onValueChange={handleActivityChange}
      />
    }

      {!calculatedCalorie && (
      <CustomButton
        type="PRIMARY"
        text="Calculate Maintenance Calorie"
        onPress={calculateCalorie}
      />
      )}

      {calculatedCalorie !== null && (
        <View style={{flexDirection: 'column', alignItems: 'center'}}>
          <Text style={{color: 'white', fontSize: 20}}>{`Your maintenance calorie is: ${calculatedCalorie}`}</Text>
          <CustomButton
            type="PRIMARY"
            text="Next"
            onPress={navigateToRecipePage}
          />
        </View>
      )}
    </View>
  );
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#181818',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20
    }
})
export default MaintainCalorie;
