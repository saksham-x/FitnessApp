import React from 'react'

// import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

import Home from './Home'
import Profile from './Profile'
import SmartwatchStat from './SmartwatchStat'

import Ionicons from 'react-native-vector-icons/Ionicons'

const Tab = createBottomTabNavigator()

const tabAttributes = [
  {name: 'Home', label: 'Home', activeIcon: 'home', inActiveIcon: 'home-outline', component: Home},
  {name: 'Stats', label: 'Stats', activeIcon: 'stats-chart', inActiveIcon: 'stats-chart-outline', component: SmartwatchStat},
  {name: 'Profile', label: 'Profile', activeIcon: 'person', inActiveIcon: 'person-outline', component: Profile}
]

const TabNavigator = () => {
    return(
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarLabelStyle: {
            fontSize: 12,
            paddingBottom: 6
          },
          tabBarStyle: {
            height: 60,
            position: 'absolute',
            bottom: 16,
            right: 16,
            left: 16,
            borderRadius: 16,
            backgroundColor: '#282828',
            elevation: 0,
            borderTopWidth: 0,
          },
          tabBarActiveTintColor: '#b3b3b3',
          tabBarHideOnKeyboard: true
        }}
      >
        {
          tabAttributes.map((item, index) => (
            <Tab.Screen
              key={index}
              name={item.name}
              component={item.component}
              options={{
                tabBarLabel: item.label,
                tabBarIcon: ({color, size, focused}) => (
                  <Ionicons name={focused ? item.activeIcon : item.inActiveIcon} size={24} color={color} />
                )
              }}
            />
          ))
        }
      </Tab.Navigator>
    )
  }

  export default TabNavigator