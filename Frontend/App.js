import React from 'react'

import { NavigationContainer } from '@react-navigation/native'

import StackNavigator from './src/StackNavigation/StackNavigator'

import { FitnessContext } from './src/components/Context/Context'

const App = () => {
  return (
    <FitnessContext>
      <NavigationContainer>
        <StackNavigator />
      </NavigationContainer>
    </FitnessContext>
  )
}

export default App