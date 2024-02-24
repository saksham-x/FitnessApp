import { View, Text, TextInput, StyleSheet } from 'react-native'
import React from 'react'

const CustomizedInput = ({ value, setValue, placeholder, secureTextEntry, keyboardType, editable, type}) => {
  return (
    <View style={[styles.container, styles[`container_${type}`]]}>
        <TextInput  value={value} onChangeText={setValue} placeholder={placeholder} placeholderTextColor="white" style={styles.input} secureTextEntry={secureTextEntry} keyboardType={keyboardType} editable={editable} />
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'transparent',
        width: '100%',
        borderColor: '#e8e8e8',
        borderWidth: 1,
        borderRadius: 5,
        padding: 5,
        marginVertical: 5,
        height: 50
    },
    container_userparameters: {
      width: '48%'
    },
    input: {
      color: 'white'
    }
})

export default CustomizedInput