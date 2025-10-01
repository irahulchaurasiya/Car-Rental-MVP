import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { useDispatch } from 'react-redux';
import { logout } from '../store/slices/authSlice';
import { storage } from '../services/storage';

const ProfileScreen = () => {
  const dispatch = useDispatch();

  const handleLogout = () => {
    // Clear Redux state
    dispatch(logout());

    // Clear session storage
    storage.delete('auth');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Profile Screen</Text>

      <Button title="Logout" color="red" onPress={handleLogout} />
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
});
