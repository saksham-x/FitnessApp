import { StyleSheet, Text, View, SafeAreaView, Image, ScrollView, ImageBackground, TouchableOpacity } from "react-native";
import React, { useContext, useEffect } from "react";
import FitnessCards from "../../components/Card/FitnessCards";
import { FitnessItems } from "../../components/Context/Context";
import { useNavigation } from "@react-navigation/native";
import { default_ip_address } from '../../constant/constant';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from "@react-navigation/native";

const WorkoutHome = () => {
  const navigation = useNavigation()
  const {
    minutes,
    setMinutes,
    calories,
    setCalories,
    workout,
  } = useContext(FitnessItems);

  const handle30daysworkout = () => {
    navigation.navigate('WorkoutPlan')
  }
  
useFocusEffect(
  React.useCallback(() => {
    const checktodaysprogress = async () => {
      let userData = await AsyncStorage.getItem('user')
      userData = await JSON.parse(userData)
      let data = await fetch(`${default_ip_address}/getTodaysCalorieAndTime?id=${userData._id}`, { method: 'get' })
      data = await data.json();
      if (data.success === true) {
        const min = data.result[0].workout_interval
        const cal = data.result[0].calorieBurnt
        setMinutes(min.toFixed(2))
        setCalories(cal.toFixed(2))
      }
      else {
        setMinutes(0)
        setCalories(0)
      }
    }
    checktodaysprogress()
  }, [])
)
  // useEffect(() => {
 
  //   const checktodaysprogress = async () => {
  //     let userData = await AsyncStorage.getItem('user')
  //     userData = await JSON.parse(userData)
  //     let data = await fetch(`${default_ip_address}/getTodaysCalorieAndTime?id=${userData._id}`, { method: 'get' })
  //     data = await data.json();
  //     if (data.success === true) {
  //       const min = data.result[0].workout_interval
  //       const cal = data.result[0].calorieBurnt
  //       setMinutes(min.toFixed(2))
  //       setCalories(cal.toFixed(2))
  //     }
  //     else{
  //       setMinutes(0)
  //       setCalories(0)
  //     }
  //   }
  //   checktodaysprogress()
  // }, [])

  return (
    <ScrollView style={{ marginTop: 40 }}>
      <View
        style={{
          backgroundColor: "#CD853F",
          padding: 10,
          height: 200,
          width: "100%",
          marginBottom: 50
        }}
      >
        <Text style={{ color: "white", fontWeight: "bold", fontSize: 18, textAlign: 'center' }}>
          HOME WORKOUT
        </Text>

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            marginTop: 20,
          }}
        >
          {/* <View>
            <Text
              style={{
                textAlign: "center",
                fontWeight: "bold",
                color: "white",
                fontSize: 18,
              }}
            >
              {workout}
            </Text>
            <Text style={{ color: "#D0D0D0", fontSize: 17, marginTop: 6 }}>
              WORKOUTS
            </Text>
          </View> */}

          <View style={{
            paddingLeft: 40,
          }}>
            <Text
              style={{
                textAlign: "center",
                fontWeight: "bold",
                color: "white",
                fontSize: 18,
              }}
            >
              {calories}
            </Text>
            <Text style={{ color: "#D0D0D0", fontSize: 17, marginTop: 6 }}>
              KCAL
            </Text>
          </View>

          <View style={{
            paddingRight: 40,
          }}>
            <Text
              style={{
                textAlign: "center",
                fontWeight: "bold",
                color: "white",
                fontSize: 18,
              }}
            >
              {minutes}
            </Text>
            <Text style={{ color: "#D0D0D0", fontSize: 17, marginTop: 6 }}>
              MINS
            </Text>
          </View>
        </View>

        <View style={{ justifyContent: "center", alignItems: "center", marginHorizontal: 10, borderRadius: 5, overflow: 'hidden'}}>
          <TouchableOpacity onPress={handle30daysworkout}>
            <ImageBackground
              style={{
                width: "100%",
                height: 140,
                borderRadius: 5,
                justifyContent: 'center',
              }}
              source={{
                uri: "https://cdn-images.cure.fit/www-curefit-com/image/upload/c_fill,w_842,ar_1.2,q_auto:eco,dpr_2,f_auto,fl_progressive/image/test/sku-card-widget/gold2.png",
              }}
            >
              <Text style={{ color: 'white', fontSize: 36, textAlign: 'center', fontWeight: 'bold', paddingHorizontal: 10 }}>28 Days Workout Plan</Text>
            </ImageBackground>
          </TouchableOpacity>
        </View>
      </View>
      <FitnessCards />
    </ScrollView>
  );
};

export default WorkoutHome;

const styles = StyleSheet.create({});