import { View, Text, StyleSheet, Image, FlatList, ScrollView } from 'react-native'
import React from 'react'
import icon from '../../../assets/icon.png'
import Entypo from 'react-native-vector-icons/Entypo'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import PieChart from 'react-native-pie-chart'

const NutritionFacts = ({ route }) => {
  const result = route.params?.recipe
  console.log('Result', result)
  const widthAndHeight = 160
  let fat = result.totalNutrients.FAT.quantity.toFixed(2)
  let fatPercent = fat / 100
  let carbs = result.totalNutrients.CHOCDF.quantity.toFixed(2)
  let carbsPercent = carbs / 100
  let protein = result.totalNutrients.PROCNT.quantity.toFixed(2)
  let proteinPercent = protein / 100
  console.log("fat", fat)
  const series = [fat, carbs, protein]
  const sliceColor = ['#f14647', '#ffbe61', '#6acc00']
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.container}>
        <View style={styles.imageContainer}>
          <Image source={{ uri: result.image_url }} style={styles.icon} />
          <Text style={styles.title}>{result.label}</Text>
        </View>
        <View style={styles.statsContainer}>
          <View style={styles.totalCaloriesContainer}>
            <Text style={styles.heading}>{result.calories.toFixed(2)}</Text>
            <Text style={styles.heading}>calories</Text>
          </View>
          <PieChart
            widthAndHeight={widthAndHeight}
            series={series}
            sliceColor={sliceColor}
            doughnut={true}
            coverRadius={0.7}
            coverFill={'#FFF'}
          />
          <View style={styles.statsPercent}>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}><Entypo name='dot-single' color={'#f14647'} size={50} /><Text style={{ marginLeft: -14, color: 'white' }}>{fatPercent.toFixed(2)}% Fat</Text></View>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}><Entypo name='dot-single' color={'#ffbe61'} size={50} /><Text style={{ marginLeft: -14, color: 'white' }}>{carbsPercent.toFixed(2)}% Carbs</Text></View>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}><Entypo name='dot-single' color={'#6acc00'} size={50} /><Text style={{ marginLeft: -14, color: 'white' }}>{proteinPercent.toFixed(2)}% Proteins</Text></View>
          </View>
        </View>
        <View style={styles.statsTable}>
          <View style={styles.fatsContainer}>
            <Text style={styles.nutrientTitle}>Fat</Text>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingRight: 20 }}><Entypo name='dot-single' color={'#f14647'} size={50} /><Text style={{ marginLeft: -14 }}>{fat}g</Text></View>
          </View>
          <View style={styles.carbsContainer}>
            <Text style={styles.nutrientTitle}>Carbs</Text>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingRight: 20 }}><Entypo name='dot-single' color={'#ffbe61'} size={50} /><Text style={{ marginLeft: -14 }}>{carbs}g</Text></View>

          </View>
          <View style={styles.proteinsContainer}>
            <Text style={styles.nutrientTitle}>Protein</Text>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingRight: 20 }}><Entypo name='dot-single' color={'#6acc00'} size={50} /><Text style={{ marginLeft: -14 }}>{protein}g</Text></View>
          </View>
        </View>
        <View style={styles.nutritionClaimsContainer}>
          <Text style={styles.heading}>Nutrition Claims</Text>

          <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 3 }}>
            {result.healthLabels.map((item, index) => (
              <View key={index} style={{ flexDirection: 'row', alignItems: 'center', gap: 2 }}>
                <FontAwesome name='circle' color={'#fff'} size={4} />
                <Text style={{ color: 'white', marginRight: 3 }}>{item}</Text>
              </View>
            ))}
          </View>
        </View>
        <View style={styles.nutritionFactContainer}>
          <Text style={styles.heading}>Nutrition Facts</Text>
          <View style={styles.servingSizeCaloriesContainer}>
            <View style={styles.nutritionFactContainerViews}>
              <Text style={styles.subHeading}>Serving Size</Text>
              <Text style={styles.subHeading}>100 Gram</Text>
            </View>
            <View style={styles.nutritionFactContainerViews}>
              <Text style={styles.subHeading}>Calories</Text>
              <Text style={styles.subHeading}>{result.calories.toFixed(2)}</Text>
            </View>
          </View>
          <View style={styles.nutrientsContainer}>
            <View style={styles.nutritionFactContainerViews}>
              <Text style={styles.subHeading}>Total Fat</Text>
              <Text style={styles.subHeading}>{fat}g</Text>
            </View>
            <View style={styles.nutritionFactContainerViews}>
              <Text style={styles.subHeading}>Cholesterol</Text>
              <Text style={styles.subHeading}>{result.totalNutrients.CHOLE.quantity.toFixed(2)}mg</Text>
            </View>

            <View style={styles.nutritionFactContainerViews}>
              <Text style={styles.subHeading}>Sodium</Text>
              <Text style={styles.subHeading}>{result.totalNutrients.NA.quantity.toFixed(2)}mg</Text>
            </View>
            <View style={styles.nutritionFactContainerViews}>
              <Text style={styles.subHeading}>Total Carbohydrate</Text>
              <Text style={styles.subHeading}>{carbs}g</Text>
            </View>
            <View style={styles.nutritionFactContainerViews}>
              <Text style={styles.subHeading}>Protein</Text>
              <Text style={styles.subHeading}>{protein}g</Text>
            </View>
          </View>
          <View style={styles.ingredientContainer}>
            {result?.ingredients && result.ingredients.length > 0 ?
              (
                <Text style={styles.heading}>Ingredients</Text>
              )
              : ''}
            <View style={styles.ingredientsList}>
              {result?.ingredients && result.ingredients.length > 0 ? result.ingredients.map((ingredient, index) => (
                <Text key={index} style={styles.ingredientText}>
                  {ingredient.text}
                </Text>
              ))
                : null
              }
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#181818'
  },
  imageContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    width: 50,
    height: 50,
    marginRight: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white'
  },
  statsContainer: {
    marginVertical: 10,
    alignItems: 'center',
  },
  totalCaloriesContainer: {
    width: 110,
    height: 110,
    borderRadius: 200,
    zIndex: 10,
    position: 'absolute',
    left: '34.4%',
    top: '11.2%',
    alignItems: 'center',
    backgroundColor: '#181818',
    justifyContent: 'center'
  },
  valueSuffix: {
    fontSize: 16,
    marginTop: 5,
    paddingHorizontal: 5,
    color: 'white'
  },
  progressValue: {
    fontSize: 30,
    color: 'white'
  },
  statsPercent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  statsTable: {
    backgroundColor: '#ccc',
    borderRadius: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  fatsContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRightWidth: 2,
    borderColor: '#181818',
    marginRight: 5,
    paddingHorizontal: 22,
    width: '33.33%',
    paddingTop: 10
  },
  carbsContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '33.33%',
    paddingTop: 10
  },
  proteinsContainer: {
    borderLeftWidth: 2,
    borderColor: '#181818',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 22,
    width: '33.33%',
    paddingTop: 10
  },
  nutrientTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  nutrientQty: {
    fontSize: 14,
  },
  nutritionClaimsContainer: {
    marginBottom: 16
  },
  nutritionFactContainer: {

    padding: 20,
  },
  nutrientsContainer: {
    borderWidth: 1,
    borderRadius: 16,
    borderColor: '#fff',
  },
  nutritionFactContainerViews: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5
  },
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
    color: 'white'
  },
  subHeading: {
    fontSize: 16,
    color: 'white'
  },
  ingredientsList: {
    marginTop: 5,
  },
  ingredientText: {
    marginBottom: 5,
    color: 'white'
  },
});

export default NutritionFacts