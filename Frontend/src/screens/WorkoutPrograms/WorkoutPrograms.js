import { View, Text, ScrollView, Dimensions, StyleSheet } from 'react-native'
import React from 'react'
import Home from './WorkoutHome'

const WorkoutPrograms = ({ route }) => {

  const result = route.params?.result

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
    <View style={styles.container}>
      {/* {result && (
        <View>
          <Text style={{fontSize: 32, textAlign: 'center'}}>Intensity: {result.Intensity}</Text>
        </View>
      )} */}
      <Home />
    </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#181818',
    alignItems: 'center',
    justifyContent: 'center',
  },
})

export default WorkoutPrograms