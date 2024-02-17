import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import CustomButton from '../../components/CustomButtons/CustomButton';
import CustomizedInput from '../../components/CustomizedInput/CustomizedInput';
import { useNavigation,useRoute } from '@react-navigation/native';
import { default_ip_address } from '../../constant/constant';

const OTPConfirmation2 = () => {
  const [otp, setOTP] = useState('');
  const[err,setError]=useState(false)
  const navigation = useNavigation()
  const route=useRoute()
  const userid=route.params?.userid;
  // console.warn(userid)
  const onResendOTP = async() => {
    let result = await fetch(`${default_ip_address}/resendotp?id=${userid}`, {
      method: "post"});
    result=await result.json();
    if(result.success===true){
      setError(false)
    }
  };

  const onVerifyOTP = async() => {
    let result = await fetch(`${default_ip_address}/otpverify?id=${userid}`, {
        method: "post",
        body: JSON.stringify({otp}),
        headers: { "Content-Type": "application/json" },
      });
      result=await result.json();
      if(result.success===true){
         navigation.navigate('ResetPassword',{userid:userid})
      }
      else if(result.success===false){
        console.warn("Wrong OTP")
        setError(true)
      }
  };

  return (
    <View style={styles.root}>
      <Text style={styles.title}>OTP Confirmation</Text>
      <Text style={styles.subtitle}>A One-Time Password (OTP) has been sent to your email address. Please enter it below to verify.</Text>
      {err===false?(
        <>
        <CustomizedInput
        value={otp}
        setValue={setOTP}
        placeholder="Enter OTP"
        style={styles.input}
        keyboardType="numeric"
      />
      <CustomButton text="Verify OTP" onPress={onVerifyOTP} />
        </>
      )
      :''}
      
      <CustomButton text="Resend OTP" onPress={onResendOTP} type="SECONDARY" />

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
  resendText: {
    color: 'blue',
    textDecorationLine: 'underline',
    marginTop: 10,
  },
});

export default OTPConfirmation2;