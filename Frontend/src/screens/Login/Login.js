import { View, Text, TextInput, StyleSheet, ScrollView, ImageBackground,Alert } from 'react-native'
import React, { useState,useEffect } from 'react'

import CustomButton from '../../components/CustomButtons/CustomButton'
import CustomizedInput from '../../components/CustomizedInput/CustomizedInput'

import { useNavigation } from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { default_ip_address } from '../../constant/constant'

const Login = () => {

const [email, setEmail] = useState('')
const [password, setPassword] = useState('')
const [error, setError] = useState(false)

const navigation = useNavigation()

const getMyObject = async () => {
    try {
      return await AsyncStorage.getItem('user')
    } catch(error) {
      throw new Error(error)
    }
  }

useEffect(()=>{
    const checkAndNavigate = async () => {
        try {
          const data = await getMyObject();
    
          if (data) {
            const parsedData = JSON.parse(data);
            console.log("from here", parsedData);
    
            // Check if the parsed data has the expected structure or properties
            if (parsedData) {
              console.log(parsedData)
              // navigation.navigate('HomeScreen');
              navigation.navigate('InputParameters')
            } 
          }
          // navigation.navigate('LoginScreen')
        } catch (error) {
          console.error('Error parsing data or navigating:', error);
        }
      };
      checkAndNavigate();
},[])

const onLogInPressed = async() => {
  if ( email === '' || password === '') {
    setError(true)
  }else {
    console.log(default_ip_address)
    let result = await fetch(`${default_ip_address}/login`, {
        method: "post",
        body: JSON.stringify({email,password}),
        headers: { "Content-Type": "application/json" },
      });
      result = await result.json();
    if(result.success===true){
        await AsyncStorage.setItem('user', JSON.stringify(result.result));
        // navigation.navigate('HomeScreen')
        navigation.navigate('InputParameters')
    }
    else if(result.success===false){
      Alert.alert('Login Error',result.error)
    }
  }
}

const onSignupPressed = () => {
    navigation.navigate("SignUp")
}

const onForgotPasswordPressed = () => {
    navigation.navigate("EmailInput")
}

  return (
    <ImageBackground source={require('../../../assets/push.jpg')} style={styles.backgroundImage}>
    <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollViewContent}>
    <View style={styles.root}>
        <Text style={styles.title}>Log-in</Text>
        {error && email === '' ? (
          <Text style={{color: 'red', left: -130}}>
            *Enter Username
          </Text>
        ) : (
          ''
        )}
        <CustomizedInput placeholder="Email"  value={email} setValue={setEmail} keyboardType="email-address" />
        {error && password === '' ? (
          <Text style={{color: 'red', left: -130}}>
            *Enter Password
          </Text>
        ) : (
          ''
        )}
        <CustomizedInput placeholder="Password"  value={password} setValue={setPassword} secureTextEntry={true} />

        <CustomButton text="Log In" onPress={onLogInPressed} />

        <CustomButton text="Forgot Password?" onPress={onForgotPasswordPressed} type="TERTIARY" />

        <CustomButton text="Don't have an account? Sign Up" onPress={onSignupPressed} type="TERTIARY" />
    </View>
    </ScrollView>
    </ImageBackground>
  )
}

const styles = StyleSheet.create({
    backgroundImage: {
        flex: 1,
        resizeMode: 'cover',
    },
    scrollViewContent: {
        flexGrow: 1,
        justifyContent: 'center',
      },
    root: {
        flex: 1,
        alignItems: 'center',
        padding: 20,
        justifyContent: 'center',
    },
    title: {
        fontSize: 25,
        padding: 20,
        fontWeight: 'bold',
        color: 'white'
    },
})

export default Login