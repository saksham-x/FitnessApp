import { View, Text } from 'react-native'
import React from 'react'
import Recipes from './Recipes'
import Recipess from './Recipes22'

const DietPlan = ({ route }) => {

  const result = route.params?.calculatedCalorie

  return (
    <View style={{flex: 1, backgroundColor: '#181818'}}>
    <Recipess calculatedCalorie={result} />
    </View>
  )
}

export default DietPlan