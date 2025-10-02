import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';

import { logout } from '../store/slices/authSlice';
import { storage } from '../services/storage';
import AuthNavigator from './authNavigator';
import AppNavigator from './appNavigator';

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
        {isSessionValid ? <AppNavigator /> : <AuthNavigator />}
    </NavigationContainer>
  );
};

export default RootNavigator;
