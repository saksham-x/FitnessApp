import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { LineChart, BarChart } from 'react-native-chart-kit';
import { default_ip_address } from "../../constant/constant";
import AsyncStorage from "@react-native-async-storage/async-storage";

const WorkoutGraph = () => {
  // const workoutData = [
  //   { date: '2022-02-21', caloriesBurned: 200, workoutTime: 20 },
  //   { date: '2022-02-22', caloriesBurned: 300, workoutTime: 25 },
  //   { date: '2022-02-23', caloriesBurned: 250, workoutTime: 22 },
  //   { date: '2022-02-24', caloriesBurned: 350, workoutTime: 30 },
  //   { date: '2022-02-25', caloriesBurned: 400, workoutTime: 35 },
  //   { date: '2022-02-26', caloriesBurned: 280, workoutTime: 28 },
  //   { date: '2022-02-26', caloriesBurned: 280, workoutTime: 28 },
  // ];
  const [isLoaded, setIsLoaded] = useState(false)
  const [workoutData, setWorkoutData] = useState([])
  const chartConfig = {
    backgroundGradientFrom: '#F8FAF8',
    backgroundGradientTo: '#EDFCE7',
    color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    style: {
      borderRadius: 16,
      marginVertical: 8,
    },
    propsForDots: {
      r: '6',
      strokeWidth: '2',
      stroke: '#1F8E5E',
    },
  };

  const data = {

    labels: workoutData.map((entry) => entry.date),
    datasets: [
      {
        data: workoutData.map((entry) => entry.caloriesBurned),
        color: (opacity = 1) => `rgba(31, 142, 94, ${opacity})`,
        strokeWidth: 2,
      },
    ],
  };

  const workoutTimeData = {
    labels: workoutData.map((entry) => entry.date),
    datasets: [
      {
        data: workoutData.map((entry) => entry.workoutTime),
        color: (opacity = 1) => `rgba(238, 130, 238, ${opacity})`,
      },
    ],
  };

  useEffect(() => {
    const getData = async () => {
      let userData = await AsyncStorage.getItem('user')
      userData = await JSON.parse(userData)
      let data = await fetch(`${default_ip_address}/getWeeklyCalorieAndTime?id=${userData._id}`)
      data = await data.json()
      if (data.success === true) {
        console.log(data.result)
        const newData = data.result.map((item) => ({
          date: item.date,
          caloriesBurned: item.calorieBurnt,
          workoutTime: item.workout_interval
        }));
        setWorkoutData(newData);
        setIsLoaded(true)
      }
      else {
        console.log(data)
      }
    }
    getData()
  }, [])

  return (
    <ScrollView>
      {isLoaded && (
        <View style={styles.container}>
          <View style={{ width: '100%' }}>
            <Text style={{ fontSize: 20, marginBottom: 10, color: '#fff', textAlign: 'center' }}>Weekly Workout Progress</Text>
            <View style={styles.chartContainer}>
              <LineChart
                data={data}
                width={400}
                height={420}
                yAxisSuffix="KCAL"
                verticalLabelRotation={-90}
                chartConfig={chartConfig}
                bezier
                style={{ borderRadius: 16 }}
                xLabelsOffset={70}
              />
              <BarChart
                data={workoutTimeData}
                width={400}
                height={420}
                verticalLabelRotation={-90}
                yAxisSuffix="min"
                xLabelsOffset={70}
                chartConfig={chartConfig}
                style={{ borderRadius: 16 }}
              />
            </View>
          </View>
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // padding: 20,
    backgroundColor: '#181818'
  },
  chartContainer: {
    display: `flex`,
    flexDirection: 'col',
    gap: 20
  }
})

export default WorkoutGraph;