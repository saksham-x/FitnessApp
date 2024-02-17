import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const AddItem = ({ name, type, onRemove }) => {
  return (
    <View>
      <Text>{name}</Text>
      <View style={styles.tagContainer}>
        {type?.map((item) => (
          <View style={styles.tag} key={item.value}>
            <Text style={styles.tagText}>{item.label}</Text>
            <TouchableOpacity
              style={styles.removeButton}
              onPress={() => onRemove(item.value)}
            >
              <Text style={{ color: '#dc1f00', fontSize: 30, fontWeight: 'bold' }}>×</Text>
            </TouchableOpacity>
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  tagContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  tag: {
    backgroundColor: 'transparent',
    borderColor: 'white',
    borderWidth: 1,
    borderRadius: 10,
    paddingVertical: 2,
    paddingHorizontal: 6,
    margin: 5,
    flexDirection: 'row',
    alignItems: 'center',
  },
  tagText: {
    color: 'white',
    marginRight: 5,
  },
  removeButton: {
    backgroundColor: 'transparent',
    padding: 5,
    marginLeft: 5,
  },
});

export default AddItem;
