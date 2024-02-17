import { View, Text, StyleSheet, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import Profile from '../../../assets/profile.jpg'
import Feather from 'react-native-vector-icons/Feather'
import { useNavigation } from '@react-navigation/native'

const Header = ({ name }) => {

    const navigation = useNavigation()

    const [currentDate, setCurrentDate] = useState('')

    const getDate = () => {
        let date = new Date().toLocaleDateString()
        setCurrentDate(date)
    }

    useEffect(() => {
        getDate()
    },[])
  
  return (
    <View style={styles.header}>
        <View style={styles.imageContainer}>
            <Image source={Profile} style={styles.image} />
        </View>
        <View style={styles.title}>
            <Text style={styles.heading}>Welcome, {name}</Text>
            <Text style={styles.subHeading}>{currentDate}</Text>
        </View>
        <View>
            <Feather name='bell' size={24} color='#b3b3b3' onPress={() => navigation.navigate('Chatbot')} />
        </View>
    </View>
  )
}

const styles = StyleSheet.create({
    header: {
        paddingHorizontal: 16,
        paddingVertical: 10,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#181818',
    },
    imageContainer: {
        height: 50,
        width: 50,
        borderRadius: 25,
        overflow: 'hidden'
    },
    image: {
        height: '100%',
        width: '100%',
    },
    title: {
        flex: 1,
        justifyContent: 'center',
        paddingHorizontal: 10
    },
    heading: {
        fontWeight: 'bold',
        fontSize: 16,
        color: '#b3b3b3'
    },
    subHeading: {
        fontSize: 10,
        opacity: 0.6,
        color: '#b3b3b3'
    },
})


export default Header