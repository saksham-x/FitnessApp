import { View, Text, Image, StyleSheet, TouchableWithoutFeedback, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
// import Entypo from 'react-native-vector-icons/Entypo'
import Feather from 'react-native-vector-icons/Feather'
const RecipesCard = ({title, recipe}) => {
  const navigation = useNavigation()
  const handlePress = () => {
    console.log('pressed')
    navigation.navigate('NutritionFacts', { recipe })
  }
  // console.log('here',recipe.calories)
  return (
        <View style={styles.recipeItem}>
            <View style={styles.headingContainer}>
                    <Text style={styles.heading}>{title}</Text>
                    {/* <Entypo name='shuffle' size={20} /> */}
            </View>
            {recipe.image_url && (
                <Image source={{ uri: recipe.image_url }} style={styles.recipeImage} />
            )}
            <Text style={styles.recipeLabel}>{recipe.label}</Text>
            {/* <Text>Source: {recipe.source}</Text> */}
            {/* <Text>Yield: {recipe.yield}</Text> */}
       <Text>Calories: {recipe.calories ? recipe.calories.toFixed(2):''}</Text>
            <Text>Cuisine: {recipe.cuisineType}</Text>
            <Text>Meal Type: {recipe.mealType}</Text>
            {/* <Text style={styles.ingredientsTitle}>Ingredients:</Text>
            <View style={styles.ingredientsList}>
                {recipe?.ingredients && recipe.ingredients.length > 0 ? recipe.ingredients.map((ingredient, index) => (
                <Text key={index} style={styles.ingredientText}>
                    {ingredient.text}
                </Text>
                ))
              : null
              }
            </View> */}
            <TouchableOpacity style={styles.arrow} onPress={handlePress}>
                <Feather name='chevron-right' size={20}/>
            </TouchableOpacity>
        </View>
  );
};

const styles = StyleSheet.create({
  recipeItem: {
    padding: 10,
    marginVertical: 5,
    borderWidth: 1,
    borderColor: '#e8e8e8',
    borderRadius: 5,
    backgroundColor: 'white',
    position: 'relative'
  },
  headingContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10
  },
  recipeImage: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
    borderRadius: 5,
  },
  recipeLabel: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  ingredientsTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 10,
  },
  ingredientsList: {
    marginTop: 5,
  },
  ingredientText: {
    marginBottom: 5,
  },
  arrow: {
    position: 'absolute',
    borderWidth: 2,
    borderColor: '#ccc',
    borderRadius: 100,
    padding: 4,
    bottom: 10,
    right: 10
  }
});

export default RecipesCard;