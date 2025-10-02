import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/homeScreen';
import BookingsScreen from '../screens/bookingScreen';
import ProfileScreen from '../screens/profileScreen';
const Tab = createBottomTabNavigator();

const BottomTabs = () => {
  return (
    <Tab.Navigator initialRouteName='Home' screenOptions={{ headerShown: false }}>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Bookings" component={BookingsScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
};

export default BottomTabs;
