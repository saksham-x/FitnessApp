import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import CustomButton from '../../components/CustomButtons/CustomButton';
import CustomizedInput from '../../components/CustomizedInput/CustomizedInput';
import { useNavigation,useRoute } from '@react-navigation/native';
import { default_ip_address } from '../../constant/constant';

const ResetPassword = () => {
  const [password, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [err,setErrors]=useState(false);
  const navigation = useNavigation()
  const route=useRoute();
  const userid=route.params?.userid;

  const onResetPassword =async () => {
    if (
      password!=confirmPassword ||
      password.length <= 5 || confirmPassword.length<=5
    ) {
      setErrors(true);
    }
    else{
      let result = await fetch(`${default_ip_address}/resetpassword?id=${userid}`, {
        method: "post",
        body: JSON.stringify({password }),
        headers: { "Content-Type": "application/json" },
      });
      result = await result.json();
      if(result.success===true){
         navigation.navigate('LoginScreen')
      }
      else if(result.success===false){
        console.warn(result.error)
      }
    }
  };

  const onBackToEmailPressed = () => {
    navigation.navigate('EmailInput')
  }

  return (
    <View style={styles.root}>
      <Text style={styles.title}>Reset Password</Text>
      <Text style={styles.subtitle}>Please enter your new password and confirm it below.</Text>
      {err && password?.length <= 5 ? (
            <Text style={{color: 'red', left: -50}}>
              *Password must be of atleast 6 characters
            </Text>
          ) :err&& confirmPassword!=password ?(
            <Text style={{color: 'red', left: -80}}>
              *Both field must have same value
            </Text>
          ):(
            ''
          )}
      <CustomizedInput
        value={password}
        setValue={setNewPassword}
        placeholder="New Password"
        style={styles.input}
        secureTextEntry={true}
      />
      {err && confirmPassword?.length <= 5 ? (
            <Text style={{color: 'red', left: -50}}>
              *Password must be of atleast 6 characters
            </Text>
          ) :err&& confirmPassword!=password ?(
            <Text style={{color: 'red', left: -50}}>
              *Both field must have same value
            </Text>
          ):''}
      <CustomizedInput
        value={confirmPassword}
        setValue={setConfirmPassword}
        placeholder="Confirm Password"
        style={styles.input}
        secureTextEntry={true}
      />
      <CustomButton text="Reset Password" onPress={onResetPassword} />
      <CustomButton text="Back to enter Email" onPress={onBackToEmailPressed} />
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    alignItems: 'center',
    padding: 20,
    justifyContent: 'center',
    backgroundColor: 'black',
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

export default ResetPassword;