import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'

const Workout30days = () => {

    const [userInput, setUserInputs] = useState([])

    const getObj = async () => {
        let data = await AsyncStorage.getItem('userInputs')
        if(data) {
            let parsedData = JSON.parse(data)
            setUserInputs([parsedData])
        }
    }

    useEffect(() => {
        getObj()
    },[])
  return (
    <View>
      {userInput.map((item) => (
        <Text style={{fontSize: 30, textAlign: 'center'}}>Your workout intensity is {item.Intensity}</Text>
      ))}
    </View>
  )
}

export default Workout30days