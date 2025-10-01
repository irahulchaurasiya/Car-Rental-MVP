import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';

import LoginScreen from '../screens/loginScreen';
import SignupScreen from '../screens/signupScreen';
import BottomTabs from './bottomTabs';
import { logout } from '../store/slices/authSlice';
import { storage } from '../services/storage';

const Stack = createNativeStackNavigator();

const RootNavigator = () => {
  const dispatch = useDispatch();
  const { loggedIn, expiresAt } = useSelector((state: RootState) => state.auth);

  const isSessionValid = loggedIn && expiresAt && expiresAt > Date.now();

  useEffect(() => {
    if (loggedIn && expiresAt) {
      const remainingTime = expiresAt - Date.now();
      const timer = setTimeout(() => {
        dispatch(logout());
        storage.delete('auth');
      }, remainingTime);
  
      return () => clearTimeout(timer);
    }
  }, [loggedIn, expiresAt, dispatch]);
  

  console.log('Auth state:', loggedIn, isSessionValid, expiresAt, Date.now());

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {!isSessionValid ? (
          <>
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Signup" component={SignupScreen} />
          </>
        ) : (
          <Stack.Screen name="Main" component={BottomTabs} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootNavigator;
