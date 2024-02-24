import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  Pressable,
} from "react-native";
import React, { useState, useContext, useEffect, useRef } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { FitnessItems } from "../../components/Context/Context";
import { default_ip_address } from "../../constant/constant";
// import {  } from 'react-use';
import { useFocusEffect } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const FitScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const startTime=new Date()
  const [showDone, setShowDone] = useState(false)
  const [timer, setTimer] = useState()
  const [index, setIndex] = useState(0);
  const exercises = route.params.exercises;
  const intensity = route.params.intensity;
  const api_call = route.params.api_call;
const[userId,setUserId]=useState()
  const current = exercises[index];
  const timerRef = useRef()
  useFocusEffect(
    React.useCallback(() => {
      if (current.reps) {
        setShowDone(true)
        setTimer()
      }
      else if (current.time) {
        setShowDone(false)
        setTimer(current.time)
      }
return()=>{}
    }, [index])
  )
  // useFocusEffect(() => {

  //   if (current.reps) {
  //     console.warn("reps are there")
  //     setShowDone(true)
  //     setTimer()
  //   }
  //   else if (current.time) {
  //     console.warn("time are there")
  //     setShowDone(false)
  //     setTimer(current.time)
  //   }
  // }, [navigation])

  const startCountdown = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    timerRef.current = setTimeout(async() => {
      if (timer && timer >= 0) {
        setTimer(prevTimer => prevTimer - 1)
        startCountdown()
      }
      else {
        if (timer <= 0 && index + 1 >= exercises.length) {
          if (intensity !== null) {
            if (api_call !== null) {
              if (api_call === true) {
                navigation.navigate("WorkoutFeedback", {
                  intensity: intensity
                });
              }
              else if (api_call === false) {
                navigation.navigate("WorkoutHome");
              }
            }
          }
          else {
            navigation.navigate("WorkoutHome");
          }
        }
        else if (timer <= 0 && index + 1 < exercises.length) {
          console.log(current.time)
          let data = await fetch(`${default_ip_address}/updateTodaysCalorieAndTime?id=${userId}`, {
            method: "post",
            body: JSON.stringify({ calorie: 6.3, time: (current.time / 60) }),
            headers: { "Content-Type": "application/json" },
          })
          data=await data.json()
          navigation.navigate("RestScreen");
          setCompleted([...completed, current.name]);
          setWorkout(workout + 1);
          setMinutes(minutes + (current.time/60));
          setCalories(calories + current.calorie);
          setTimeout(() => {
            setIndex(index + 1);
          }, 1000);
        }
      }
    }, 1000)
  }
  useEffect(() => {
    startCountdown();
    return () => clearTimeout(timerRef.current)
  }, [timer]);
