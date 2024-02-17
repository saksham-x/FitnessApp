import React,{ useState, useEffect} from 'react';
import { View, ScrollView, StyleSheet, Text } from 'react-native';
import RecipesCard from './DietPlans/RecipesCard';
import axios from "axios";
import { default_ip_address } from '../constant/constant';
import AsyncStorage from '@react-native-async-storage/async-storage';

const DummyComponent = () => {
  const calorie = 2500;
  const breakfastCalori = 0.23 * calorie;
  const lunchCalori = 0.33 * calorie;
  const snacksCalori = 0.17 * calorie;
  const dinnerCalori = 0.27 * calorie;
  const [breakfast, setBreakfast] = useState([]);
  const [lunch, setLunch] = useState([]);
  const [snacks, setSnacks] = useState([]);
  const [dinner, setDinner] = useState([]);
  const [randomBreakfast, setRandomBreakfast] = useState({});
  const [randomlunch, setRandomLunch] = useState({});
  const [randomsnacks, setRandomSnacks] = useState({});
  const [randomDinner, setRandomDinner] = useState({});
  const [userID, setUserID] = useState()

  const getMyObject = async () => {
    try {
      return await AsyncStorage.getItem('user')
    } catch (error) {
      throw new Error(error)
    }
  }

  useEffect(() => {
    const checkLocalStorage = async () => {
      try {
        const data = await getMyObject()

        if(data) {
          const parsedData = await JSON.parse(data)
          if(parsedData) {
            setUserID(parsedData._id)
          }
        }
      } catch (error) {
        console.log('Error parsing data', error)
      }
    }

    checkLocalStorage()
  },[])

  useEffect(() => {

    if(userID) {
    console.log('inside seccond effect', userID)
      fetchData(userID)
    }
  },[userID])


  async function sendDiet(data1,data2,data3,data4) {
    console.log('id:',userID)
    axios.post(`${default_ip_address}/add_daily_diets?id=${userID}`,{
        'breakfast':data1,
        'lunch':data2,
        'snacks':data3,
        'dinner':data4
    }).then((res)=>{
        console.log('senddiet',res)
    }).catch((err)=>{
        console.log(err)
    })
  }

  async function newdiets() {
    let demo1={}
    let demo2={}
    let demo3={}
    let demo4={}
    let res1 = await fetch(`${default_ip_address}/edamam?calories=${breakfastCalori}&mealType=breakfast`,
      {
        method: "get",
      }
    );
    res1 = await res1.json();
    if (res1.success === true) {
      setBreakfast(res1.result);
      demo1=res1.result[Math.floor(Math.random() * res1.result.length)]
      setRandomBreakfast(demo1);
    }
    let res2 = await fetch(`${default_ip_address}/edamam?calories=${lunchCalori}&mealType=lunch/dinner`,
      {
        method: "get",
      }
    );
    res2 = await res2.json();
    if (res2.success === true) {
      setLunch(res2.result);
      demo2=res2.result[Math.floor(Math.random() * res2.result.length)]
      setRandomLunch(demo2);
    }
    let res3 = await fetch(`${default_ip_address}/edamam?calories=${snacksCalori}&mealType=snack,teatime`,
      {
        method: "get",
      }
    );
    res3 = await res3.json();
    setSnacks(res3.result);
    demo3=res3.result[Math.floor(Math.random() * res3.result.length)]
    setRandomSnacks(demo3);
    let res4 = await fetch(`${default_ip_address}/edamam?calories=${dinnerCalori}&mealType=lunch/dinner`,
      {
        method: "get",
      }
    );
    res4 = await res4.json();
    setDinner(res4.result);
    demo4=res4.result[Math.floor(Math.random() * res4.result.length)]
    setRandomDinner(demo4);
    return [demo1,demo2,demo3,demo4];
  }

  async function fetchData() {
    let res = await fetch(`${default_ip_address}/get_todays_diet?id=${userID}`,
      {
        method: "get",
      }
    );
    res = await res.json();
    // console.log('ffetch data',res);
    if (res.success === true) {
      // console.log('breakfaset inside fetch data',res.result[0].breakfast)
      setRandomBreakfast(res.result[0].breakfast);
      setRandomLunch(res.result[0].lunch);
      setRandomSnacks(res.result[0].snacks);
      setRandomDinner(res.result[0].dinner);
    } else {
       let [got1,got2,got3,got4]=await newdiets()
       await sendDiet(got1,got2,got3,got4)
    }
  }


  return (
    <ScrollView>
      <View style={styles.container}>
        {/* <Text style={{color: '#fff'}}>Hello</Text> */}
        {randomBreakfast && <RecipesCard title='Breakfast' recipe={randomBreakfast} />}
        {randomlunch && <RecipesCard title='Lunch' recipe={randomlunch} />}
        {randomsnacks && <RecipesCard title='Snacks' recipe={randomsnacks} />}
        {randomDinner && <RecipesCard title='Dinner' recipe={randomDinner} />}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#181818'
  },
})

export default DummyComponent;
