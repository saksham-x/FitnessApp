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

const FitScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const [showDone, setShowDone] = useState(false)
  const [timer, setTimer] = useState()
  const [index, setIndex] = useState(0);
  const exercises = route.params.exercises;
  const intensity = route.params.intensity;
  const api_call = route.params.api_call;

  console.log('from fitsccree', exercises)
  const current = exercises[index];
  const timerRef = useRef()
  useFocusEffect(
    React.useCallback(() => {
      console.warn(index)
      console.warn(index)
      console.warn(index)
      console.warn(index)
      console.warn(index)
      console.warn(index)
      console.warn(index)

      if (current.reps) {
        console.warn("reps are there")
        setShowDone(true)
        setTimer()
      }
      else if (current.time) {
        console.warn("time are there")
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
    timerRef.current = setTimeout(() => {
      console.warn(timer)
      if (timer && timer >= 0) {
        setTimer(prevTimer => prevTimer - 1)
        startCountdown()
      }
      else {
        console.warn(timer)
        if (timer <= 0 && index + 1 >= exercises.length) {
          if (intensity !== null) {
            if (api_call !== null) {
              if (api_call === true) {
                console.warn("api_call true workouthome navigation")
                navigation.navigate("WorkoutFeedback", {
                  intensity: intensity
                });
              }
              else if (api_call === false) {
                console.warn("api_call false workouthome navigation")

                navigation.navigate("WorkoutHome");
              }
            }
          }
          else {
            console.warn("api_call no workouthome navigation")

            navigation.navigate("WorkoutHome");
          }
        }
        else if (timer <= 0 && index + 1 < exercises.length) {
          console.warn(" workouthome navigation")

          navigation.navigate("RestScreen");
          setCompleted([...completed, current.name]);
          setWorkout(workout + 1);
          setMinutes(minutes + 2.5);
          setCalories(calories + 6.3);
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
  console.log(completed, "completed exercises");
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
          onPress={() => {
            navigation.navigate("RestScreen");
            setCompleted([...completed, current.name]);
            setWorkout(workout + 1);
            setMinutes(minutes + 2.5);
            setCalories(calories + 6.3);
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