useEffect(()=>{
  const getUserData = async () => {
    let userData = await AsyncStorage.getItem('user')
    userData = await JSON.parse(userData)
    setUserId(userData._id)
  }
  getUserData()
},[])
  const {
    completed,
    setCompleted,
    minutes,
    setMinutes,
    calories,
    setCalories,
    setWorkout,
    workout,
  } = useContext(FitnessItems);
  return (
    <SafeAreaView>
      <Image
        style={{ width: "100%", height: 370 }}
        source={{ uri: `${default_ip_address}${current.gif_path}` }}
      />

      <Text
        style={{
          marginLeft: "auto",
          marginRight: "auto",
          marginTop: 30,
          fontSize: 30,
          fontWeight: "bold",
        }}
      >
        {current.name.toUpperCase()}
      </Text>
      {timer ? (
        <Text
          style={{
            marginLeft: "auto",
            marginRight: "auto",
            marginTop: 30,
            fontSize: 30,
            fontWeight: "bold",
          }}
        >
          {timer}
        </Text>

      ) : ''}
      <Text
        style={{
          marginLeft: "auto",
          marginRight: "auto",
          marginTop: 30,
          fontSize: 38,
          fontWeight: "bold",
        }}
      >
        {current.reps ? `x${current.reps}` : `${current.time}sec`}
      </Text>
      {showDone === true && index + 1 >= exercises.length ? (
        <Pressable
          onPress={() => {
            if (intensity !== null) {
              if (api_call !== null) {
                if (api_call === true) {
                  navigation.navigate("WorkoutFeedback", {
                    intensity: intensity
                  });
                }
                else if (api_call === false) {
                  navigation.navigate("WorkoutHome");
                }
              }
            }
            else {
              navigation.navigate("WorkoutHome");
            }
          }}
          style={{
            backgroundColor: "blue",
            marginLeft: "auto",
            marginRight: "auto",
            marginTop: 30,
            borderRadius: 20,
            padding: 10,
            width: 150,
          }}
        >
          <Text
            style={{
              textAlign: "center",
              fontWeight: "bold",
              fontSize: 20,
              color: "white",
            }}
          >
            DONE
          </Text>
        </Pressable>
      ) : showDone === true && index + 1 < exercises.length ? (
        <Pressable
          onPress={async() => {
            const finishTime=new Date()
            const workout_interval = (finishTime - startTime)/1000
            let data = await fetch(`${default_ip_address}/updateTodaysCalorieAndTime?id=${userId}`,{
              method:"post",
              body: JSON.stringify({ calorie :6.3,time:(workout_interval/60)}),
              headers: { "Content-Type": "application/json" },
            })
            navigation.navigate("RestScreen");
            setCompleted([...completed, current.name]);
            setWorkout(workout + 1);
            setMinutes(minutes + (workout_interval/60));
              setCalories(calories + (current.calorie*current.reps));
            setTimeout(() => {
              setIndex(index + 1);
            }, 2000);
          }}
          style={{
            backgroundColor: "blue",
            marginLeft: "auto",
            marginRight: "auto",
            marginTop: 30,
            borderRadius: 20,
            padding: 10,
            width: 150,
          }}
        >
          <Text
            style={{
              textAlign: "center",
              fontWeight: "bold",
              fontSize: 20,
              color: "white",
            }}
          >
            DONE
          </Text>
        </Pressable>
      ) : ''}

      {/* <Pressable
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginLeft: "auto",
            marginRight: "auto",
            marginTop: 50,
          }}
        >
          <Pressable
            disabled={index === 0}
            onPress={() => {
              navigation.navigate("RestScreen");
  
              setTimeout(() => {
                setIndex(index - 1);
              }, 2000);
            }}
            style={{
              backgroundColor: "green",
              padding: 10,
              borderRadius: 20,
              marginHorizontal: 20,
              width: 100,
            }}
          >
            <Text
              style={{ color: "white", fontWeight: "bold", textAlign: "center" }}
            >
              PREV
            </Text>
          </Pressable>
          {index + 1 >= exercises.length ? (
            <Pressable
              onPress={() => {
                navigation.navigate("WorkoutHome");
              }}
              style={{
                backgroundColor: "green",
                padding: 10,
                borderRadius: 20,
                marginHorizontal: 20,
                width: 100,
              }}
            >
              <Text
                style={{
                  color: "white",
                  fontWeight: "bold",
                  textAlign: "center",
                }}
              >
                SKIP
              </Text>
            </Pressable>
          ) : (
            <Pressable
              onPress={() => {
                navigation.navigate("RestScreen");
  
                setTimeout(() => {
                  setIndex(index + 1);
                }, 2000);
              }}
              style={{
                backgroundColor: "green",
                padding: 10,
                borderRadius: 20,
                marginHorizontal: 20,
                width: 100,
              }}
            >
              <Text
                style={{
                  color: "white",
                  fontWeight: "bold",
                  textAlign: "center",
                }}
              >
                SKIP
              </Text>
            </Pressable>
          )}
        </Pressable> */}
    </SafeAreaView>
  );
};

export default FitScreen;

const styles = StyleSheet.create({});
