import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ImageBackground } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const CongratulationScreen = () => {
  return (
    <ImageBackground source={require('../../../assets/push.jpg')} style={styles.background}>
      <View style={styles.container}>
        <MaterialCommunityIcons name="emoticon-happy-outline" size={100} color="#fff" />
        <Text style={styles.congratulationText}>Congratulations!</Text>
        <Text style={styles.messageText}>You have completed the workout plan successfully.</Text>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('HomeScreen')}>
          <Text style={styles.buttonText}>Back to Home</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  congratulationText: {
    fontSize: 30,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
  },
  messageText: {
    fontSize: 20,
    textAlign: 'center',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#3b71f3',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default CongratulationScreen;
