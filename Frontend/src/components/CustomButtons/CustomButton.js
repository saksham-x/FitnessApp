import { View, Text, StyleSheet, Pressable } from 'react-native'
import React from 'react'

const CustomButton = ({ onPress, text, type = 'PRIMARY', bgColor, fgColor }) => {
  return (
    <Pressable 
        style={[
            styles.container, 
            styles[`container_${type}`], 
            bgColor ? {backgroundColor: bgColor} : {}
        ]}
        onPress={onPress}
    >
        <Text 
            style={[
                styles.text, 
                styles[`text_${type}`],
                fgColor ? {color: fgColor} : {}
            ]}
        >
            {text}
        </Text>
    </Pressable>
  )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        padding: 10,
        marginVertical: 5,
        alignItems: 'center',
        borderRadius: 5,
    },
    container_PRIMARY: {
        backgroundColor: '#3b71f3'
    },
    container_SECONDARY: {
        borderColor: '#3b71f3',
        borderWidth: 2
    },
    container_TERTIARY: {

    },
    text: {
    },
    text_PRIMARY: {
        color: 'white',
        fontWeight: 'bold'
    },
    text_TERTIARY: {
        color: 'white'
    },
    text_SECONDARY: {
        color: '#3b71f3'
    }
})

export default CustomButton