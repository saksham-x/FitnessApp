import { StyleSheet, Text, View, Pressable, Image, ScrollView } from "react-native";
import React from "react";
import fitness from "../data/fitness";
// import { MaterialCommunityIcons } from "@expo/vector-icons";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from "@react-navigation/native";
import Workouts from "../data/workouts.js";

const FitnessCards = () => {
  // const FitnessData = fitness;
  const FitnessData = Workouts()
  console.log('from fitnesscard',FitnessData)
  const navigation = useNavigation();
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
    <View>
      {FitnessData.map((item, key) => (
        <Pressable
        onPress={() => navigation.navigate("WorkOutScreen",{
          image:item.image,
          exercises:item.exercises,
          id:item.id,
        })}
          style={{alignItems: "center", justifyContent: "center", margin: 10 }}
          key={key}
        >
          <Image
            style={{ width: "95%", height: 140, borderRadius: 7 }}
            source={{ uri: item.image }}
          />
          <Text
            style={{
              position: "absolute",
              color: "white",
              fontSize: 16,
              fontWeight: "bold",
              left: 20,
              top: 20,
            }}
          >
            {item.name}
          </Text>
          {/* <MaterialCommunityIcons
            style={{ position: "absolute", color: "white", bottom: 15,left:20 }}
            name="lightning-bolt"
            size={24}
            color="black"
          /> */}
          <Icon
            style={{ position: "absolute", color: "white", bottom: 15,left:20 }}
            name="star"
            size={24}
            color="black"
          />
        </Pressable>
      ))}
    </View>
    </ScrollView>
  );
};

export default FitnessCards;

const styles = StyleSheet.create({});