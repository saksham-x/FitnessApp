import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Ionicons from 'react-native-vector-icons/Ionicons'
import FontAwesome from 'react-native-vector-icons/FontAwesome5'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import CircularProgressBar from '../../components/CircularProgress/CircularProgressBar';

const SmartWatchDetails = () => {
  const month = ["January","February","March","April","May","June","July","August","September","October","November","December"];
  const d = new Date()
  let year = d.getFullYear()
  let monthName = month[d.getMonth()]
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.screenTitle}>Fitness Stats</Text>
      </View>
      <View style={styles.calendarContainer}>
        <Text style={styles.calendarMonth}>{monthName} {year}</Text>
        <View style={styles.calendarDays}>
          {renderCalendarDays()}
        </View>
      </View>
      <View style={styles.statsContainer}>
        <View style={styles.statsContainer1}>
        <StatCard label="Heart Rate" value="78" icon="heart" size={16} color='red' metric='BPM' type='heartRate' staticon='heartbeat-alt' statsize={50} statcolor='red' />
        <StatCard label="Water" value="360" icon="water" size={20} color='#74ccf4' metric='lt' type='water' staticon='glass-whiskey' statsize={50} statcolor='#2389da'  />
        </View>
        <StatCard label="Calories Burned" value="360" icon="fire" size={20} color='orange' metric='Kcal' type='calorie' />
        <StatCard label="Steps Taken" value="360" metric='steps' type='footsteps' staticon='shoe-print' statsize={50} statcolor='white'  />
      </View>
    </ScrollView>
  );
};

const renderCalendarDays = () => {
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const currentDay = new Date().getDay();
  const currentDate = new Date().getDate();

  return days.map((day, index) => (
    <TouchableOpacity key={index} style={currentDay === index ? styles.calendarDayHighlighted : styles.calendarDay}>
      <Text style={currentDay === index ? styles.calendarDayTextHighlighted : styles.calendarDayText}>{day}</Text>
      {currentDay === index && (
        <Text style={styles.currentDate}>{currentDate}</Text>
      )}
    </TouchableOpacity>
  ));
};



const StatCard = ({ label, value, icon, size, color, metric, type, staticon, statsize, statcolor }) => {
  return (
    <View style={[styles.statCard, styles[`statCard_${type}`] ]}>
      <View style={styles.statLabelContainer}>
      <Text style={styles.statLabel}>{label}</Text>
      {type === 'heartRate' ? <Fontisto name={icon} size={size} color={color} /> :
      type === 'water' ? <Ionicons name={icon} size={size} color={color} /> :
      type === 'calorie' ? <Fontisto name={icon} size={size} color={color} /> :
      null
      }
      </View>
      <View style={styles.statImageContainer}>
        {type === 'heartRate' ? <Fontisto name={staticon} size={statsize} color={statcolor} /> : 
        type === 'calorie' ? <CircularProgressBar /> :
        type === 'water' ? <FontAwesome name={staticon} size={statsize} color={statcolor} /> :
        type === 'footsteps' ? <MaterialCommunityIcons name={staticon} size={statsize} color={statcolor} /> :
        null
        }
        
      </View>
      <View style={styles.statValueContainer}>
      <Text style={styles.statValue}>{value}</Text>
      <Text style={styles.statValueMetric}>{metric}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#181818',
    width: '100%',
    paddingHorizontal: 16,
    // borderWidth: 1,
    borderColor: 'red'
  },
  header: {
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#181818',
  },
  screenTitle: {
    fontWeight: 'bold',
    fontSize: 18,
    color: 'white',
  },
  calendarContainer: {
    padding: 10,
    marginTop: 10,
    backgroundColor: '#333',
    borderRadius: 10,
    marginHorizontal: 5
  },
  calendarMonth: {
    fontSize: 18,
    color: 'white',
  },
  calendarDays: {
    flexDirection: 'row',
    // justifyContent: 'space-between',
    marginTop: 10,
  },
  calendarDay: {
    flex: 1,
    alignItems: 'center',
    padding: 10,
    borderColor: '#333',
    borderBottomWidth: 1,
  },
  calendarDayHighlighted: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#b3b3b3',
    borderRadius: 10,
    padding: 10
  },
  calendarDayText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold'
  },
  calendarDayTextHighlighted: {
    color: 'black',
    fontSize: 16,
    fontWeight: 'bold'
  },
  currentDate: {
    fontSize: 20,
    fontWeight: 'bold'
  },
  statsContainer: {
    paddingHorizontal: 5,
    marginTop: 20,
    flexDirection: 'row',
    gap: 10,
    flexWrap: 'wrap',
  },
  statsContainer1:{
    flex: 1,
    height: 300,
    gap: 10
  },
  statCard: {
    backgroundColor: '#333',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'space-between',
  }, 
  statCard_heartRate: {
    width: '100%',
    height: 155
  },
  statCard_calorie: {
    width: '56%',
    height: 320
  },
  statCard_water:{
    width: '100%',
    height: 155
  },
  statCard_footsteps:{
    width: '100%',
    height: 200
  },
  statLabelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10
  },
  statLabel: {
    fontSize: 14,
    color: 'white',
  },
  statValueContainer: {
    flexDirection: 'row',
    gap: 6
  },
  statValue: {
    fontSize: 32,
    fontWeight: 'bold',
    color: 'white',
  },
  statValueMetric: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
    alignSelf: 'flex-end',
    paddingBottom: 5
  }
});

export default SmartWatchDetails;
