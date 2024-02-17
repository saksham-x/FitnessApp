import {
    StyleSheet,
    Text,
    View,
    SafeAreaView,
    Image,
    Pressable,
    ScrollView,
  } from "react-native";
  import React ,{useContext} from "react";
  import { useNavigation, useRoute } from "@react-navigation/native";
//   import { Ionicons } from "@expo/vector-icons";
import Icon from 'react-native-vector-icons/MaterialIcons';
 import { FitnessItems } from "../../components/Context/Context";
//   import { AntDesign } from '@expo/vector-icons';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';
import { default_ip_address } from "../../constant/constant";

  const WorkOutScreen = () => {
    const route = useRoute();
  //   console.log(route.params);
    const navigation = useNavigation();
    console.warn("api_call is:",route.params.api_call)
    const {
      completed,
      setCompleted,
    } = useContext(FitnessItems);
    return (
      <>
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{ backgroundColor: "white"}}
        >
          <Image
            style={{ width: "100%", height: 170 }}
            source={{ uri: route.params.image }}
          />
  
          {/* <Ionicons
            onPress={() => navigation.goBack()}
            style={{ position: "absolute", top: 20, left: 20 }}
            name="arrow-back-outline"
            size={28}
            color="white"
          /> */}
          <Icon
            onPress={() => navigation.goBack()}
            style={{ position: "absolute", top: 20, left: 20 }}
            name="arow-back"
            size={28}
            color="white"
          />
          {route.params.exercises.map((item, index) => (
            <Pressable
              style={{ margin: 10, flexDirection: "row", alignItems: "center" }}
              key={index}
            >
              <Image
                style={{ width: 90, height: 90 }}
                source={{ uri: `${default_ip_address}${item.gif_path}`}}
              />
  
              <View style={{ marginLeft: 10 }}>
                <Text style={{ fontSize: 17, fontWeight: "bold",width:170, }}>
                  {item.name.toUpperCase()}
                </Text>
  
                <Text style={{ marginTop: 4, fontSize: 18, color: "gray" }}>
                  {item.reps?`x ${item.reps}`:item.time?`${item.time} sec`:''}
                </Text>
              </View>
  
              {/* {completed.includes(item.name) ? (
                <AntDesign style={{marginLeft:40}} name="checkcircle" size={24} color="green" />
              ) : (
                null
              )} */}
              {completed.includes(item.name) ? (
                <AntDesignIcon style={{marginLeft:40}} name="star" size={24} color="green" />
              ) : (
                null
              )}
            </Pressable>
          ))}
        </ScrollView>
  
        <Pressable
        onPress={() =>  {
          navigation.navigate("FitScreen",{
            exercises:route.params.exercises,
            intensity:route.params.intensity?route.params.intensity:null,
            api_call:route.params.api_call,
        })
        setCompleted([]);
        }}
          style={{
            backgroundColor: "blue",
            padding: 10,
            marginLeft: "auto",
            marginRight: "auto",
            marginVertical: 20,
            width:120,
            borderRadius:6,
          }}
        >
          <Text
            style={{
              textAlign: "center",
              color: "white",
              fontSize: 15,
              fontWeight: "600",
            }}
          >
            START
          </Text>
        </Pressable>
      </>
    );
  };
  
  export default WorkOutScreen;
  
  const styles = StyleSheet.create({});
  