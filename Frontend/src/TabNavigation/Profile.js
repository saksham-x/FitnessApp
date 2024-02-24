import { View, Text, StyleSheet, Image, Dimensions, Pressable, useAnimatedValue } from 'react-native'
import React, { useState, useEffect } from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons'
import Feather from 'react-native-vector-icons/Feather'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import { useNavigation } from '@react-navigation/native'
import profile from '../../assets/profile.jpg'

import AsyncStorage from '@react-native-async-storage/async-storage'

const size = 24
const color = '#b3b3b3'
const logoutColor = '#d1001f'
let width = Dimensions.get('window').width; //full width
let height = Dimensions.get('window').height; //full height

const Profile = () => {
  const navigation = useNavigation()
const [name,setName]=useState('')
  const [enableDarkTheme, setEnableDarkTheme] = useState(true)
  useEffect(()=>{
async function getId(){
let data=await AsyncStorage.getItem('user')
data=await JSON.parse(data)
  setName(data.name)
}
getId()
  },[])

  const handleLogout = async () => {
   await AsyncStorage.removeItem('user')
   await AsyncStorage.removeItem('userInputs')
    // let data = await AsyncStorage.getItem('user')
    // let parsedData = JSON.parse(data)
    // console.log('from here',parsedData)
    navigation.navigate('LoginScreen')
  }

  return (
    <View style={styles.container}>
      <View style={styles.upperView}>
      <View style={styles.imageContainer}>
        <Image source={profile} style={styles.image} />
      </View>
      <Text style={styles.textName}>{name}</Text>
      </View>
      <View style={styles.lowerView}>
        <Pressable
          onPress={() => console.warn('Pressed')}
          style={({ pressed }) => [
            {
              backgroundColor: pressed ? '#282828' : '#181818'
            },
            styles.iconView,
            styles.iconExceptDarkMode
          ]}
        >
            <Ionicons name='person-outline' size={size} color={color}  />
            <Text style={styles.menuText}>Edit Profile</Text>
        </Pressable>
        {/* <Pressable
          onPress={() => console.warn('Pressed')}
          style={({ pressed }) => [
            {
              backgroundColor: pressed ? '#282828' : '#181818'
            },
            styles.iconView,
            styles.iconExceptDarkMode
          ]}
        >
            <Feather name='bell' size={size} color={color}  />
            <Text  style={styles.menuText}>Notifications</Text>
        </Pressable> */}
        <Pressable
                  onPress={handleLogout}
                  style={({ pressed }) => [
                    {
                      backgroundColor: pressed ? '#282828' : '#181818'
                    },
                    styles.iconView,
                    styles.iconExceptDarkMode
                  ]}
        >
          <MaterialIcons name='logout' size={size} color={logoutColor} />
          <Text style={[styles.menuText, styles.logoutText]}>Logout</Text>
        </Pressable>
        <View style={styles.darkModeView}>
            <View style={styles.iconView}>
            <Feather name='eye' size={size} color={color} />
            <Text style={styles.menuText}>Dark Theme</Text>
            </View>
            <View style={{paddingHorizontal: 16}}>
              <FontAwesome name={enableDarkTheme ? 'toggle-on' : 'toggle-off'} size={size} color={color} onPress={() => setEnableDarkTheme((prev) => !prev)} />
            </View>
        </View>
      </View>
    </View>
  )
}

export default Profile

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#181818',
    },
    upperView: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center'
    },
    imageContainer: {
      height: 120,
      width: 120,
      borderRadius: 100,
      overflow: 'hidden',
      borderWidth: 1,
      marginBottom: 10,
    },
    image: {
      height: '100%',
      width: '100%',
    },
    textName: {
      fontSize: 18,
      color: '#b3b3b3'
    },
    lowerView: {
      flex: 2,
      width: width,
      padding: 20
    },
    iconView: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: 10,
      paddingVertical: 20,
      gap: 20,
    },
    iconExceptDarkMode: {
      borderBottomWidth: 1,
      borderBottomColor: '#b3b3b3',
    },  
    menuText: {
      fontSize: 16,
      color: '#b3b3b3'
    },
    darkModeView: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      borderBottomWidth: 1,
      borderBottomColor: '#b3b3b3',
    },
    logoutText: {
      color: '#d1001f'
    }
  });