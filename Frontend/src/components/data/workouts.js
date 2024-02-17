import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { default_ip_address } from '../../constant/constant'

const Workouts = () => {
const[data,setData]=useState([])
  let beginnerAbs = null;
  let beginnerChest = null;
  let beginnerArm = null;
  let beginnerLeg = null;
  let beginnerShoulderAndBack = null;
  let intermediateAbs = null;
  let intermediateChest = null;
  let intermediateArm = null;
  let intermediateLeg = null;
  let intermediateShoulderAndBack = null;
  let advancedAbs = null;
  let advancedChest = null;
  let advancedArm = null;
  let advancedLeg = null;
  let advancedShoulderAndBack = null;
  console.log("inside")
  console.log("inside")
  console.log("inside")
  console.log("inside")
  console.log("inside")
  console.log("inside")

  useEffect(() => {
    getDataFromDB();
  }, []);

  const getDataFromDB = async () => {
    console.log("called")
    console.log("called")
    console.log("called")
    console.log("called")
    console.log("called")
    console.log("called")
    try {
      let result = await fetch(`${default_ip_address}/workouts`, {
        method: 'get',
      });
      result = await result.json();
      if (result.success === true) {
        console.log("success")
        console.log("success")
        console.log("success")
        console.log("success")
        console.log("success")
        console.log("success")

        beginnerAbs = result.result.filter(a => {
          return a.level === 'Beginner' && a.type === 'abs';
        });
        // console.log(beginnerAbs)
        beginnerChest = result.result.filter(a => {
          return a.level === 'Beginner' && a.type === 'chest';
        });
        beginnerArm = result.result.filter(a => {
          return a.level === 'Beginner' && a.type === 'arms';
        });
        beginnerLeg = result.result.filter(a => {
          return a.level === 'Beginner' && a.type === 'legs';
        });
        beginnerShoulderAndBack = result.result.filter(a => {
          return a.level === 'Beginner' && a.type === 'shoulder and back';
        });
        intermediateAbs = result.result.filter(a => {
          return a.level === 'Intermediate' && a.type === 'abs';
        });
        intermediateChest = result.result.filter(a => {
          return a.level === 'Intermediate' && a.type === 'chest';
        });
        intermediateArm = result.result.filter(a => {
          return a.level === 'Intermediate' && a.type === 'arms';
        });
        intermediateLeg = result.result.filter(a => {
          return a.level === 'Intermediate' && a.type === 'legs';
        });
        intermediateShoulderAndBack = result.result.filter(a => {
          return a.level === 'Intermediate' && a.type === 'shoulder and back';
        });
        advancedAbs = result.result.filter(a => {
          return a.level === 'Advanced' && a.type === 'abs';
        });
        advancedChest = result.result.filter(a => {
          return a.level === 'Advanced' && a.type === 'chest';
        });
        advancedArm = result.result.filter(a => {
          return a.level === 'Advanced' && a.type === 'arms';
        });
        advancedLeg = result.result.filter(a => {
          return a.level === 'Advanced' && a.type === 'legs';
        });
        advancedShoulderAndBack = result.result.filter(a => {
          return a.level === 'Advanced' && a.type === 'shoulder and back';
        });
        const newData = [
            {
              id: '0',
              image:
                'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRonpSjpGQ2-JD8-XFFD7LYsVSFCOiASj0wSOq1qxNvxGFHe7W6AU1LRAeJ2fOIzYICMGc&usqp=CAU',
              name: 'Abs Beginner',
              exercises: beginnerAbs,
            },
            {
              id: '1',
              image:
                'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSqCT0tewpNAZ6R9JUoMDHIHGnpE44U2Fl1Zw&usqp=CAU',
              name: 'Chest Beginner',
              exercises: beginnerChest,
            },
            {
              id: '2',
              image:
                'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT1NHvoutGn-Vr_uwVbOOtezhENvx9jhV6pfQ&usqp=CAU',
              name: 'Arms Beginner',
              exercises: beginnerArm,
            },
            {
              id: '3',
              image:
                'https://www.muscleandfitness.com/wp-content/uploads/2000/09/Man-And-Woman-Showing-Muscular-Legs.jpg?quality=86&strip=all',
              name: 'Legs Beginner',
              exercises: beginnerLeg,
            },
            {
              id: '4',
              image:
                'https://cdn11.bigcommerce.com/s-3pp378gtvu/images/stencil/2560w/uploaded_images/shoulder-and-back-workout.jpg?t=1668539564',
              name: 'Shoulder And Back Beginner',
              exercises: beginnerShoulderAndBack,
            },
            {
              id: '5',
              image:
                'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRonpSjpGQ2-JD8-XFFD7LYsVSFCOiASj0wSOq1qxNvxGFHe7W6AU1LRAeJ2fOIzYICMGc&usqp=CAU',
              name: 'Abs Intermediate',
              exercises: intermediateAbs,
            },
            {
              id: '6',
              image:
                'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSqCT0tewpNAZ6R9JUoMDHIHGnpE44U2Fl1Zw&usqp=CAU',
              name: 'Chest Intermediate',
              exercises: intermediateChest,
            },
            {
              id: '7',
              image:
                'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT1NHvoutGn-Vr_uwVbOOtezhENvx9jhV6pfQ&usqp=CAU',
              name: 'Arms Intermediate',
              exercises: intermediateArm,
            },
            {
              id: '8',
              image:
                'https://www.muscleandfitness.com/wp-content/uploads/2000/09/Man-And-Woman-Showing-Muscular-Legs.jpg?quality=86&strip=all',
              name: 'Legs Intermediate',
              exercises: intermediateLeg,
            },
            {
              id: '9',
              image:
                'https://cdn11.bigcommerce.com/s-3pp378gtvu/images/stencil/2560w/uploaded_images/shoulder-and-back-workout.jpg?t=1668539564',
              name: 'Shoulder And Back Intermediate',
              exercises: intermediateShoulderAndBack,
            },
            {
              id: '10',
              image:
                'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRonpSjpGQ2-JD8-XFFD7LYsVSFCOiASj0wSOq1qxNvxGFHe7W6AU1LRAeJ2fOIzYICMGc&usqp=CAU',
              name: 'Abs Advanced',
              exercises: advancedAbs,
            },
            {
              id: '11',
              image:
                'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSqCT0tewpNAZ6R9JUoMDHIHGnpE44U2Fl1Zw&usqp=CAU',
              name: 'Chest Advanced',
              exercises: advancedChest,
            },
            {
              id: '12',
              image:
                'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT1NHvoutGn-Vr_uwVbOOtezhENvx9jhV6pfQ&usqp=CAU',
              name: 'Arms Advanced',
              exercises: advancedArm,
            },
            {
              id: '13',
              image:
                'https://www.muscleandfitness.com/wp-content/uploads/2000/09/Man-And-Woman-Showing-Muscular-Legs.jpg?quality=86&strip=all',
              name: 'Legs Advanced',
              exercises: advancedLeg,
            },
            {
              id: '14',
              image:
                'https://cdn11.bigcommerce.com/s-3pp378gtvu/images/stencil/2560w/uploaded_images/shoulder-and-back-workout.jpg?t=1668539564',
              name: 'Shoulder And Back Advanced',
              exercises: advancedShoulderAndBack,
            },
          ];
          setData(newData)
        
      } else if (result.success === false) {
        console.warn(result.error);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  
  return data;
};

export default Workouts;