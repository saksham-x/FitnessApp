import React, { useState,useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import smartwatch from '../../../assets/smartwatch.png'
import SmartWatchDetails from './SmartWatchDetails';
// import Permissions from '../../components/ReactNativeBlePlx/Permissions'
import BleManager from 'react-native-ble-manager';

const ConnectedSmartwatchScreen = () => {
  const [connected, setConnected] = useState(true);
  // const permission=Permissions()
  useEffect(()=>{
    console.log("running effects")
  },[])


  const handleDisconnect = () => {
    setConnected(false);
    // Add logic to disconnect from the smartwatch
  };

  return (
    <View style={styles.container}>
      {connected ? (
        <SmartWatchDetails />
      ) : (
        <View>
          <Image source={smartwatch} style={styles.smartwatchIcon} />
          <Text style={styles.title}>Smartwatch Disconnected</Text>
          <TouchableOpacity style={styles.connectButton} onPress={() => setConnected(true)}>
            <Text style={styles.connectButtonText}>Reconnect</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f2f2f2',
  },
  smartwatchIcon: {
    width: 120,
    height: 120,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  connectButton: {
    backgroundColor: '#007bff',
    padding: 10,
    borderRadius: 25,
  },
  connectButtonText: {
    color: 'white',
    fontSize: 18,
  },
  disconnectButton: {
    backgroundColor: '#ff0000',
    padding: 10,
    borderRadius: 25,
  },
  disconnectButtonText: {
    color: 'white',
    fontSize: 18,
  },
});

export default ConnectedSmartwatchScreen;
