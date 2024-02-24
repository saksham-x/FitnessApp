import { View, Text, StyleSheet, Image, TouchableOpacity, Pressable, Platform, PermissionsAndroid } from 'react-native'
import React, { useEffect } from 'react'
import smartwatch from '../../assets/smartwatch.png'
import { useNavigation } from '@react-navigation/native'
// import Permissions from '../components/ReactNativeBlePlx/Permissions'
import BleManager from 'react-native-ble-manager';

const SmartwatchStat = () => {
// const permission=Permissions().then((result)=>{
// console.log(result,"here")
// })
  const navigation = useNavigation()
// console.log(permission)
  useEffect(() => {
    // Permissions()
    console.log("running effects")
  }, [])

  const handleConnect = () => {
    navigation.navigate('ScanDevices')
  }
  // useEffect(() => {
  //   console.warn("running effects")

  //   BleManager.start({showAlert:false})
  //   // turn on bluetooth if it is not on
  //   BleManager.enableBluetooth().then(() => {
  //     console.log('Bluetooth is turned on!');
  //   });

  //   if (Platform.OS === 'android' && Platform.Version >= 23) {
  //     PermissionsAndroid.check(
  //       PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
  //     ).then(result => {
  //       if (result) {
  //         console.log('Permission is OK');
  //       } else {
  //         PermissionsAndroid.request(
  //           PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
  //         ).then(result => {
  //           if (result) {
  //             console.log('User accept');
  //           } else {
  //             console.log('User refuse');
  //           }
  //         });
  //       }
  //     });
  //   }
  // }, []);
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