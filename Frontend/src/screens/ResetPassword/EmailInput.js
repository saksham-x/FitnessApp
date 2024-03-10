// EmailInput.js
import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Alert } from 'react-native';
import CustomButton from '../../components/CustomButtons/CustomButton';
import CustomizedInput from '../../components/CustomizedInput/CustomizedInput';
import { useNavigation } from '@react-navigation/native';
import { default_ip_address } from '../../constant/constant';

const EmailInput = ({ }) => {
  const [email, setEmail] = useState('');

  const navigation = useNavigation()

  const onContinue = async () => {

    let result = await fetch(`${default_ip_address}/forgetpassword`, {
      method: "post",
      body: JSON.stringify({ email }),
      headers: { "Content-Type": "application/json" },
    });
    result = await result.json();
    if (result.success === true) {
      navigation.navigate('OTPConfirmation2', { userid: result.result._id })
    }
    else if (result.success === false) {
      Alert.alert('OTP Error', result.error)
    }
  };


  return (
    <View style={styles.root}>
      <Text style={styles.title}>Enter Your Email</Text>
      <Text style={styles.subtitle}>Please enter your email to proceed with the password reset.</Text>
      <CustomizedInput
        value={email}
        setValue={setEmail}
        placeholder="Email"
        style={styles.input}
        keyboardType="email-address"
      />
      <CustomButton text="Continue" onPress={onContinue} />
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    alignItems: 'center',
    padding: 20,
    justifyContent: 'center',
    backgroundColor: 'black'
  },
  title: {
    fontSize: 25,
    fontWeight: 'bold',
    marginBottom: 20,
    color: 'white'
  },
  subtitle: {
    textAlign: 'center',
    marginBottom: 20,
    color: 'white'
  },
  input: {
    backgroundColor: 'white',
    width: '100%',
    borderColor: '#e8e8e8',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginVertical: 10,
  },
});

export default EmailInput;