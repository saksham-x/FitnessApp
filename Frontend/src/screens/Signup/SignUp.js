import {
    View,
    Text,
    TextInput,
    StyleSheet,
    ScrollView,
    ImageBackground,
    TextInputComponent,
  } from 'react-native';
import React, {useState} from 'react';
import CustomButton from '../../components/CustomButtons/CustomButton';
import {useNavigation} from '@react-navigation/native';
import { default_ip_address } from '../../constant/constant';
  
  const SignUp = () => {
    const [name, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [age, setAge] = useState('');
    const [phnumber, setPhnumber] = useState('');
    const [countryCode, setCountryCode] = useState('+977');
    const [errors, setErrors] = useState(false);
    const rgexp = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    const[user,setUser]=useState('')
    const navigation = useNavigation();
  
    const onSignUpPressed = async() => {
      if (
        name.length <= 3 ||
        password.length <= 5 ||
        !rgexp.test(email) ||
        age === '' ||
        age <= 13 ||
        age >= 70 ||
        phnumber.length <= 9
      ) {
        setErrors(true);
      } else {
        let phonenumber=countryCode+phnumber;
        let result = await fetch(`${default_ip_address}/register`, {
          method: "post",
          body: JSON.stringify({name, email, phonenumber, age,password }),
          headers: { "Content-Type": "application/json" },
        });
        result = await result.json();
        if (result.success === false) {
          console.warn(result.error)
        } else if (result.success===true) {
          setUser(result.result._id)
          navigation.navigate('OTPConfirmation',{userid:result.result._id});
        }
      }
    };
  
    const onLoginPressed = () => {
      navigation.navigate('LoginScreen');
    };
  
    return (
      <ImageBackground
        source={require('../../../assets/push.jpg')}
        style={styles.backgroundImage}>
        <ScrollView
          contentContainerStyle={styles.scrollview}
          showsVerticalScrollIndicator={false}>
          <View style={styles.root}>
            <Text style={styles.title}>Create an Account</Text>
            {errors && name.length <= 3 ? (
              <Text style={{color: 'red', left: -50}}>
                *Username must be of at least 4 character
              </Text>
            ) : (
              ''
            )}
            <View style={styles.container}>
              <TextInput
                value={name}
                onChangeText={(e) => setUsername(e)}
                placeholder="Username"
                placeholderTextColor="white"
                style={styles.input}
              />
            </View>
          
            {errors && !rgexp.test(email) ? (
              <Text style={{color: 'red', left: -120}}>*Enter a valid email</Text>
            ) : (
              ''
            )}
            <View style={styles.container}>
              <TextInput
                value={email}
                onChangeText={(e) => setEmail(e)}
                placeholder="Email"
                placeholderTextColor="white"
                style={styles.input}
                keyboardType="email-address"
              />
            </View>
            
            {errors && password.length <= 5 ? (
              <Text style={{color: 'red', left: -50}}>
                *Password must be of atleast 6 characters
              </Text>
            ) : (
              ''
            )}
            <View style={styles.container}>
              <TextInput
                value={password}
                onChangeText={(e) => setPassword(e)}
                placeholder="Password"
                placeholderTextColor="white"
                style={styles.input}
                secureTextEntry={true}
              />
            </View>
           
            
            {errors && age === '' ? (
              <Text style={{color: 'red', left: -135}}>*Enter your age</Text>
            ) : (
              ''
            )}
            {errors && age <= 13 && age != '' ? (
              <Text style={{color: 'red', left: -90}}>
                *Age must be greater than 13
              </Text>
            ) : (
              ''
            )}
            {errors && age >= 70 ? (
              <Text style={{color: 'red', left: -100}}>
                *Age must be less than 70
              </Text>
            ) : (
              ''
            )}
            <View style={styles.container}>
              <TextInput
                value={age}
                onChangeText={(e) => setAge(e)}
                placeholder="Age"
                placeholderTextColor="white"
                style={styles.input}
                keyboardType="numeric"
              />
            </View>
            
            {errors && phnumber.length <= 9 ? (
              <Text style={{color: 'red', left: -60, top: 7}}>
                *Phone number should be 10 digit long
              </Text>
            ) : (
              ''
            )}
            <View style={styles.phoneInputContainer}>
              <View style={styles.countryCodeContainer}>
                <View style={styles.container}>
                  <TextInput
                    value={countryCode}
                    onChangeText={(e) => setCountryCode(e)}
                    placeholder="+977"
                    placeholderTextColor="white"
                    style={styles.input}
                  />
                </View>
              </View>
              <View style={styles.phoneNumberContainer}>
                <View style={styles.container}>
                  <TextInput
                    value={phnumber}
                    onChangeText={(e) => setPhnumber(e)}
                    placeholder="Phone Number"
                    placeholderTextColor="white"
                    style={styles.input}
                    keyboardType="numeric"
                  />
                </View>
              </View>
            </View>
            
            <CustomButton text="Regiter" onPress={onSignUpPressed} />
            <CustomButton
              text="Already have an account? Log In"
              onPress={onLoginPressed}
              type="TERTIARY"
            />
          </View>
        </ScrollView>
      </ImageBackground>
    );
  };
  
  const styles = StyleSheet.create({
    backgroundImage: {
      flex: 1,
      resizeMode: 'cover',
    },
    scrollview: {
      flexGrow: 1,
      justifyContent: 'center',
    },
    root: {
      flex: 1,
      alignItems: 'center',
      padding: 20,
      marginTop: 10,
      justifyContent: 'center',
    },
    title: {
      fontSize: 25,
      padding: 20,
      fontWeight: 'bold',
      color: 'white',
    },
    phoneInputContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginTop: 10,
    },
    countryCodeContainer: {
      flex: 1,
      marginRight: 10,
      maxWidth: 80, // Adjust the maximum width as needed
    },
    phoneNumberContainer: {
      flex: 2,
    },
    container: {
      backgroundColor: 'transparent',
      width: '100%',
      borderColor: '#e8e8e8',
      borderWidth: 1,
      borderRadius: 5,
      padding: 10,
      marginVertical: 5,
    },
    input: {
      color: 'white',
    },
  });
  
  export default SignUp;