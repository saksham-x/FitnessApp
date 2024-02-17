import { View, Text, StyleSheet, Image, TouchableOpacity, Pressable } from 'react-native'
import React, { useEffect } from 'react'
import smartwatch from '../../assets/smartwatch.png'
import { useNavigation } from '@react-navigation/native'

const SmartwatchStat = () => {

  const navigation = useNavigation()

  const handleConnect = () => {
    navigation.navigate('SmartWatchDetails')
  }

  return (
    <View style={styles.container}>
      <Image source={smartwatch} style={styles.smartwatchIcon} />
      <Text style={styles.title}>Connect Your Smartwatch</Text>
      <Text style={styles.subtitle}>Get started by connecting your smartwatch to the app.</Text>
      <TouchableOpacity style={styles.connectButton} onPress={handleConnect}>
        <Text style={styles.connectButtonText}>Connect Now</Text>
      </TouchableOpacity>
    </View>
  )
}

export default SmartwatchStat

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#181818',
      alignItems: 'center',
      justifyContent: 'center',
    },
    smartwatchIcon: {
      width: 240,
      height: 240,
      marginBottom: 20,
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 10,
      color: '#b3b3b3'
    },
    subtitle: {
      fontSize: 16,
      color: '#777',
      textAlign: 'center',
      marginBottom: 30,
    },
    connectButton: {
      backgroundColor: '#5072A7',
      padding: 20,
      borderRadius: 35,
    },
    connectButtonText: {
      color: 'white',
      fontSize: 18,
    },
  });