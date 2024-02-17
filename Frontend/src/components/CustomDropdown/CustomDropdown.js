import { View, Text, StyleSheet, TouchableOpacity, FlatList, Platform } from 'react-native'
import React, { useState } from 'react'
import Entypo from 'react-native-vector-icons/Entypo';

const colors = {
  white: 'white',
  grey: '#b3b3b3',
};

const CustomDropdown = ({items, placeholder, onValueChange, type}) => {
  const [selected, setSelectedOption] = useState('')
  const [isClicked, setIsClicked] = useState(false)
  const [value, setValue] = useState('')

  const handleOptionSelect = (label, value) => {
    setSelectedOption(label)
    setIsClicked(false)
    onValueChange(value)
  }

  return (
    <View style={[styles.container, styles[`container_${type}`]]}>
      <TouchableOpacity style={styles.dropdownSelector} onPress={() => setIsClicked(!isClicked)}>
        <Text style={styles.label}>{selected || placeholder}</Text>
        <Entypo name="chevron-down" size={24} color={colors.grey} />
      </TouchableOpacity>
      {isClicked && (
      <View style={styles.dropdownArea}>
        <FlatList 
          data={items}
          renderItem={({ item, index}) => {
            return (
              <TouchableOpacity style={styles.optionItem} onPress={() => handleOptionSelect(item.label, item.value)} >
                  <Text style={styles.labelList}>{item.label}</Text>
              </TouchableOpacity>
            )
          }}
        />
      </View>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        borderWidth: 1,
        borderColor: '#e8e8e8',
        width: '100%',
        borderRadius: 5,
        marginVertical: 4
      },
      // container_userparameters: {
      //   width: '48%'
      // },
      label: {
        fontSize: 16,
        color: 'white'
      },
      labelList:{
        fontSize: 16,
        color: 'white'
      },
      dropdownSelector: {
          width: '100%',
          padding: 10,
          alignSelf: 'center',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
      },
      dropdownArea: {
        alignSelf: 'center',
        width: '90%',
        backgroundColor: 'transparent',
        borderRadius: 10,
      },
      optionContainer: {
        elevation: 1000
      },
      optionItem: {
        width: '85%',
        alignSelf: 'center',
        height: 50,
        justifyContent: 'center',
        borderBottomWidth: 0.5,
        borderColor: '#8e8e8e',
      }
})


export default CustomDropdown