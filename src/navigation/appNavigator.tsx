import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import BottomTabs from "./bottomTabs";
import CarDetailsScreen from "../screens/carDetailScreen";
import BookingFormScreen from "../screens/bookingFormScreen";

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Main" component={BottomTabs} />
      <Stack.Screen name="CarDetails" component={CarDetailsScreen} />
      <Stack.Screen name="BookingForm" component={BookingFormScreen} />
    </Stack.Navigator>
  );
};

export default AppNavigator;
